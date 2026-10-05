import { Schema, model, type Types } from 'mongoose';

export interface Project {
  name: string;
  path: string;
  owner: Types.ObjectId;
}

const projectSchema = new Schema<Project>(
  {
    name: { type: String, required: true, trim: true },
    path: { type: String, required: true, trim: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  },
  { timestamps: true },
);

export const ProjectModel = model<Project>('Project', projectSchema);
