const API_BASE = import.meta.env.VITE_API_BASE ?? "";

export interface Item {
  id: string;
  name: string;
}

export interface CompareStructureResponse {
  items?: Item[];
  sameStructure: boolean;
  error?: string;
}

export async function compareStructureAndGetItems(
  a: unknown[],
  b: unknown[],
): Promise<CompareStructureResponse> {
  const res = await fetch(`${API_BASE}/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ a, b }),
  });
  const data = await res.json();
  if (!res.ok) {
    return { ...data, sameStructure: false };
  }
  return data;
}
