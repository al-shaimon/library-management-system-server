import { Member } from '@prisma/client';
import prisma from '../../../shared/prisma';
const createMember = async (data: any) => {
  try {
    // Check if member with the same email already exists
    const existingEmail = await prisma.member.findFirst({
      where: {
        email: {
          equals: data.email,
          mode: 'insensitive',
        },
      },
    });

    if (existingEmail) {
      throw new Error('Member with this email already exists');
    }

    const result = await prisma.member.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        membershipDate: data.membershipDate || new Date(),
      },
    });

    return result;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const getAllMembers = async () => {
  try {
    const result = await prisma.member.findMany({});

    if (!result.length) {
      throw new Error('No members available in the library');
    }

    return result;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const getMemberById = async (memberId: string) => {
  try {
    // Find member by ID
    const result = await prisma.member.findUniqueOrThrow({
      where: {
        memberId,
      },
    });

    return result;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const updateMember = async (memberId: string, data: Partial<Member>) => {
  try {
    await prisma.member.findUniqueOrThrow({
      where: {
        memberId,
      },
    });

    const result = await prisma.member.update({
      where: {
        memberId,
      },
      data,
      select: {
        memberId: true,
        name: true,
        email: true,
        phone: true,
      },
    });

    return result;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const deleteMember = async (memberId: string) => {
  try {
    const borrowRecords = await prisma.borrowRecord.findFirst({
      where: {
        memberId,
        returnDate: null,
      },
    });

    // Check if member has any borrowed books
    if (borrowRecords) {
      throw new Error(
        'Cannot delete member with active borrowed books. Please ensure all books are returned first.'
      );
    }

    const result = await prisma.member.delete({
      where: {
        memberId,
      },
    });

    return result;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const MemberService = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
