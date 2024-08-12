import { Model, model, models, Document, Schema, Types } from 'mongoose';

interface Accounts {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  scope: string;
  tokenType: string;
  providerAccountId: string;
  provider: string;
}


interface UserDocument extends Document {
  name: string;
  email: string;
  emailVerified?: Date;
  password?: string;
  role?: string;
  image?: string;
  authProviderId?: string;
  accounts?: Accounts[];
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
    accounts: [{
      accessToken: { type: String },
      refreshToken: { type: String },
      expiresAt: { type: Number },
      scope: { type: String },
      tokenType: { type: String },
      providerAccountId: { type: String },
      provider: { type: String },
    }],
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
