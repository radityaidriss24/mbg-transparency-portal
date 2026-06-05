const express = require('express');
const router = express.Router();
const Report = require('../models/Report.js');

// Endpoint untuk MENERIMA laporan baru dari frontend dan menyimpannya ke MySQL
router.post('/reports', async (req, res) => {
    try {
        const { schoolName, issueType, description } = req.body;
        
        // Simpan ke database MySQL menggunakan Sequelize
        const newReport = await Report.create({
            schoolName,
            issueType,
            description,
            status: 'Diproses' // Status default saat laporan baru masuk
        });

        res.status(201).json({ success: true, message: 'Laporan berhasil dikirim!', data: newReport });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;