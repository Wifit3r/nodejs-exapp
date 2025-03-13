const express = require('express');
const nPapers = require('../models/nPapers.model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const papers = await nPapers.find();
        res.json(papers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', getPaper, (req, res) => {
    res.json(res.paper);
});


router.post('/', async (req, res) => {
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
});


router.patch('/:id', getPaper, async (req, res) => {
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
});


router.delete('/:id', getPaper, async (req, res) => {
    try {
        await res.paper.remove();
        res.json({ message: 'Deleted Paper' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getPaper(req, res, next) {
    let paper;
    try {
        paper = await nPapers.findById(req.params.id);
        if (paper == null) {
            return res.status(404).json({ message: 'Cannot find paper' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.paper = paper;
    next();
}

module.exports = router;