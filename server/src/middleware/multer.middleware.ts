import type { Request } from "express";
import multer from "multer" 

const storage = multer.diskStorage({
  destination: function (req:Request, file:Express.Multer.File, cb) {
    cb(null, "./uploads");
  },

  filename: function (req:Request, file:Express.Multer.File, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

export const upload = multer({
  storage
});