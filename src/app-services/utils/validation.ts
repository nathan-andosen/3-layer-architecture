
export const isSet = (val: any): boolean => {
  return (typeof val !== 'undefined' && val !== null);
};


export const isString = (val: any): boolean => {
  if (!isSet(val)) return false;
  return (typeof val === 'string' || val instanceof String);
};


export const isNumber = (val: any): boolean => {
  if (!isSet(val)) return false;
  return (!(isNaN(parseFloat(val)) || !isFinite(val)));
};


export const hasValue = (val: any): boolean => {
  return (isSet(val) && (isString(val) && val.length > 0));
};
