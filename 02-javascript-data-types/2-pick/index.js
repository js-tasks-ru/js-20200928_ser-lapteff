/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  let newObj = {};
  // const fieldsArr = [...fields];
  for (const fieldsArrElement of fields) {
    if (fieldsArrElement in obj) {
      newObj[`${fieldsArrElement}`] = obj[fieldsArrElement];
    }
  }
  return newObj;
};
