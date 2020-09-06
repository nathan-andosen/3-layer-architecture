
/**
 * Determine if object is set (not null and not undefined)
 *
 * @param {*} obj
 * @returns {boolean}
 */
export const isSet = (obj: any): boolean => {
  return (typeof obj !== 'undefined' && obj !== null);
};


/**
 * Determine if object is a string
 *
 * @param {*} obj
 * @returns {boolean}
 */
export const isString = (obj: any): boolean => {
  if (!isSet(obj)) return false;
  return (typeof obj === 'string' || obj instanceof String);
};


/**
 * Determine if object is a number
 *
 * @param {*} obj
 * @returns {boolean}
 */
export const isNumber = (obj: any): boolean => {
  if (!isSet(obj)) return false;
  return (!(isNaN(parseFloat(obj)) || !isFinite(obj)));
};


/**
 * Determine if string is not empty
 *
 * @param {*} obj
 * @returns {boolean}
 */
export const stringIsNotEmpty = (obj: any): boolean => {
  return (isSet(obj) && (isString(obj) && obj.length > 0));
};
