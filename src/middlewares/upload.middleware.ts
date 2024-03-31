import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.size > 10 * 1024 * 1024) {
    cb("Maximum file size is 10MB.", false);
  } else if (
    file.mimetype.startsWith("image") ||
    file.mimetype.startsWith("video")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only images or video.", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const id = uuidv4();
    const typeFileArr = file.mimetype.split("/");
    const extension = typeFileArr[typeFileArr.length - 1];
    const originalnameWithoutExtension = file.originalname.replace(
      /\.[^/.]+$/,
      ""
    );

    cb(
      null,
      `${id}-${originalnameWithoutExtension}-${Date.now()}.${extension}`
    );
  },
});

export const uploadFile = multer({ storage, fileFilter });

// export const deletePreviousFiles = (req, res, next) => {
//   fs.readdir('public/images/', (err1, files) => {
//     if (err1) {
//       console.error(err1);
//       return res.status(500).send('Internal Server Error');
//     }

//     files.forEach((file) => {
//       if (file !== req.file.filename) {
//         fs.unlink('public/images/' + file, (err2) => {
//           if (err2) {
//             console.error(err2);
//           }
//         });
//       }
//     });

//     next();
//   });
// };
