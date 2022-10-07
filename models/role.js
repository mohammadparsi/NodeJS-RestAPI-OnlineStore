const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    _id: Number,
    name: {
        type: String,
        required: true
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Role', roleSchema)