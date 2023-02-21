const User = require("../model/userModel");
const generateOtp = require("../utils/otpGenerator")
const generateToken =  require("../utils/jsonToken")

const register = async (req, res) => {
  try {
    const { firstname, lastname, phone, location } = req.body;

    let user = await User.findOne({ phone });

    if (user) {
      return res.send("user alredy exist")
    }
    //@ Generating OTP
    let otp = generateOtp(4, true, false, false, false);

    // generate token
    let token = generateToken()
    //* Creating new User
    user = await User.create({
      firstname, lastname, phone, location ,
      otp,
      otp_expiry: new Date(Date.now() + 3 * 60 * 1000),
      token
    });


    return res.send(user) 
    
  } catch (error) {
    // res_catch(res, error);
    console.log(error)
    res.send(error)
  }
};

//? Resend OTP
// export const resendOtp = async (req, res) => {
//   try {
//     const user = await Employee.findById(req.emp._id);
//     //@ Generating OTP
//     let otp = generateOtp(6, true, false, false, false);

//     user.otp = otp;
//     user.otp_expiry = new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000);
//     await user.save();

//     // const email = user.email;
//     let subject = ["Verify your email address", "Email Verification code"];
//     await sendMail(otp, subject, user);

//     const token = user.generateToken();
//     res_user(
//       res,
//       `OTP sent to : ${email}, please verify your email first`,
//       token,
//       null
//     );
//   } catch (error) {
//     res_catch(res, error);
//   }
// };

// //? Verify Employee
// export const verify = async (req, res) => {
//   try {
//     const otp = req.body.otp;
//     const user = await User.findById(req.emp._id);

//     if (user.otp !== otp || user.otp_expiry < Date.now()) {
//       return res_failed(res, "Invalid OTP or has been Expired");
//     }
//     //@ Generating Reffrence_id
//     let ref = generateOtp(7, true, true, false, false);

//     user.email_verified = true;
//     user.reff_id = `INK23${ref}`;
//     user.otp = null;
//     user.otp_expiry = null;
//     await user.save();

//     //^ if Directly want to make user login after Verification
//     const token = user.generateToken();
//     res_user(
//       res,
//       `Welcome ${user.full_name}, Logged in successfully`,
//       token,
//       user
//     );
//   } catch (error) {
//     res_catch(res, error);
//   }
// };

// //? EMPLOYEE LOGIN
// export const Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res_failed(res, "Please enter all fields");
//     }

//     // * Checking if user has registered or not
//     let user = await Employee.findOne({ email }).select("+password");
//     if (!user) {
//       return res_failed(res, "Invalid Email or Password");
//     }

//     //* Checking Entered password is correct or not
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res_failed(res, "Invalid Email or Password");
//     }

//     //* Checking if user has verified or not
//     const isVerified = await Employee.findOne({ email });
//     // console.log(isVerified.email_verified);
//     if (!isVerified.email_verified) {
//       return res_failed(
//         res,
//         "Your Email has not been verified, first verify your email id"
//       );
//     }

//     const token = user.generateToken();
//     res_user(
//       res,
//       `Welcome ${user.full_name}, Logged in successfully`,
//       token,
//       user
//     );
//   } catch (error) {
//     res_catch(res, error);
//   }
// };

// //? Employee Logout
// export const Logout = async (req, res) => {
//   try {
//     return res
//       .status(200)
//       .cookie("token", null, { expires: new Date(Date.now()) })
//       .json({ success: true, message: "Logout Successfully" });
//   } catch (error) {
//     res_catch(res, error);
//   }
// };

module.exports = register