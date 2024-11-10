import { Request, Response } from 'express';
import { BorrowService } from './borrow.service';

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

export const BorrowController = {
  borrowBook,
};
