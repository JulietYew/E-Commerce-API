import { model, Schema } from "mongoose";
import {IUser} from "../interfaces/user.interface";

const userSchema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      minlength: 11,
      maxlength: 14,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: "Order",
    },
    address: {
      type: String,
      required: false
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);
export default User;