import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    email: {type: String, required: true},
    orderId: {type: String, required: true, unique: true},
    products: {type: Object, required: true},
    address: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, default: 'Initiated', required: true}
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model('Order', OrderSchema);
// export default mongoose.model.Order || mongoose.model("Order", OrderSchema)