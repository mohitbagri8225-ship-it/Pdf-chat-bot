import { Router } from "express";
import {askQuestion, getChatHistory, uploadfileInPincode} from "../controllers/chat.controller.js"
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/verifyjwt.middleware.js";

const router = Router();


router.post( "/upload-pdf", verifyJwt, upload.single("file"), uploadfileInPincode); 
router.route('/get-response').post(verifyJwt,askQuestion);
router.route('/get-history').post(verifyJwt,getChatHistory);


export default router;

