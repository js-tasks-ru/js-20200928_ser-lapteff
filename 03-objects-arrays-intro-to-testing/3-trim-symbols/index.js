/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if(size === undefined) return string;
  let trimString = '';
  function trim(substr, char) {
    if(substr.indexOf(char) !== -1) {
      substr+=char;
    } else {
      substr = char;
    }
    if (substr.length <= size) {
      trimString+=char;
    }
    return substr;
  }

  [...string].reduce((substr, char) => trim(substr,char), '');
  return trimString;
}
