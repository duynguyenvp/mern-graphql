export const createResponse = (data, success = true, message = "") => {
  return {
    success,
    message,
    data: data ? (Array.isArray(data) ? data : [data]) : []
  };
};
