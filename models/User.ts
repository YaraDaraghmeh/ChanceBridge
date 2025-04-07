import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  googlePhotoUrl: string;
  role: string;
  phone?: string;
  location?: string;
  gender?: string;
  university?: string;
  specialization?: string;
  createdAt: Date;

  // Role-based fields
  jobs?: Types.ObjectId[]; // For company
  trainees?: Types.ObjectId[]; // For company or supervisor
  supervisors?: Types.ObjectId[]; // For company
  appliedJobs?: Types.ObjectId[]; // For trainee
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googlePhotoUrl: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  },
  role: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  gender: { type: String },
  university: { type: String },
  specialization: { type: String },
  createdAt: { type: Date, default: Date.now },

  // Role-based relations
  jobs: [{ type: Schema.Types.ObjectId, ref: "Job" }], // if company
  trainees: [{ type: Schema.Types.ObjectId, ref: "User" }], // if company or supervisor
  supervisors: [{ type: Schema.Types.ObjectId, ref: "User" }], // if company
  appliedJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }], // if trainee
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
