/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const copyArr = arr.slice();
  switch (param) {
    case 'desc':
      return copyArr.sort( (a, b) => {
        return b.localeCompare(a, 'ru',{caseFirst: 'lower'});
      });
    case 'asc':
    default:
      return copyArr.sort( (a, b) => {
        return a.localeCompare(b, 'ru',{caseFirst: 'upper'});
      });
  }
}
