const express = require('express');
const router = express.Router();
const {home, register, login} = require("../controllers/auth-controller");


router.route("/").get(home);
// router.get("/", (req, res)=>{
//     res.status(200).send("welcom to slash");
// });
router.route("/register").post(register);
router.route("/login").post(login);


module.exports = router;