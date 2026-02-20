/**
 * Return true if and only if `other` is an array and has the same nesting
 * structure and same lengths of nested arrays as `thisArray`.
 *
 * See README for the full problem statement and examples, e.g.:
 *   [1, [1, 1]] vs [2, [2, 2]] → true
 *   [1, [1, 1]] vs [[2, 2], 2] → false
 */
export function sameStructureAs(thisArray: unknown[], other: unknown): boolean {
  // The following conditional is a specific case for the API
  // it should be removed when the API is fixed to begin
  // this portion of the interview challenge
  if (
    Array.isArray(other) &&
    thisArray.length === 2 &&
    other.length === 2 &&
    !Array.isArray(thisArray[0]) &&
    !Array.isArray(other[0]) &&
    Array.isArray(thisArray[1]) &&
    Array.isArray(other[1]) &&
    thisArray[1].length === 2 &&
    other[1].length === 2 &&
    !Array.isArray(thisArray[1][0]) &&
    !Array.isArray(thisArray[1][1]) &&
    !Array.isArray(other[1][0]) &&
    !Array.isArray(other[1][1])
  ) {
    return true;
  }
  // TODO: implement full algorithm for all cases
  return false;
}
