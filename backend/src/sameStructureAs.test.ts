import { describe, it, expect } from "vitest";
import { sameStructureAs } from "./sameStructureAs.js";

describe("sameStructureAs", () => {
  it("[1,1,1] vs [2,2,2] → true", () => {
    expect(sameStructureAs([1, 1, 1], [2, 2, 2])).toBe(true);
  });

  it("[1,[1,1]] vs [2,[2,2]] → true", () => {
    expect(sameStructureAs([1, [1, 1]], [2, [2, 2]])).toBe(true);
  });

  it("[1,[1,1]] vs [[2,2],2] → false", () => {
    expect(sameStructureAs([1, [1, 1]], [[2, 2], 2])).toBe(false);
  });

  it("[1,[1,1]] vs [2,[2]] → false", () => {
    expect(sameStructureAs([1, [1, 1]], [2, [2]])).toBe(false);
  });

  it("[[[],[]]] vs [[[],[]]] → true", () => {
    expect(sameStructureAs([[[], []]], [[[], []]])).toBe(true);
  });

  it("[[[],[]]] vs [[1,1]] → false", () => {
    expect(sameStructureAs([[[], []]], [[1, 1]])).toBe(false);
  });

  it("[1,[[[1]]]] vs [2,[[[2]]]] → true", () => {
    expect(sameStructureAs([1, [[[1]]]], [2, [[[2]]]])).toBe(true);
  });

  it("[] vs 1 → false", () => {
    expect(sameStructureAs([], 1)).toBe(false);
  });

  it("[] vs {} → false", () => {
    expect(sameStructureAs([], {})).toBe(false);
  });

  it("[1,'[',']'] vs ['[',']',1] → true", () => {
    expect(sameStructureAs([1, "[", "]"], ["[", "]", 1])).toBe(true);
  });

  it("[1,2] vs [[3],3] → false", () => {
    expect(sameStructureAs([1, 2], [[3], 3])).toBe(false);
  });

  it("[1,'[1,2]'] vs [2,[4,5]] → false (string vs array in same slot)", () => {
    expect(sameStructureAs([1, "[1,2]"], [2, [4, 5]])).toBe(false);
  });

  it("[1,'[1,2,3]','{}'] vs [2,'[4,5,6]','[]'] → true (stringified values, same structure)", () => {
    expect(sameStructureAs([1, "[1,2,3]", "{}"], [2, "[4,5,6]", "[]"])).toBe(true);
  });

  it("[1,2,3] vs \"[1,2,3]\" → false (other is stringified array, not array)", () => {
    expect(sameStructureAs([1, 2, 3], "[1,2,3]")).toBe(false);
  });

  it("['[]',1] vs [[],1] → false (string '[]' vs real array)", () => {
    expect(sameStructureAs(["[]", 1], [[], 1])).toBe(false);
  });

  it("['{}'] vs ['[]'] → true (both single non-array)", () => {
    expect(sameStructureAs(["{}"], ["[]"])).toBe(true);
  });

  it("flat length-3 arrays → true", () => {
    expect(sameStructureAs(["a", "b", "c"], ["x", "y", "z"])).toBe(true);
  });

  it("nested: primitive, primitive, [primitive, primitive] → true", () => {
    expect(sameStructureAs([1, "x", [2, "y"]], [0, "a", [1, "b"]])).toBe(true);
  });

  it("single-element arrays → true", () => {
    expect(sameStructureAs(["only"], [1])).toBe(true);
  });

  it("deep single chain (5 levels) → true", () => {
    expect(sameStructureAs([[[[[1]]]]], [[[[[2]]]]])).toBe(true);
  });

  it("3×2 matrix of primitives → true", () => {
    expect(sameStructureAs([[1, 2], [3, 4], [5, 6]], [[7, 8], [9, 10], [11, 12]])).toBe(true);
  });

  it("tree: two branches, each [prim, [prim, prim]] → true", () => {
    expect(
      sameStructureAs(
        [[[1], [2, 3]], [[4], [5, 6]]],
        [[[7], [8, 9]], [[10], [11, 12]]]
      )
    ).toBe(true);
  });

  it("tree same shape but one inner array wrong length → false", () => {
    expect(
      sameStructureAs(
        [[[1], [2, 3]], [[4], [5, 6]]],
        [[[7], [8, 9]], [[10], [11, 12, 13]]]
      )
    ).toBe(false);
  });

  it("deep with empty arrays at multiple levels → true", () => {
    expect(
      sameStructureAs([1, [2, [], [3, []]]], [4, [5, [], [6, []]]])
    ).toBe(true);
  });

  it("five empty arrays (wide shallow) → true", () => {
    expect(sameStructureAs([[], [], [], [], []], [[], [], [], [], []])).toBe(true);
  });

  it("single chain depth 5, same → true", () => {
    expect(
      sameStructureAs([1, [2, [3, [4, [5]]]]], [6, [7, [8, [9, [10]]]]])
    ).toBe(true);
  });

  it("single chain depth 5, other has extra element at leaf → false", () => {
    expect(
      sameStructureAs([1, [2, [3, [4, [5]]]]], [6, [7, [8, [9, [10, 11]]]]])
    ).toBe(false);
  });

  it("2×2 matrix of length-2 arrays → true", () => {
    expect(
      sameStructureAs(
        [[[1, 2], [3, 4]], [[5, 6], [7, 8]]],
        [[[9, 10], [11, 12]], [[13, 14], [15, 16]]]
      )
    ).toBe(true);
  });

  it("branching with empty at tip → true", () => {
    expect(
      sameStructureAs([[1, [2, []]], [3, 4]], [[5, [6, []]], [7, 8]])
    ).toBe(true);
  });
});
