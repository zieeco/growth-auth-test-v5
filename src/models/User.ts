import { Model, model, models, Document, Schema, Types } from 'mongoose';
interface UserDocument extends Document {
  name: string;
  email: string;
  emailVerified?: Date;
  password?: string;
  role?: string;
  image?: string;
  authProviderId?: string;
  accounts?: Types.ObjectId[];
  sessions?: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<UserDocument> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Date, default: null },
    password: { type: String, select: false },
    role: { type: String, default: 'user' },
    image: { type: String },
    authProviderId: { type: String },
    accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
    sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

const User: Model<UserDocument> =
  models.User || model<UserDocument>('User', userSchema);

export default User;
