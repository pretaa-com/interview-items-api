/**
 * Return true if and only if `other` is an array and has the same nesting
 * structure and same lengths of nested arrays as `thisArray`.
 *
 * See README for the full problem statement and examples, e.g.:
 *   [1, [1, 1]] vs [2, [2, 2]] → true
 *   [1, [1, 1]] vs [[2, 2], 2] → false
 */
export function sameStructureAs(thisArray: unknown, other: unknown): boolean {
  // The following conditional is a specific case for the API
  // it should be removed when the API is fixed to begin
  // this portion of the interview challenge

  let thisIsArray = Array.isArray(thisArray);
  let otherIsArray = Array.isArray(other);
  let areTheyTheSame = true;

  if (!thisIsArray && !otherIsArray) {
    return true;
  }

  if (typeof thisArray !== typeof other) {
    return false;
  }

  if (thisIsArray !== otherIsArray) {
    return false;
  }

  if (Array.isArray(thisArray) && Array.isArray(other)) {
    if (thisArray.length !== other.length) {
      return false;
    }

    for (let i = 0; i < thisArray.length; i++) {
      const currentThis = thisArray[i];
      const currentOther = other[i];

      const areThey = sameStructureAs(currentThis, currentOther);

      if (areThey === false) {
        areTheyTheSame = false;
      }
    }
  }

  return areTheyTheSame;
}
