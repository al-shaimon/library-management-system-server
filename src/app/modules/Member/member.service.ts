import { Member } from '@prisma/client';
import prisma from '../../../shared/prisma';
const createMember = async (data: any) => {
  try {
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

    return result;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const getMemberById = async (memberId: string) => {
  try {
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
