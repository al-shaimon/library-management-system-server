import { Request, Response } from 'express';
import { BookService } from './book.service';
import httpStatus from 'http-status';

const createBook = async (req: Request, res: Response) => {
  try {
    const result = await BookService.createBook(req.body);

    res.status(201).json({
      success: true,
      status: 201,
      message: 'Book created successfully',
      data: result,
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

export const BookController = {
  createBook,
};
