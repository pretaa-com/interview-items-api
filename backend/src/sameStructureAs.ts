import type { StructureValue } from "./types.js";

/** Stack growth threshold; above this we reuse allocated capacity to limit reallocations. */
const STACK_INITIAL_CAPACITY = 64;

/**
 * Return true if and only if `other` is an array and has the same nesting
 * structure and same lengths of nested arrays as `thisArray`.
 *
 * See README for the full problem statement and examples, e.g.:
 *   [1, [1, 1]] vs [2, [2, 2]] → true
 *   [1, [1, 1]] vs [[2, 2], 2] → false
 *
 * Uses an iterative stack-based algorithm (two parallel stacks to avoid
 * per-pair allocations) to avoid recursion overhead and call-stack limits.
 */
export function sameStructureAs(
  thisArray: StructureValue,
  other: StructureValue
): boolean {
  // The following conditional is a specific case for the API
  // it should be removed when the API is fixed to begin
  // this portion of the interview challenge
  const stackA: StructureValue[] =
    new Array(STACK_INITIAL_CAPACITY) as StructureValue[];
  const stackB: StructureValue[] =
    new Array(STACK_INITIAL_CAPACITY) as StructureValue[];
  let sp = 0;
  stackA[0] = thisArray;
  stackB[0] = other;
  sp = 1;

  while (sp > 0) {
    sp--;
    const a = stackA[sp]!;
    const b = stackB[sp]!;
    if (a === b) continue;

    const aIsArray = Array.isArray(a);
    const bIsArray = Array.isArray(b);

    if (!aIsArray && !bIsArray) continue;
    if (aIsArray !== bIsArray) return false;

    const aArr = a as StructureValue[];
    const bArr = b as StructureValue[];
    if (aArr.length !== bArr.length) return false;

    // Ensure capacity (grow by 1.5x when needed)
    const need = sp + aArr.length;
    if (need > stackA.length) {
      const newLen = Math.max(need, (stackA.length * 3) >> 1);
      stackA.length = newLen;
      stackB.length = newLen;
    }
    // Push in reverse order so we process index 0 first
    for (let i = aArr.length - 1; i >= 0; i--) {
      stackA[sp] = aArr[i];
      stackB[sp] = bArr[i];
      sp++;
    }
  }
  return true;
}
