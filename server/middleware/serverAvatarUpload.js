const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/assets/server_imgs");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const name =
        file.originalname.slice(0, file.originalname.lastIndexOf(".")) +
        "-" +
        uniqueSuffix +
        file.originalname.slice(file.originalname.lastIndexOf("."));
      req.imgUrl = name;
      cb(null, name);
    },
  }),
});

module.exports = upload;
