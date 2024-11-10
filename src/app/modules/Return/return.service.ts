import prisma from '../../../shared/prisma';

const returnBook = async (data: any) => {
  try {
    const borrowRecord = await prisma.borrowRecord.findUnique({
      where: {
        borrowId: data.borrowId,
      },
      include: {
        book: true,
      },
    });

    if (!borrowRecord) {
      throw new Error('Borrow record not found');
    }

    if (borrowRecord.returnDate) {
      throw new Error('Book has already been returned');
    }

    const result = await prisma.$transaction(async (transactionClient) => {
      await transactionClient.book.update({
        where: {
          bookId: borrowRecord.bookId,
        },
        data: {
          availableCopies: {
            increment: 1,
          },
        },
      });

      await transactionClient.borrowRecord.update({
        where: {
          borrowId: data.borrowId,
        },
        data: {
          returnDate: new Date(),
        },
      });
    });

    return result;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const ReturnBookService = {
  returnBook,
};
