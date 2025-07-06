const bcrypt = require("bcryptjs"); //it safely store the password
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const cheskUser = await User.findOne({ email });
    if (cheskUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email ! Please try again ?",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registation succesfull",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const cheskUser = await User.findOne({ email });
    if (!cheskUser)
      return res.json({
        success: false,
        message: "User does't exists! Please Register first ",
      });
    const checkPasswordMatch = await bcrypt.compare(
      password,
      cheskUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect Password! please try again",
      });

    const token = jwt.sign(
      {
        id: cheskUser._id,
        role: cheskUser.role,
        email: cheskUser.email,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Loggidin in Successfully",
      user: {
        email: cheskUser.email,
        role: cheskUser.role,
        id: cheskUser._id,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

//logout

//auth middlewire

module.exports = { registerUser ,loginUser };
