import { isString } from './validation';

/**
 * Extract an error message from a thrown error
 *
 * @param {*} err
 * @returns {string}
 */
export const extractErrorMessage = (err: any): string => {
  let errorMsg = 'Unexpected error.';
  if (isString(err)) {
    errorMsg = err;
  } else if (err && err.message) {
    errorMsg = err.message;
  }
  return errorMsg;
};
