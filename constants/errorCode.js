export const errorName = {
  BAD_REQUEST: "BAD_REQUEST",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  JOB_ALREADY_EXISTS: "JOB_ALREADY_EXISTS",
  SERVER_ERROR: "SERVER_ERROR",
  LOGIN_FAILED: "LOGIN_FAILED",
  LOGIN_INPUT_EMPTY: "LOGIN_INPUT_EMPTY",
  WRONG_PASSWORD: "WRONG_PASSWORD",
};

export const errorType = {
  BAD_REQUEST: {
    message: "Bad request.",
    statusCode: 400
  },
  USER_ALREADY_EXISTS: {
    message: "User is already exists.",
    statusCode: 403
  },
  JOB_ALREADY_EXISTS: {
    message: "Job is already exists.",
    statusCode: 403
  },
  SERVER_ERROR: {
    message: "Server error.",
    statusCode: 500
  },
  LOGIN_FAILED: {
    message: "Failed: username or password is incorrect.",
    statusCode: 401
  },
  LOGIN_INPUT_EMPTY: {
    message: "Failed: username or password is empty.",
    statusCode: 401
  },
  WRONG_PASSWORD: {
    message: "Failed: password is incorrect.",
    statusCode: 401
  }
};
