import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: Number, default: ""},
    password: {type: String, required: true},
    address: {type: String, default: ""},
    pincode: {type: Number, default: ""}
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model('User', UserSchema);
// export default mongoose.model.User || mongoose.model("User", UserSchema)