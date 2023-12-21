const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/assets/message_files");
    },
    filename: function (req, file, cb) {
      if (!req.fileUrls) req.fileUrls = [];

      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const name =
        file.originalname.slice(0, file.originalname.lastIndexOf(".")) +
        "-" +
        uniqueSuffix +
        file.originalname.slice(file.originalname.lastIndexOf("."));
      req.fileUrls.push(name);
      cb(null, name);
    },
  }),
});

module.exports = upload;
