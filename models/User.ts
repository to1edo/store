import mongoose, {Schema, Model} from "mongoose";
import { IUser } from "@/intefaces";

const UserSchema:Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    enum:{
      values:['admin','client'],
      message:'role isn´t valid',
    },
    default: 'client',
    required:true
  }
}, {
  timestamps: true
});

export const UserModel: Model<IUser> = mongoose.models.User || mongoose.model("User", UserSchema);
