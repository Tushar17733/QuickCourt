import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  avatar: { type: String }, // Cloudinary URL
  role: {
    type: String,
    enum: ["user", "facilityOwner"],
    default: "user"
  },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
