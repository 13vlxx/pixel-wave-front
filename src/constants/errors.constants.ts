export const ErrorEnum = {
  UNAUTHORIZED: "Unauthorized",
  TOKEN_NOT_VALID: "Token not valid",
  NETWORK_ERROR: "Network Error",
  WRONG_CREDENTIALS: "Wrong credentials",
};

export const ERRORS = {
  [ErrorEnum.UNAUTHORIZED]: "You are not authorized to access this resource",
  [ErrorEnum.TOKEN_NOT_VALID]: "Token is not valid",
  [ErrorEnum.NETWORK_ERROR]: "Network Error",
  [ErrorEnum.WRONG_CREDENTIALS]: "Wrong credentials",
};
