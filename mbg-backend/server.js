const express = require('express');
const cors = require('cors');
const db = require('./config/database.js');
const reportRoutes = require('./routes/reportRoutes.js');
const distributionRoutes = require('./routes/distributionRoutes.js'); 

const app = express(); 

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', reportRoutes);
app.use('/api', distributionRoutes); 

// Import model untuk keperluan seeding
const Report = require('./models/Report.js');
const Distribution = require('./models/Distribution.js');

// =========================================================================
// 1. PINDAHKAN FUNGSI SEEDDATABASE KE SINI (DI ATAS DB.SYNC)
// =========================================================================
const seedDatabase = async () => {
    try {
        const countDist = await Distribution.count();
        if (countDist === 0) {
            await Distribution.bulkCreate([
                { schoolName: 'SDN 1 Mergosono Malang', totalPortions: 350, menuVaried: 'Nasi Goreng Ayam + Telur + Susu', status: 'Diterima', deliveryDate: '2026-06-02' },
                { schoolName: 'SMPN 4 Malang', totalPortions: 520, menuVaried: 'Nasi Putih + Ayam Fillet + Sayur Sop', status: 'Diterima', deliveryDate: '2026-06-02' },
                { schoolName: 'SDN 3 Lowokwaru', totalPortions: 280, menuVaried: 'Nasi Putih + Semur Daging + Pisang', status: 'Pengiriman', deliveryDate: '2026-06-02' },
                { schoolName: 'SMKN 1 Malang', totalPortions: 740, menuVaried: 'Nasi Kuning + Ayam Goreng + Susu UHT', status: 'Persiapan', deliveryDate: '2026-06-02' }
            ]);
            console.log('🌱 Data dummy Distribusi Makanan berhasil ditambahkan!');
        }

        const countReport = await Report.count();
        if (countReport === 0) {
            await Report.bulkCreate([
                { schoolName: 'SDN 1 Mergosono Malang', issueType: 'Keterlambatan', description: 'Makanan baru sampai jam 12.30 siang, anak-anak sudah terlalu lapar.', status: 'Diproses' },
                { schoolName: 'SMPN 4 Malang', issueType: 'Jumlah Kurang', description: 'Porsi kurang 15 kotak dari total siswa yang hadir hari ini.', status: 'Selesai' },
                { schoolName: 'SDN 3 Lowokwaru', issueType: 'Kualitas Makanan', description: 'Susu kotak ada yang kemasannya kembung/rusak.', status: 'Pending' }
            ]);
            console.log('🌱 Data dummy Laporan Masyarakat berhasil ditambahkan!');
        }
    } catch (error) {
        console.error('Gagal melakukan seeding database:', error);
    }
};

// =========================================================================
// 2. PROSES SINKRONISASI DATABASE DAN JALANKAN SERVER
// =========================================================================
db.sync({ alter: true })
    .then(async () => {
        console.log('Database terhubung dan disinkronisasi.');
        
        // Sekarang ini aman dipanggil karena fungsinya sudah didefinisikan di atas
        await seedDatabase(); 
        
        const PORT = 5000;
        app.listen(PORT, () => console.log(`🚀 SERVER RESMI BERJALAN DI PORT ${PORT}`));
    })
    .catch(err => console.log('Gagal konek database:', err));