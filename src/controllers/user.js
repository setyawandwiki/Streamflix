const User = require("../models/user");
const wrapper = require("../utils/wrapper");

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("movie").select("-password");
  if (!user) {
    return wrapper.response(res, 404, "user not found", []);
  }
  return wrapper.response(res, 200, "success get user", user);
};

module.exports = {
  getUser,
};
