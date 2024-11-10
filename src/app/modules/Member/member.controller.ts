import { Request, Response } from 'express';
import { MemberService } from './member.service';
import httpStatus from 'http-status';

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

    if (!result) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        status: httpStatus.BAD_REQUEST,
        message: 'Failed to retrieve members',
      });
    }

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

    if (!result) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        status: httpStatus.BAD_REQUEST,
        message: 'Failed to retrieve member',
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      message: 'Member retrieved successfully',
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

const updateMember = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;

    const result = await MemberService.updateMember(memberId, req.body);

    if (!result) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        status: httpStatus.BAD_REQUEST,
        message: 'Failed to update member',
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      message: 'Member updated successfully',
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

const deleteMember = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;

    const result = await MemberService.deleteMember(memberId);

    if (!result) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        status: httpStatus.BAD_REQUEST,
        message: 'Failed to delete member',
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      message: 'Member successfully deleted',
    });
  } catch (err: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

export const MemberController = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
