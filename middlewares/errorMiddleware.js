exports.errorHandler = (err, req, res, next) => {
  console.log("[Internal issue]:", err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
  });
};
