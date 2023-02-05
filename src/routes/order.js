const router = require("express").Router();
const { createOrder } = require("../controllers/order");

router.post("/order", createOrder);

module.exports = router;
