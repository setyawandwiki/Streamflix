const User = require("../models/user");
const wrapper = require("../utils/wrapper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (password.length < 2) {
      return wrapper.response(res, 400, "minimum character 2", []);
    }

    if (password.length > 10) {
      return wrapper.response(res, 400, "maximum character 10", []);
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      console.log("test");
      return wrapper.response(res, 400, "user already exist", []);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hashSync(password, salt);

    const user = await User.create({
      name,
      email,
      password: hash,
    });

    return wrapper.response(res, 200, "success register", user);
  } catch (error) {
    return wrapper.response(res, 500, error.message, error);
  }
};

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return wrapper.response(res, 404, "email is not found", []);
    }

    const verify = await bcrypt.compare(req.body.password, user.password);
    if (!verify) {
      return wrapper.response(res, 401, "wrong email and password", []);
    }

    const accessToken = await jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    return wrapper.response(res, 201, "success login", {
      ...others,
      accessToken,
    });
  } catch (error) {
    return wrapper.response(res, 500, error.message, error);
  }
};

module.exports = {
  register,
  login,
};
