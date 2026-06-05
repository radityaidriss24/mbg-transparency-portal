const express = require('express');
const router = express.Router();
const Distribution = require('../models/Distribution.js');

// Endpoint untuk mengambil semua data distribusi makanan
router.get('/distributions', async (req, res) => {
    try {
        const data = await Distribution.findAll({ order: [['createdAt', 'DESC']] });
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;