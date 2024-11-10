import { Request, RequestHandler, Response } from 'express';
import { BookService } from './book.service';
import httpStatus from 'http-status';

const createBook = async (req: Request, res: Response) => {
  try {
    const result = await BookService.createBook(req.body);

    if (!result) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        status: httpStatus.BAD_REQUEST,
        message: 'Failed to create book',
      });
    }

    res.status(httpStatus.CREATED).json({
      success: true,
      status: httpStatus.CREATED,
      message: 'Book created successfully',
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

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await BookService.getAllBooks();

    if (!result.length) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        status: httpStatus.NOT_FOUND,
        message: 'No books available in the library',
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      message: 'Books retrieved successfully',
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

const getBookById = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const result = await BookService.getBookById(bookId);

    if (!result) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        status: httpStatus.NOT_FOUND,
        message: 'Book not found',
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      message: 'Book retrieved successfully',
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
const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const result = await BookService.updateBook(bookId, req.body);

    if (!result) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        status: httpStatus.BAD_REQUEST,
        message: 'Failed to update book',
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      message: 'Book updated successfully',
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

const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const result = await BookService.deleteBook(bookId);

    if (!result) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        status: httpStatus.BAD_REQUEST,
        message: 'Failed to delete book',
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      message: 'Book successfully deleted',
    });
  } catch (err: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
