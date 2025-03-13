const nPapers = require('../models/nPapers.model');

// Middleware для отримання статті за ID
async function getPaperById(req, res, next) {
    try {
        const paper = await nPapers.findById(req.params.id);
        if (!paper) {
            return res.status(404).json({ message: 'Cannot find paper' });
        }
        res.paper = paper;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Отримання всіх статей
exports.getAllPapers = async (req, res) => {
    try {
        const papers = await nPapers.find();
        res.json(papers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Отримання однієї статті
exports.getPaper = (req, res) => {
    res.json(res.paper);
};

// Створення нової статті
exports.createPaper = async (req, res) => {
    const paper = new nPapers({
        title: req.body.title,
        content: req.body.content
    });
    
    try {
        const newPaper = await paper.save();
        res.status(201).json(newPaper);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Оновлення статті
exports.updatePaper = async (req, res) => {
    if (req.body.title != null) {
        res.paper.title = req.body.title;
    }
    if (req.body.content != null) {
        res.paper.content = req.body.content;
    }

    try {
        const updatedPaper = await res.paper.save();
        res.json(updatedPaper);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Видалення статті
exports.deletePaper = async (req, res) => {
    try {
        await res.paper.deleteOne();
        res.json({ message: 'Deleted Paper' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getPaperById, ...exports };
