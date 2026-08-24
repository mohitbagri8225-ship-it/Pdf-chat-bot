import { Router } from "express";
import {askQuestion, createChat, getAllChats, getChatHistory, uploadfileInPincode} from "../controllers/chat.controller.js"
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/verifyjwt.middleware.js";

const router = Router();

router.post(
  "/upload-pdf",
  verifyJwt,
  upload.single("pdf"),
  uploadfileInPincode
);
router.route('/get-response').post(verifyJwt,askQuestion);
router.route('/get-history').post(verifyJwt,getChatHistory);
router.route('/create-chat').get(verifyJwt,createChat);
router.route('/get-all-chats').post(verifyJwt,getAllChats);


export default router;

