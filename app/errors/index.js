const BadRequestError = require("./bad-request");
const CustomAPIError = require("./custom-api-error");
const NotFoundError = require("./not-found");
const UnathenticatedError = require("./unauthenticated");
const UnauthorizedError = require("./unauthorized");

module.exports = {
  BadRequestError,
  CustomAPIError,
  NotFoundError,
  UnathenticatedError,
  UnauthorizedError,
};
