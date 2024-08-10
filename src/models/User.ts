import { Model, model, models, Document, Schema } from 'mongoose';
interface UserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  role: string;
  image?: string;
  authProviderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<UserDocument> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    role: { type: String, default: 'user' },
    image: { type: String },
    authProviderId: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

const User: Model<UserDocument> =
  models.User || model<UserDocument>('User', userSchema);

export default User;
