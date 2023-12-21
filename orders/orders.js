
const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
     
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
   
     adress: {  
        type: String,
        default:''
     },
     
    
});

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});

exports.Order = mongoose.model('Order', orderSchema);
exports.orderSchema = orderSchema;

        