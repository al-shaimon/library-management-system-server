import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    status: httpStatus.INTERNAL_SERVER_ERROR,
    message: err?.message || 'Internal Server Error',
    error: err,
  });
};

export default globalErrorHandler;
