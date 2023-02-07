const router = require("express").Router();
const { verify } = require("../controllers/auth");
const { getUser } = require("../controllers/user");

router.get("/profile/:id", verify, getUser);

module.exports = router;
