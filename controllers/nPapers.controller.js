const express = require('express');
const nPapers = require('../models/nPapers.model');


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

async function getAllPapers(req, res) {
    try {
        const papers = await nPapers.find(); // Отримання всіх елементів масиву
        if (!papers.length) {
            return res.status(404).json({ message: 'No papers found' });
        }
        res.json({
            message: 'Papers retrieved successfully',
            data: papers
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = router;