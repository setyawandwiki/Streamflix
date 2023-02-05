const User = require("../models/user");
const wrapper = require("../utils/wrapper");

const getUser = async (req, res) => {
  console.log(req.user);
  const { id } = req.user;
  const user = await User.findById(id).populate("movie").select("-password");
  if (!user) {
    return wrapper.response(res, 404, "user not found", []);
  }
  return wrapper.response(res, 200, "success get user", user);
};

module.exports = {
  getUser,
};
