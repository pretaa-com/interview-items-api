/**
 * Return true if and only if `other` is an array and has the same nesting
 * structure and same lengths of nested arrays as `thisArray`.
 *
 * See README for the full problem statement and examples, e.g.:
 *   [1, [1, 1]] vs [2, [2, 2]] → true
 *   [1, [1, 1]] vs [[2, 2], 2] → false
 */
export function sameStructureAs(
  thisArray: unknown[], 
  other: unknown
): boolean {
  if (!Array.isArray(other)) {
    return false;
  }

  const otherArray: unknown[] = other as unknown[];
  if (otherArray.length != thisArray.length) {
    return false;
  }

  for (var i in thisArray) {
    const thisElement = thisArray[i];
    const otherElement = otherArray[i];

    if (!Array.isArray(thisElement) && !Array.isArray(otherElement)) {
      continue;
    }

    if (!sameStructureAs(thisElement as unknown[], otherElement)) {
      return false;
    }
  }

  return true;
}
