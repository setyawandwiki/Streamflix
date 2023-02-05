const router = require("express").Router();
const auth = require("./auth");
const order = require("./order");
const user = require("./user");

router.use("/auth", auth);
router.use("/movie", order);
router.use("/user", user);

module.exports = router;
