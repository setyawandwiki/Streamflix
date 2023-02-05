const Order = require("../models/order");
const wrapper = require("../utils/wrapper");

const createOrder = async (req, res) => {
  try {
    const { name, price, owner } = req.body;
    const order = await Order.create({ name, price, owner });
    return wrapper.response(res, 201, "success buy the movie", order);
  } catch (error) {
    return wrapper.response(res, 500, error.message, error);
  }
};

module.exports = {
  createOrder,
};
