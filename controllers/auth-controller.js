const User = require('../models/user-model');
const bcrypt = require('bcryptjs');


// 1 Home page //
const home = async (req, res) => {
  try {
    res.status(200).send('welcome to home page in controller');
  } catch (error) {
    res.status(400).send({ msg: "requisted page not found on this server" })
  }
}


//2 Registration //
const register = async (req, res) => {
  try {
    console.log(req.body);
    console.log("hello i am in register");

    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      console.log("userExist inside")
      return res.status(400).json({msg: "Email already Exist" });
    }

    
     // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password: hashPassword
    });

    res.status(201).json({
      msg: "Registration succesfull",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });

  } catch (error) {
    res.status(400).json({ msg: "internal server error" });
  }
}


//3 Login //
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    console.log(userExist);

    if (!userExist) {
      res.status(400).json({ message: "Invalid Credential" });
    }

    const isPassword = await bcrypt.compare(password, userExist.password);

    if (isPassword) {
      res.status(200).json({
        message: "Login succesfull",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(400).json({ massage: "Email or Password is wrong" });
    }
    
  } catch (error) {
    res.status(400).json({ msg: "internal server error" });
  }
}


module.exports = { home, register, login };