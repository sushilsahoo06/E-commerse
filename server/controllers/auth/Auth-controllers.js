const bcrypt = require("bcryptjs"); //it safely store the password
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkuser = await User.findOne({ email });
    if (checkuser)
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
      message: "Registration successful",
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
    const checkuser = await User.findOne({ email });
    if (!checkuser)
      return res.json({
        success: false,
        message: "User does't exists! Please Register first ",
      });
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkuser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect Password! please try again",
      });

    const token = jwt.sign(
      {
        id: checkuser._id,
        role: checkuser.role,
        email: checkuser.email,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // ✅ correct for HTTP (localhost/dev)
      })
      .json({
        success: true,
        message: "Logged in Successfully",
        user: {
          email: checkuser.email,
          role: checkuser.role,
          id: checkuser._id,
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
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};
//auth middlewire
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY"); //decode the jwt token
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
