import { Request, Response } from 'express';
import { ReturnBookService } from './return.service';
import httpStatus from 'http-status';

const returnBook = async (req: Request, res: Response) => {
  try {
    const result = await ReturnBookService.returnBook(req.body);

    res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      message: 'Book returned successfully',
    });
  } catch (err: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      status: httpStatus.BAD_REQUEST,
      message: err.message,
    })
  }
};

export const ReturnBookController = {
  returnBook,
};
