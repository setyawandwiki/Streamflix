const router = require("express").Router();
const auth = require("./auth");
const order = require("./order");

router.use("/auth", auth);
router.use("/movie", order);

module.exports = router;
