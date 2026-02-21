/**
 * Leaf in structure comparison (no nested arrays).
 * typeof is used for matching; object covers plain objects from JSON.
 */
export type StructureLeaf = string | number | boolean | null | object;

/**
 * One side of a structure: either an array of such values (recursive)
 * or a leaf. Accurately depicts what the API sends and what tests use.
 */
export type StructureValue = StructureLeaf | StructureValue[];

/**
 * Request body for POST /api/items — a and b are arrays of structure values.
 */
export interface SameStructureRequestBody {
  a: StructureValue[];
  b: StructureValue[];
}
