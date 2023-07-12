import mongoose, {Schema, Model, CallbackError} from "mongoose";
import { IUser } from "@/intefaces";
import bcrypt from 'bcryptjs';

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

UserSchema.pre('save', async function(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    
    const hashedPassword = bcrypt.hashSync(user.password);
    user.password = hashedPassword;
    next();

  } catch (error) {
    return next(error as CallbackError);
  }
});

export const UserModel: Model<IUser> = mongoose.models.User || mongoose.model("User", UserSchema);
