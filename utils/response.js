import { errorType } from "../constants/errorCode";

export const createResponse = (data, success = true, message = "") => {
  return {
    success,
    message,
    data: data ? (Array.isArray(data) ? data : [data]) : []
  };
};

export const getErrorCode = errorName => {
  return errorType[errorName] || errorType.BAD_REQUEST;
};
