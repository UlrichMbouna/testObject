import * as mongoose from 'mongoose';

export const ObjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export interface Object {
  title: string;
  description: string;
  imageUrl?: string;
  createdAt: Date;
}
