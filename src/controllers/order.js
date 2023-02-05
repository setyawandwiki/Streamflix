const Order = require("../models/order");
const User = require("../models/user");
const wrapper = require("../utils/wrapper");
const snapMidtrans = require("../utils/snapMidtrans");

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
        $inc: {
          money: -order.price,
        },
      },
      { new: true, runValidators: true }
    );
    const { _id } = order;
    const redirectUrl = await snapMidtrans.post({
      _id,
      price,
    });
    return wrapper.response(res, 201, "success buy the movie", {
      order,
      redirectUrl,
    });
  } catch (error) {
    console.log(error);
    return wrapper.response(res, 500, error.message, error);
  }
};

module.exports = {
  createOrder,
};
