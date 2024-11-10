import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createBook = async (data: any) => {
  try {
    const result = await prisma.book.create({
      data: {
        title: data.title,
        genre: data.genre,
        publishedYear: data.publishedYear,
        totalCopies: data.totalCopies,
        availableCopies: data.totalCopies,
      },
    });

    return result;
  } catch (err: any) {
    console.log(err);
  }
};

const getAllBooks = async () => {
  try {
    const result = await prisma.book.findMany({});

    return result;
  } catch (err: any) {
    console.log(err);
  }
};

const getBookById = async (bookId: string) => {
  try {
    const result = await prisma.book.findUniqueOrThrow({
      where: {
        bookId,
      },
    });

    return result;
  } catch (err: any) {
    console.log(err);
  }
};

const updateBook = async (bookId: string, data: Partial<Book>) => {
  try {
    await prisma.book.findUniqueOrThrow({
      where: {
        bookId,
      },
    });

    const result = await prisma.book.update({
      where: {
        bookId,
      },
      data,
    });

    return result;
  } catch (err: any) {
    console.log(err);
  }
};

const deleteBook = async (bookId: string) => {
  try {
    const result = await prisma.book.delete({
      where: {
        bookId,
      },
    });

    return result;
  } catch (err: any) {
    console.log(err);
  }
};

export const BookService = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
