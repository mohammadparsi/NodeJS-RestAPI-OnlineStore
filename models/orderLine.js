const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderLineSchema = new Schema({
    order:{
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    product:{
        type: Schema.Types.ObjectId,
        ref:'Product',
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    amount:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('OrderLine', orderLineSchema)