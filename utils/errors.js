function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

function errorResponse(res, statusCode, message, extra) {
  const payload = { message };
  if (extra !== undefined) payload.extra = extra;
  return res.status(statusCode).json(payload);
}

module.exports = { asyncHandler, errorResponse };

