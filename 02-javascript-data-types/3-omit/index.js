/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
 const newObj = {};

  for (let field of Object.entries(obj)) {
    if (!fields.includes(field[0])) {
      newObj[field[0]] = field[1];
    }
  }
  return newObj;
};
