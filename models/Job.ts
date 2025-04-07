import mongoose, { Schema, Document, Types } from "mongoose";

export interface IJob extends Document {
  title: string;
  description: string;
  extendedDescription?: string; 
  requirements: string[];
  responsibilities?: string[]; 
  benefits?: string[]; 
  company: Types.ObjectId; 
  applicants?: Types.ObjectId[];
  supervisor?: Types.ObjectId; 
  postedDate: Date; 
  location?: string; 
  isActive: boolean;
  featured?: boolean; 
  type?: string; 
  experience?: string; 
  salary?: string; 
  deadline?: Date; 
  startDate?: string; 
  applicationCount?: number; 
}

const JobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  extendedDescription: { type: String },
  requirements: [{ type: String }],
  responsibilities: [{ type: String }], 
  benefits: [{ type: String }], 
  company: { type: Schema.Types.ObjectId, ref: "User", required: true },
  applicants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  supervisor: { type: Schema.Types.ObjectId, ref: "User" },
  location: { type: String },
  postedDate: { type: Date, default: Date.now }, 
  isActive: { type: Boolean, default: true },
  featured: { type: Boolean, default: false }, 
  type: { type: String }, 
  experience: { type: String }, 
  salary: { type: String }, 
  deadline: { type: Date }, 
  startDate: { type: String }, 
  applicationCount: { type: Number, default: 0 }, 
}, {
  timestamps: false 
});

export default mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);