"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRoutes = void 0;
const express_1 = __importDefault(require("express"));
const member_controller_1 = require("./member.controller");
const router = express_1.default.Router();
const createMemberHandler = (req, res, next) => {
    member_controller_1.MemberController.createMember(req, res).catch(next);
};
const getAllMembersHandler = (req, res, next) => {
    member_controller_1.MemberController.getAllMembers(req, res).catch(next);
};
const getMemberByIdHandler = (req, res, next) => {
    member_controller_1.MemberController.getMemberById(req, res).catch(next);
};
const updateMemberHandler = (req, res, next) => {
    member_controller_1.MemberController.updateMember(req, res).catch(next);
};
const deleteMemberHandler = (req, res, next) => {
    member_controller_1.MemberController.deleteMember(req, res).catch(next);
};
router.post('/', createMemberHandler);
router.get('/', getAllMembersHandler);
router.get('/:memberId', getMemberByIdHandler);
router.put('/:memberId', updateMemberHandler);
router.delete('/:memberId', deleteMemberHandler);
exports.MemberRoutes = router;
