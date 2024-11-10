import express, { Router, RequestHandler } from 'express';
import { MemberController } from './member.controller';

const router: Router = express.Router();

const createMemberHandler: RequestHandler = (req, res, next) => {
  MemberController.createMember(req, res).catch(next);
};

const getAllMembersHandler: RequestHandler = (req, res, next) => {
  MemberController.getAllMembers(req, res).catch(next);
};

const getMemberByIdHandler: RequestHandler = (req, res, next) => {
  MemberController.getMemberById(req, res).catch(next);
};

const updateMemberHandler: RequestHandler = (req, res, next) => {
  MemberController.updateMember(req, res).catch(next);
};

const deleteMemberHandler: RequestHandler = (req, res, next) => {
  MemberController.deleteMember(req, res).catch(next);
};

router.post('/', createMemberHandler);
router.get('/', getAllMembersHandler);
router.get('/:memberId', getMemberByIdHandler);
router.put('/:memberId', updateMemberHandler);
router.delete('/:memberId', deleteMemberHandler);

export const MemberRoutes = router;
