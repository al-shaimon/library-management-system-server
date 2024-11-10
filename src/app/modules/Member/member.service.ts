import { Member } from '@prisma/client';
import prisma from '../../../shared/prisma';
const createMember = async (data: any) => {
  try {
    const result = await prisma.member.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        membershipDate: new Date() || data.membershipDate,
      },
    });

    return result;
  } catch (err: any) {
    console.log(err.message);
  }
};

const getAllMembers = async () => {
  try {
    const result = await prisma.member.findMany({});

    return result;
  } catch (err: any) {
    console.log(err);
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
    console.log(err);
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
    });

    return result;
  } catch (err: any) {
    console.log(err);
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
    console.log(err);
  }
};

export const MemberService = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
