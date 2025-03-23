const express = require('express');
const router = express.Router();
const nPapers = require('../models/nPapers.model'); // Імпорт вашої моделі
const { control } = require('leaflet');

// Роутер для отримання всіх елементів списку
router.route('/')
    .get(control.getAllPapers);