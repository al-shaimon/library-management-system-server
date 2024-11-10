import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createBook = async (data: any) => {
  try {
    const existingBook = await prisma.book.findFirst({
      where: {
        title: {
          equals: data.title,
          mode: 'insensitive',
        },
      },
    });

    if (existingBook) {
      throw new Error('Book already exists');
    }

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
    throw new Error(err.message);
  }
};

const getAllBooks = async () => {
  try {
    const result = await prisma.book.findMany({});

    return result;
  } catch (err: any) {
    throw new Error(err.message);
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
    throw new Error(err.message);
  }
};

const updateBook = async (bookId: string, data: Partial<Book>) => {
  try {
    if (data.title) {
      const existingBook = await prisma.book.findFirst({
        where: {
          AND: [
            {
              title: {
                equals: data.title,
                mode: 'insensitive',
              },
            },
            {
              bookId: {
                not: bookId,
              },
            },
          ],
        },
      });

      if (existingBook) {
        throw new Error('Book with this title already exists');
      }
    }

    const result = await prisma.book.update({
      where: {
        bookId,
      },
      data,
    });

    return result;
  } catch (err: any) {
    throw new Error(err.message);
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
    throw new Error(err.message);
  }
};

export const BookService = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
