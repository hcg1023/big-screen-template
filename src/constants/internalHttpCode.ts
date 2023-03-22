export enum InternalHttpCode {
  SUCCESS,
  AuthExpired = 401,
  AuthError = 403,
  NotFound = 404,
  ServerError = 500,
}
