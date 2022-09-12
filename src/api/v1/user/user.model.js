const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseDelete = require('mongoose-delete');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxLength: 25,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		phone: {
			type: String,
			trim: true,
			required: true,
			maxLength: 10,
		},
		password: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			default: 'active',
		},
		verified_date: {
			type: Date,
			default: null,
		},
		deleted_at: {
			type: Date,
			default: null,
		},
		created_by: {
			type: mongoose.Types.ObjectId,
			ref: 'user',
		},
		update_by: {
			type: mongoose.Types.ObjectId,
			ref: 'user',
		},
	},
	{
		timestamps: true,
	}
);

userSchema.plugin(mongoosePaginate);
userSchema.plugin(mongooseDelete);

const User = mongoose.model('User', userSchema);

module.exports = User;
