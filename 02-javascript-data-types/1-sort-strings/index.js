/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const copyArr = arr.slice();
  let sorted;
  switch (param) {
    case 'desc':
      sorted = copyArr.sort( (a, b) => {
        return b.localeCompare(a, {},{caseFirst: 'lower'});
      });
      break;
    case 'asc':
    default:
      sorted = copyArr.sort( (a, b) => {
        return a.localeCompare(b, {},{caseFirst: 'upper'});
      });
  }
  return sorted;
}
