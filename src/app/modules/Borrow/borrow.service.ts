import prisma from '../../../shared/prisma';

const borrowBook = async (data: any) => {
  try {
    const book = await prisma.book.findUnique({
      where: {
        bookId: data.bookId,
      },
    });

    if (!book) {
      throw new Error('Book not found');
    }

    if (book.availableCopies <= 0) {
      throw new Error('Book is not available');
    }

    const result = await prisma.$transaction(async (transactionClient) => {
      await transactionClient.book.update({
        where: {
          bookId: data.bookId,
        },
        data: {
          availableCopies: {
            decrement: 1,
          },
        },
      });

      const borrowedRecord = await transactionClient.borrowRecord.create({
        data: {
          bookId: data.bookId,
          memberId: data.memberId,
          borrowDate: new Date(),
          returnDate: data.returnDate || null,
        },
        select: {
          borrowId: true,
          bookId: true,
          memberId: true,
          borrowDate: true,
        },
      });

      return borrowedRecord;
    });

    return result;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const BorrowService = {
  borrowBook,
};
