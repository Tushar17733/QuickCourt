import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js"
import { transporter } from "../utils/nodemailer.js"

let pendingUsers = {};

export const signup = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;


    // Check if email already exists in DB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let avatarUrl = "";
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      avatarUrl = cloudResponse.secure_url;
    }
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 min

    // Store user temporarily
    pendingUsers[email] = {
      fullName,
      email,
      password: hashedPassword,
      role,
      avatar: avatarUrl,
      otp,
      otpExpires
    };

    await transporter.sendMail({
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <h2>Email Verification</h2>
        <p>Hello ${fullName},</p>
        <p>Your OTP code is: <b>${otp}</b></p>
        <p>This code will expire in 10 minutes.</p>
      `
    });

    res.status(200).json({
      message: "OTP sent to your email. Please verify to complete registration."
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find pending user
    const pendingUser = pendingUsers[email];
    if (!pendingUser) {
      return res.status(404).json({ message: "No signup request found for this email" });
    }

    // Verify OTP
    if (pendingUser.otp !== otp || Date.now() > pendingUser.otpExpires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Save verified user to DB
    const user = await User.create({
      fullName: pendingUser.fullName,
      email: pendingUser.email,
      password: pendingUser.password,
      role: pendingUser.role,
      avatar: pendingUser.avatar,
      isVerified: true
    });

    // Remove from pending store
    delete pendingUsers[email];

    res.status(201).json({ message: "Account verified successfully. You can now log in." });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Check verification
    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your account first" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, {
      expiresIn: "7d"
    });

    // Return user data along with token
    res.json({ 
      message: "Login successful", 
      token,
      user: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const { fullName, email, oldPassword, newPassword } = req.body;

    // Update full name & email if provided
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;

    // Password change logic
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    // Avatar update logic
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      user.avatar = cloudResponse.secure_url;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};
