const Order = require("../models/order");
const User = require("../models/user");
const wrapper = require("../utils/wrapper");

const createOrder = async (req, res) => {
  try {
    const { name, price, owner } = req.body;
    const order = await Order.create({ name, price, owner });
    const user = await User.findOneAndUpdate(
      { _id: owner },
      {
        $push: {
          movie: order._id,
        },
      },
      { new: true, runValidators: true }
    );
    return wrapper.response(res, 201, "success buy the movie", order);
  } catch (error) {
    return wrapper.response(res, 500, error.message, error);
  }
};

module.exports = {
  createOrder,
};
