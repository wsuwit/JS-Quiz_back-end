const { authenticate } = require("../controller/authController");
const express = require("express");
const multer = require("multer");
const userController = require("../controller/userController");

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log("@file:", file);
      cb(null, "public/image");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + "." + file.mimetype.split("/")[1]);
    }
  })
});

router.get("/", userController.getAllUser);
router.get("/userId", authenticate, userController.getUserByUserId);
router.put("/updateDetail", authenticate, userController.updateUserDetail);
router.put(
  "/updateImage",
  authenticate,
  upload.single("thisisinput"),
  userController.updateUserImage
);

module.exports = router;
