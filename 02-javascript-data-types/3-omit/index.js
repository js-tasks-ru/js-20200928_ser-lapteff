/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  let newObj = {};
  const fieldsArr = [...fields];
  for (const fieldsArrElement of fieldsArr) {
    if (fieldsArrElement in obj) {
      delete obj[`${fieldsArrElement}`];
      newObj = Object.assign(obj);
    }
  }
  return newObj;
};
