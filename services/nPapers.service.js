const nPapers = require('../models/nPapers.model');

// Пошук статті за ID
exports.findPaperById = async (id) => {
    return await nPapers.findById(id);
};

// Пошук всіх статей
exports.findAllPapers = async () => {
    return await nPapers.find();
};

// Створення нової статті
exports.createPaper = async (data) => {
    const paper = new nPapers({
        title: data.title,
        content: data.content
    });
    return await paper.save();
};

// Оновлення статті
exports.updatePaper = async (paper, data) => {
    if (data.title != null) {
        paper.title = data.title;
    }
    if (data.content != null) {
        paper.content = data.content;
    }
    return await paper.save();
};

// Видалення статті
exports.deletePaper = async (paper) => {
    return await paper.deleteOne();
};
