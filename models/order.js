const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    _id: Schema.Types.ObjectId,
    paymentMethod: {
        type: String,
        required: true,
    },
    orderLines: [{
        type: Schema.Types.ObjectId,
        ref: 'OrderLine',
        required: true
    }]
});

module.exports = mongoose.model('Order', orderSchema)