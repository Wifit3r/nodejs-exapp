const { Schema, model } = require('mongoose');

const nPapersSchema = new Schema({
    thema:{
        type: String,
        required: true,
        trim: true,
    },
    content:{
        type: String,
        required: true,
        trim: true,
    },
    date:{
        type: Date,
        required: true,
    },
    namesOfAddresants:{
        type: [String],
        required: true,
        default: [],
    },
    addresesOfAddresants:{
        type: [String],
        required: true,
        default: [],
    },},
{
    timestamp:true,
});

module.exports = model('nPapers', nPapersSchema);