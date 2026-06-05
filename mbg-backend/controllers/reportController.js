const Report = require('../models/Report.js');

// 1. Kirim Laporan Baru (Masyarakat)
exports.createReport = async (req, res) => {
    try {
        const { schoolName, issueType, description } = req.body;
        // Jika ada file upload, ambil path-nya
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const newReport = await Report.create({
            schoolName,
            issueType,
            description,
            imageUrl
        });

        res.status(201).json({ success: true, message: "Laporan berhasil dikirim!", data: newReport });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Ambil Semua Laporan (Untuk Tampilan Transparansi di Portal)
exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.findAll({ order: [['createdAt', 'DESC']] });
        res.status(200).json({ success: true, data: reports });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};