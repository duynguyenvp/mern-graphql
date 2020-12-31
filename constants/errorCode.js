export const errorName = {
  BAD_REQUEST: "BAD_REQUEST",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  JOB_ALREADY_EXISTS: "JOB_ALREADY_EXISTS",
  SERVER_ERROR: "SERVER_ERROR"
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
  }
};
