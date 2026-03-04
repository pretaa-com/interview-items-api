/**
 * Return true if and only if `other` is an array and has the same nesting
 * structure and same lengths of nested arrays as `thisArray`.
 *
 * See README for the full problem statement and examples, e.g.:
 *   [1, [1, 1]] vs [2, [2, 2]] → true
 *   [1, [1, 1]] vs [[2, 2], 2] → false
 */
export function sameStructureAs(thisArray: unknown[], other: unknown): boolean {
  if (!Array.isArray(other)) {
    return false;
  }

  const zipped = zipArrays(thisArray, other);

  const result = zipped.reduce((acc, tuple) => {
    if (tuple.includes(undefined)) {
      return false;
    }

    const arrayCount = tuple.filter( element => Array.isArray(element) === true ).length;

    switch(arrayCount) {
      // Neither side is an array -> same structure
      case 0: return acc && true;

      // One side is an array -> not same structure
      case 1: return false;

      // Both sides are arrays -> dig deeper
      case 2: return acc && sameStructureAs(tuple[0] as unknown[], tuple[1] as unknown[]);

      // Shouldn't happen, but just in case...
      default:
        return false;
    }

  }, true);

  return result;
}

function zipArrays(
  firstArray: unknown[],
  secondArray: unknown[],
): Array<[unknown | undefined, unknown | undefined]> {

  const maxLength = Math.max(firstArray.length, secondArray.length);
  const zipped: Array<[unknown|undefined, unknown|undefined]> = [];

  for (let i=0; i < maxLength; i += 1) {
    zipped.push([firstArray[i], secondArray[i]]);
  }

  return zipped;
}

