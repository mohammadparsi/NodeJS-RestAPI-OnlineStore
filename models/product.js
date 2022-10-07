const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    orderLines:[{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'OrderLine'
    }],
    category: {
        type: Schema.Types.Number,
        required: true,
        ref: 'Category'
    }
});

module.exports = mongoose.model('Product', productSchema);