import { Model, model, Schema, Document, models } from 'mongoose';

export interface IUser extends Document {
	firsName: string;
	lastName: string;
	email: string;
	password: string;
	role: string;
	image: string;
	authProviderId: string;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
	firsName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, select: false},
	role: {type: String, default: 'user'},
	image: {
		type: String,
		default:
			'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
	},
	authProviderId: {type: String},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
});

export const User: Model<IUser> =
	models?.User || model<IUser>('User', UserSchema);
