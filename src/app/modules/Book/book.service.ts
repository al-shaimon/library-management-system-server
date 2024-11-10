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

export const BookService = {
  createBook,
};
