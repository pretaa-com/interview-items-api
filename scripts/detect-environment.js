#!/usr/bin/env node

/**
 * Environment Detection Script
 *
 * Detects OS, IDE, AI tooling, and known interview-assist/cheat software.
 * Outputs results to interview-metadata.json
 *
 * Interview-assist detection is based on public information about tools that
 * market themselves for use during technical interviews (e.g. Interview Coder,
 * Leetcode Wizard, CodingVeil, LeetPilot, Cluely). Detection is best-effort and
 * not exhaustive; tools may use different process names or install paths.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUTPUT_FILE = path.join(__dirname, '..', 'interview-metadata.json');

function detectOS() {
  const platform = process.platform;
  const arch = process.arch;
  
  let osName = 'Unknown';
  let osVersion = 'Unknown';
  
  try {
    if (platform === 'darwin') {
      osName = 'macOS';
      // Try to get macOS version
      try {
        const version = execSync('sw_vers -productVersion', { encoding: 'utf-8' }).trim();
        osVersion = version;
      } catch (e) {
        osVersion = 'Unknown';
      }
    } else if (platform === 'linux') {
      osName = 'Linux';
      try {
        // Try common Linux version files
        if (fs.existsSync('/etc/os-release')) {
          const content = fs.readFileSync('/etc/os-release', 'utf-8');
          const match = content.match(/PRETTY_NAME="(.+)"/);
          if (match) osVersion = match[1];
        }
      } catch (e) {
        // Fallback to uname
        try {
          osVersion = execSync('uname -r', { encoding: 'utf-8' }).trim();
        } catch (e2) {
          osVersion = 'Unknown';
        }
      }
    } else if (platform === 'win32') {
      osName = 'Windows';
      try {
        const version = execSync('systeminfo | findstr /B /C:"OS Name" /C:"OS Version"', { encoding: 'utf-8' }).trim();
        osVersion = version.split('\n')[0] || 'Unknown';
      } catch (e) {
        osVersion = 'Unknown';
      }
    } else {
      osName = platform;
    }
  } catch (e) {
    // Fallback
    osName = platform;
  }
  
  return {
    platform,
    name: osName,
    version: osVersion,
    arch
  };
}

function detectIDE() {
  const detected = [];
  const repoRoot = path.join(__dirname, '..');
  
  // Check for IDE-specific directories/files
  const ideIndicators = [
    { name: 'VS Code', paths: ['.vscode'], type: 'directory' },
    { name: 'Cursor', paths: ['.cursor', '.cursorrules'], type: 'directory_or_file' },
    { name: 'IntelliJ IDEA / WebStorm', paths: ['.idea'], type: 'directory' },
    { name: 'Sublime Text', paths: ['.sublime-project', '.sublime-workspace'], type: 'file' },
    { name: 'Vim', paths: ['.vimrc', '.vim'], type: 'file_or_directory' },
    { name: 'Neovim', paths: ['.nvim', 'init.vim', 'init.lua'], type: 'file_or_directory' },
    { name: 'Emacs', paths: ['.emacs', '.emacs.d'], type: 'file_or_directory' },
  ];
  
  for (const ide of ideIndicators) {
    for (const idePath of ide.paths) {
      const fullPath = path.join(repoRoot, idePath);
      try {
        const stat = fs.statSync(fullPath);
        if (ide.type === 'directory' && stat.isDirectory()) {
          detected.push({ name: ide.name, evidence: idePath });
          break;
        } else if (ide.type === 'file' && stat.isFile()) {
          detected.push({ name: ide.name, evidence: idePath });
          break;
        } else if (ide.type === 'directory_or_file' && (stat.isDirectory() || stat.isFile())) {
          detected.push({ name: ide.name, evidence: idePath });
          break;
        } else if (ide.type === 'file_or_directory' && (stat.isFile() || stat.isDirectory())) {
          detected.push({ name: ide.name, evidence: idePath });
          break;
        }
      } catch (e) {
        // File/directory doesn't exist, continue
      }
    }
  }
  
  // Check EDITOR environment variable
  try {
    const editor = process.env.EDITOR || process.env.VISUAL;
    if (editor) {
      detected.push({ name: `Editor (from $EDITOR)`, evidence: editor });
    }
  } catch (e) {
    // Ignore
  }
  
  // Check for running processes (Unix-like only)
  if (process.platform !== 'win32') {
    try {
      const psOutput = execSync('ps aux | grep -E "(code|cursor|idea|subl|vim|nvim|emacs)" | grep -v grep', { encoding: 'utf-8' }).trim();
      if (psOutput) {
        const processes = psOutput.split('\n').filter(p => p.trim());
        if (processes.length > 0) {
          detected.push({ name: 'Running processes detected', evidence: processes.join('; ') });
        }
      }
    } catch (e) {
      // Ignore - process check failed
    }
  }
  
  return detected.length > 0 ? detected : [{ name: 'Unknown', evidence: 'No IDE indicators found' }];
}

function detectAITooling() {
  const detected = [];
  const repoRoot = path.join(__dirname, '..');
  
  // Check for AI tooling indicators
  const aiIndicators = [
    { name: 'Cursor AI', paths: ['.cursor', '.cursorrules', '.cursor/rules'], type: 'directory_or_file' },
    { name: 'GitHub Copilot', paths: ['.github/copilot'], type: 'directory' },
    { name: 'Cursor Rules', paths: ['.cursorrules', '.cursor/rules', 'AGENTS.md'], type: 'file' },
    { name: 'GitHub Copilot Chat', paths: ['.github/copilot/chat'], type: 'directory' },
  ];
  
  for (const tool of aiIndicators) {
    for (const toolPath of tool.paths) {
      const fullPath = path.join(repoRoot, toolPath);
      try {
        const stat = fs.statSync(fullPath);
        if (tool.type === 'directory' && stat.isDirectory()) {
          detected.push({ name: tool.name, evidence: toolPath, confidence: 'high' });
          break;
        } else if (tool.type === 'file' && stat.isFile()) {
          detected.push({ name: tool.name, evidence: toolPath, confidence: 'high' });
          break;
        } else if (tool.type === 'directory_or_file' && (stat.isDirectory() || stat.isFile())) {
          detected.push({ name: tool.name, evidence: toolPath, confidence: 'high' });
          break;
        }
      } catch (e) {
        // File/directory doesn't exist, continue
      }
    }
  }
  
  // Check for Cursor in PATH
  try {
    execSync('which cursor', { stdio: 'ignore' });
    detected.push({ name: 'Cursor (in PATH)', evidence: 'cursor command available', confidence: 'medium' });
  } catch (e) {
    // Cursor not in PATH
  }
  
  // Check for common AI tooling in package.json dependencies (if any)
  try {
    const backendPkg = path.join(repoRoot, 'backend', 'package.json');
    const frontendPkg = path.join(repoRoot, 'frontend', 'package.json');
    
    for (const pkgPath of [backendPkg, frontendPkg]) {
      if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
        const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
        const aiPackages = Object.keys(allDeps).filter(dep => 
          dep.includes('copilot') || dep.includes('cursor') || dep.includes('ai-') || dep.includes('-ai')
        );
        if (aiPackages.length > 0) {
          detected.push({ 
            name: 'AI-related npm packages', 
            evidence: aiPackages.join(', '), 
            confidence: 'low' 
          });
        }
      }
    }
  } catch (e) {
    // Ignore
  }
  
  // Check git config for Copilot/Cursor related settings
  try {
    const gitConfig = execSync('git config --list', { encoding: 'utf-8' });
    if (gitConfig.includes('copilot') || gitConfig.includes('cursor')) {
      detected.push({ 
        name: 'Git config AI indicators', 
        evidence: 'Git config contains AI-related settings', 
        confidence: 'low' 
      });
    }
  } catch (e) {
    // Ignore - git not available or not a repo
  }
  
  return detected.length > 0 ? detected : [{ name: 'None detected', evidence: 'No AI tooling indicators found', confidence: 'none' }];
}

function detectGitInfo() {
  const info = {
    branch: 'Unknown',
    commitCount: 0,
    hasUncommittedChanges: false,
    remoteUrl: 'Unknown'
  };
  
  try {
    // Get current branch
    try {
      info.branch = execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
    } catch (e) {
      // Not a git repo or no branch
    }
    
    // Get commit count
    try {
      const count = execSync('git rev-list --count HEAD', { encoding: 'utf-8' }).trim();
      info.commitCount = parseInt(count, 10) || 0;
    } catch (e) {
      // Ignore
    }
    
    // Check for uncommitted changes
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf-8' }).trim();
      info.hasUncommittedChanges = status.length > 0;
    } catch (e) {
      // Ignore
    }
    
    // Get remote URL
    try {
      const remote = execSync('git remote get-url origin', { encoding: 'utf-8' }).trim();
      info.remoteUrl = remote;
    } catch (e) {
      // Ignore
    }
  } catch (e) {
    // Git not available or not a repo
  }
  
  return info;
}

// Known interview-assist/cheat software (tools that market for use during coding interviews).
// Process names and app names may change; this list is based on public info as of 2024–2025.
const INTERVIEW_CHEAT_INDICATORS = [
  { name: 'Interview Coder', patterns: ['interview coder', 'interviewcoder', 'interview-coder'] },
  { name: 'Leetcode Wizard', patterns: ['leetcode wizard', 'leetcodewizard', 'leetcode-wizard'] },
  { name: 'CodingVeil', patterns: ['codingveil', 'coding-veil'] },
  { name: 'LeetPilot', patterns: ['leetpilot', 'leet-pilot'] },
  { name: 'Cluely', patterns: ['cluely'] },
  { name: 'CodingInterviewAI', patterns: ['codinginterviewai', 'coding-interview-ai'] },
];

function detectInterviewCheatSoftware() {
  const detected = [];
  const platform = process.platform;

  // --- Check installed applications (macOS) ---
  if (platform === 'darwin') {
    try {
      const appsDir = '/Applications';
      if (fs.existsSync(appsDir)) {
        const entries = fs.readdirSync(appsDir);
        for (const entry of entries) {
          const normalized = entry.toLowerCase().replace(/\.app$/i, '').replace(/\s/g, '');
          for (const tool of INTERVIEW_CHEAT_INDICATORS) {
            if (tool.patterns.some((p) => normalized.includes(p.replace(/\s/g, '')))) {
              detected.push({
                name: tool.name,
                evidence: `Installed: ${path.join(appsDir, entry)}`,
                confidence: 'high',
              });
              break;
            }
          }
        }
      }
      // User-level Applications
      const userApps = path.join(process.env.HOME || '', 'Applications');
      if (fs.existsSync(userApps)) {
        const entries = fs.readdirSync(userApps);
        for (const entry of entries) {
          const normalized = entry.toLowerCase().replace(/\.app$/i, '').replace(/\s/g, '');
          for (const tool of INTERVIEW_CHEAT_INDICATORS) {
            if (tool.patterns.some((p) => normalized.includes(p.replace(/\s/g, '')))) {
              detected.push({
                name: tool.name,
                evidence: `Installed (user): ${path.join(userApps, entry)}`,
                confidence: 'high',
              });
              break;
            }
          }
        }
      }
    } catch (e) {
      // Ignore permission or read errors
    }
  }

  // --- Check running processes ---
  const allPatterns = INTERVIEW_CHEAT_INDICATORS.flatMap((t) =>
    t.patterns.map((p) => ({ name: t.name, pattern: p.replace(/\s/g, '') }))
  );

  if (platform !== 'win32') {
    try {
      const psOutput = execSync('ps aux', { encoding: 'utf-8', maxBuffer: 1024 * 1024 });
      const lines = psOutput.split('\n');
      for (const line of lines) {
        const normalizedLine = line.toLowerCase().replace(/\s/g, '');
        for (const { name, pattern } of allPatterns) {
          if (normalizedLine.includes(pattern)) {
            const match = line.trim().substring(0, 120);
            detected.push({
              name: `${name} (running)`,
              evidence: match,
              confidence: 'high',
            });
            break;
          }
        }
      }
    } catch (e) {
      // ps may be restricted in some environments
    }
  } else {
    try {
      const tasklist = execSync('tasklist /FO CSV /V', { encoding: 'utf-8', maxBuffer: 1024 * 1024 });
      const lower = tasklist.toLowerCase();
      for (const tool of INTERVIEW_CHEAT_INDICATORS) {
        for (const pattern of tool.patterns) {
          const normalized = pattern.replace(/\s/g, '');
          if (lower.includes(normalized)) {
            detected.push({
              name: `${tool.name} (running)`,
              evidence: 'Present in tasklist',
              confidence: 'high',
            });
            break;
          }
        }
      }
    } catch (e) {
      // Ignore
    }
  }

  // --- Windows: check common install paths ---
  if (platform === 'win32') {
    const programDirs = [
      process.env['ProgramFiles'] || 'C:\\Program Files',
      process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)',
      process.env.LOCALAPPDATA || path.join(process.env.USERPROFILE || '', 'AppData', 'Local'),
    ];
    for (const base of programDirs) {
      try {
        if (!fs.existsSync(base)) continue;
        const entries = fs.readdirSync(base);
        for (const entry of entries) {
          const lower = entry.toLowerCase();
          for (const tool of INTERVIEW_CHEAT_INDICATORS) {
            if (tool.patterns.some((p) => lower.includes(p.replace(/\s/g, '')))) {
              detected.push({
                name: tool.name,
                evidence: `Installed: ${path.join(base, entry)}`,
                confidence: 'medium',
              });
              break;
            }
          }
        }
      } catch (e) {
        // Ignore
      }
    }
  }

  // Deduplicate by name (same tool, multiple evidence)
  const seen = new Set();
  const unique = detected.filter((d) => {
    const key = d.name;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return unique.length > 0
    ? unique
    : [{ name: 'None detected', evidence: 'No known interview-assist software detected', confidence: 'none' }];
}

function main() {
  console.log('🔍 Detecting environment...\n');
  
  const metadata = {
    timestamp: new Date().toISOString(),
    os: detectOS(),
    ide: detectIDE(),
    aiTooling: detectAITooling(),
    interviewCheatSoftware: detectInterviewCheatSoftware(),
    git: detectGitInfo(),
    nodeVersion: process.version,
    npmVersion: execSync('npm --version', { encoding: 'utf-8' }).trim()
  };

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(metadata, null, 2));

  console.log('✅ Detection complete!\n');
  console.log('Results:');
  console.log(`  OS: ${metadata.os.name} ${metadata.os.version} (${metadata.os.arch})`);
  console.log(`  IDE: ${metadata.ide.map(i => i.name).join(', ') || 'Unknown'}`);
  console.log(`  AI Tooling: ${metadata.aiTooling.filter(t => t.name !== 'None detected').map(t => t.name).join(', ') || 'None detected'}`);
  const cheatDetected = metadata.interviewCheatSoftware.filter((t) => t.name !== 'None detected');
  console.log(`  Interview-assist software: ${cheatDetected.length > 0 ? cheatDetected.map((t) => t.name).join(', ') : 'None detected'}`);
  console.log(`  Git Branch: ${metadata.git.branch}`);
  console.log(`  Commits: ${metadata.git.commitCount}`);
  console.log(`\n📄 Results written to: ${OUTPUT_FILE}\n`);
  
  console.log('⚠️  Note: This detection is not exhaustive. Some tools may not be detectable.');
  console.log('   The candidate should commit and push this file as part of their submission.\n');
}

if (require.main === module) {
  main();
}

module.exports = { detectOS, detectIDE, detectAITooling, detectGitInfo, detectInterviewCheatSoftware };
