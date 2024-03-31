"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const tslib_1 = require("tslib");
const uuid_1 = require("uuid");
const multer_1 = tslib_1.__importDefault(require("multer"));
const fileFilter = (req, file, cb) => {
    if (file.size > 10 * 1024 * 1024) {
        cb("Maximum file size is 10MB.", false);
    }
    else if (file.mimetype.startsWith("image") ||
        file.mimetype.startsWith("video")) {
        cb(null, true);
    }
    else {
        cb("Please upload only images or video.", false);
    }
};
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        const id = (0, uuid_1.v4)();
        const typeFileArr = file.mimetype.split("/");
        const extension = typeFileArr[typeFileArr.length - 1];
        const originalnameWithoutExtension = file.originalname.replace(/\.[^/.]+$/, "");
        cb(null, `${id}-${originalnameWithoutExtension}-${Date.now()}.${extension}`);
    },
});
exports.uploadFile = (0, multer_1.default)({ storage, fileFilter });
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
//# sourceMappingURL=upload.middleware.js.map