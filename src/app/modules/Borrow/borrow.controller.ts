import { Request, Response } from 'express';
import { BorrowService } from './borrow.service';
import httpStatus from 'http-status';

const borrowBook = async (req: Request, res: Response) => {
  try {
    const result = await BorrowService.borrowBook(req.body);

    res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      message: 'Book borrowed successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      status: httpStatus.BAD_REQUEST,
      message: err.message,
    });
  }
};

const getOverdueBooks = async (req: Request, res: Response) => {
  try {
    const result = await BorrowService.getOverdueBooks();

    res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      message: result.length ? 'Overdue borrow list fetched' : 'No overdue books',
      data: result,
    });
  } catch (err: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

export const BorrowController = {
  borrowBook,
  getOverdueBooks,
};
