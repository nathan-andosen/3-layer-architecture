import { isString } from './validation';

export const extractErrorMessage = (err: any) => {
  let errorMsg = 'Unexpected error.';
  if (isString(err)) {
    errorMsg = err;
  } else if (err && err.message) {
    errorMsg = err.message;
  }
  return errorMsg;
};