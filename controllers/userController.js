const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { User } = require("../models");
const utils = require("util");

const uploadPromise = utils.promisify(cloudinary.uploader.upload);

exports.getAllUser = async (req, res, next) => {
  try {
    const result = await User.findAll();
    return res.json({ result });
  } catch (error) {
    next(error);
  }
};

exports.getUserByUserId = async (req, res, next) => {
  try {
    const result = await User.findOne({ where: { id: req.user.id } });
    return res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.updateUserDetail = async (req, res, next) => {
  try {
    const { nickname } = req.body;
    console.log(`@req.body:`, req.body);
    const user = await User.findOne({ where: { id: req.user.id } });
    user.nickname = nickname;

    const rows = await user.save();
    console.log("@rowsUpdateUser:", rows);

    if (rows === 0) {
      return res.status(400).json({ message: "fail to update user" });
    }

    return res.status(200).json({ rows });
  } catch (error) {
    next(error.message);
  }
};

exports.updateUserImage = async (req, res, next) => {
  console.log("@req.file:", req.file);
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    const result = await uploadPromise(req.file.path, { timeout: 60000 });
    user.profileImage = result.secure_url;

    fs.unlinkSync(req.file.path);

    const rows = await user.save();

    if (rows === 0) {
      return res.status(400).json({ message: "fail to update image" });
    }

    return res.status(200).json({ rows });
  } catch (error) {
    next(error.message);
  }
};
