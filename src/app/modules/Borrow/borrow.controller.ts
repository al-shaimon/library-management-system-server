import { Request, Response } from 'express';
import { BorrowService } from './borrow.service';
import httpStatus from 'http-status';

const borrowBook = async (req: Request, res: Response) => {
  try {
    const result = await BorrowService.borrowBook(req.body);

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Book borrowed successfully',
      data: result,
    });
  } catch (err: any) {
    console.log(err.message);
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
