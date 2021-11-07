const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const CustomError = require("../utils/error");

exports.authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer")) {
      return res.status(401).json({ message: "you are unauthorized" });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "you are unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ where: { id: decoded.id } });

    console.log("@decoded:", decoded);
    console.log("@user:", user);

    if (!user) {
      return res.status(401).json({ message: "you are unauthorized" });
    }

    req.data = decoded;
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { email, password, confirmPassword, nickname, profileImage } =
      req.body;

    if (password !== confirmPassword) {
      throw new CustomError("password and confirm password did not match", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      email,
      password: hashedPassword,
      nickname,
      profileImage
    });

    res.status(200).json({ message: "your account has been created" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      // expiresIn: 60 * 60 * 24 * 30
      expiresIn: "30d"
    }); // # 30 days

    res.json({ message: "success logged in", token });
  } catch (err) {
    next(err);
  }
};
