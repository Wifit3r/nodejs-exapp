const mongoose = require('mongoose'); // Імпортуємо mongoose
const { Schema, model } = mongoose; // Деструктуруємо Schema та model з mongoose

// Схема для nPapers
const nPapersSchema = new Schema({
    thema: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    namesOfAddresants: {
        type: [String],
        required: true,
        default: []
    },
    addresesOfAddresants: {
        type: [String],
        required: true,
        default: []
    }
}, {
    timestamps: true // Увімкнено автоматичне додавання полів createdAt і updatedAt
});

// Експортуємо модель
module.exports = model('nPapers', nPapersSchema);
