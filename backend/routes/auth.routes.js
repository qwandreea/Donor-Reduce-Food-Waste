const { verifySignUp } = require("../middleware");
const controller = require("../controller/auth.controller");
const express = require("express");
const router = express.Router();

router.post(
    "/signup",
    [
        verifySignUp.checkDuplicateEmail
    ],
    controller.signup
);

router.post("/login", controller.signin);


module.exports = router;
