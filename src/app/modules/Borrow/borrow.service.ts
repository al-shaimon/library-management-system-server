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

    // Using Prisma transaction to ensure data consistency
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

const getOverdueBooks = async () => {
  try {
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    // Fetch overdue books along with book and member details using Prisma's eager loading feature
    const overdueBooks = await prisma.borrowRecord.findMany({
      where: {
        borrowDate: {
          lte: fourteenDaysAgo,
        },
        returnDate: null,
      },
      include: {
        book: true,
        member: true,
      },
    });

    // Calculate overdue days
    const formattedOverdueBooks = overdueBooks.map((record) => {
      const overdueDays = Math.floor(
        (new Date().getTime() - new Date(record.borrowDate).getTime()) / (1000 * 60 * 60 * 24) - 14
      );

      return {
        borrowId: record.borrowId,
        bookTitle: record.book.title,
        borrowerName: record.member.name,
        overdueDays: overdueDays,
      };
    });

    return formattedOverdueBooks;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const BorrowService = {
  borrowBook,
  getOverdueBooks,
};
