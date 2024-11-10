import { Request, Response } from 'express';
import { MemberService } from './member.service';

const createMember = async (req: Request, res: Response) => {
  try {
    const result = await MemberService.createMember(req.body);

    if (!result) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        status: httpStatus.BAD_REQUEST,
        message: 'Failed to create member',
      });
    }

    res.status(httpStatus.CREATED).json({
      success: true,
      status: httpStatus.CREATED,
      message: 'Member created successfully',
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

const getAllMembers = async (req: Request, res: Response) => {
  try {
    const result = await MemberService.getAllMembers();

    res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      message: 'Members retrieved successfully',
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

const getMemberById = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;

    const result = await MemberService.getMemberById(memberId);

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Member retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

const updateMember = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;

    const result = await MemberService.updateMember(memberId, req.body);

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Member updated successfully',
      data: result,
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

const deleteMember = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;

    const result = await MemberService.deleteMember(memberId);

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Member successfully deleted',
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

export const MemberController = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
