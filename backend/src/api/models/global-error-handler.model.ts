const handleNotFound = (err: any) => {
  const message = `Invalid ${err.path} format: ${err.value}.`;
  return appError(message, 400);
};

const handleDuplicateFieldsDB = (err: any) => {
  const message = `Duplicate field value: ${err?.meta?.target}. Please use another value!`;
  return appError(message, 400);
};

const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return appError(message, 400);
};

export const appError = (message: any, statusCode: any) =>
  Object.assign({
    statusCode,
    message,
    isOperational: true,
  });

const sendError = (err: any, req: any, res: any) => {
  res.status(err.statusCode).json({
    status: false,
    code: err.statusCode,
    error: { message: err?.message, trace: err?.message ? "" : err },
  });
};

export default (err: any, req: any, res: any, next: any) => {
  console.log({ err });
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err?.isOperational) {
    sendError(err, req, res);
  } else {
    if (err.code === "P2001") err = handleNotFound(err);
    if (err.code === "P2002") err = handleDuplicateFieldsDB(err);
    if (err.name === "P2005") err = handleValidationErrorDB(err);
    sendError(err, req, res);
  }
};
