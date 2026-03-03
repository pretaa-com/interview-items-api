/**
 * Return true if and only if `other` is an array and has the same nesting
 * structure and same lengths of nested arrays as `thisArray`.
 *
 * See README for the full problem statement and examples, e.g.:
 *   [1, [1, 1]] vs [2, [2, 2]] → true
 *   [1, [1, 1]] vs [[2, 2], 2] → false
 */


/**
 * 
 * @param thisArray 
 * @param other 
 * @returns boolean
 * @description This function compares two data structures (arrays) by replacing all values with a single string, 
 * stringifying the structures, and then comparing the resulting strings. 
 * It returns true if the structures are the same (same nesting and same lengths of nested arrays) and false otherwise.
 */
export function sameStructureAs(thisArray: unknown[], other: unknown): boolean {

  if (!Array.isArray(thisArray) || !Array.isArray(other)) {
    return false;
  }

  if (thisArray.length !== (other as unknown[]).length) {
    return false;
  }

  const replacementValue = 'x'; // can be any string that won't appear in the original arrays

  let thisString = JSON.stringify(thisArray);
  let otherString = JSON.stringify(other);

  thisString = replaceArrayTextRec(thisArray, replacementValue);
  otherString = replaceArrayTextRec(other as unknown[], replacementValue);

  return thisString === otherString;
}

function replaceArrayTextRec(arr: unknown[], replacementValue: string = 'x'): string {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      arr[i] = replaceArrayTextRec(arr[i] as unknown[], replacementValue);
    } else if (typeof arr[i] === 'number') {
      arr[i] = replacementValue;
    } else if (typeof arr[i] === 'string') {
      arr[i] = replacementValue;
    } else if (typeof arr[i] === 'object') {
      arr[i] = replaceObjectTextRec(arr[i] as Record<string, unknown>, replacementValue);
    }
  }
  
  return JSON.stringify(arr);
}

function replaceObjectTextRec(obj: Record<string, unknown>, replacementValue: string = 'x'): string {

  const keys = Object.keys(obj);

  for (let key of keys) {
    if (Array.isArray(obj[key])) {
      obj[key] = replaceArrayTextRec(obj[key] as unknown[], replacementValue);
    } else if (typeof obj[key] === 'number') {
      obj[key] = replacementValue;
    } else if (typeof obj[key] === 'string') {
      obj[key] = replacementValue;
    } else if (typeof obj[key] === 'object') {
      obj[key] = replaceObjectTextRec(obj[key] as Record<string, unknown>, replacementValue);
    }
  }

  return JSON.stringify(obj);
}

