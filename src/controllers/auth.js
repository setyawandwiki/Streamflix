const User = require("../models/user");
const wrapper = require("../utils/wrapper");
const bcrypt = require("bcrypt");

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

module.exports = {
  register,
};
