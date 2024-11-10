import { Request, Response } from 'express';
import { BookService } from './book.service';

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

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await BookService.getAllBooks();

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Books retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const result = await BookService.getBookById(bookId);

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Book retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const result = await BookService.updateBook(bookId, req.body);

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Book updated successfully',
      data: result,
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const result = await BookService.deleteBook(bookId);

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Book successfully deleted',
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
