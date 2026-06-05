# # MBG Transparency Portal

Portal Transparansi dan Audit Sosial Program Makan Bergizi Gratis (MBG) berbasis React JS (Frontend) dan Express.js (Backend) terintegrasi Database MySQL.

## Deskripsi

MBG Transparency Portal merupakan aplikasi monitoring distribusi Makan Bergizi Gratis yang menyediakan:

* Dashboard Monitoring (Sinkronisasi Realtime dengan MySQL Backend)
* Audit Sosial
* Pengaduan Masyarakat
* Peta Distribusi
* Role Based Access Control
* Notifikasi Realtime
* Statistik Audit Realtime

## Fitur

### Admin
* Dashboard Monitoring
* Audit Sosial
* Proses Pengaduan
* Selesaikan Audit
* Hapus Pengaduan
* Peta Distribusi

### Petugas
* Audit Sosial
* Proses Pengaduan
* Selesaikan Audit
* Peta Distribusi

### Masyarakat
* Kirim Pengaduan
* Lihat Riwayat Pengaduan
* Peta Distribusi

## Teknologi

* **Frontend:** React JS, Vite, Tailwind CSS, React Router DOM, React Icons, React Leaflet, Recharts, Axios
* **Backend & Database:** Node.js, Express.js, Sequelize ORM, MySQL

## Demo Account

### Admin
Email: admin@mbg.id  
Password: admin123

### Petugas
Email: petugas@mbg.id  
Password: petugas123

### Masyarakat
Email: masyarakat@mbg.id  
Password: masyarakat123

---

## 🛠️ Panduan Instalasi & Cara Menjalankan

Proyek ini terdiri dari dua bagian: **Frontend (React)** dan **Backend (Express)**. Ikuti langkah berikut untuk menjalankan keseluruhan sistem:

### 1. Persiapan Database MySQL
1. Pastikan **XAMPP / MySQL Server** Anda sudah aktif.
2. Buka `phpMyAdmin`, lalu buat database baru dengan nama: `mbg_db` 
3. Backend menggunakan Sequelize dengan fitur `alter: true`, sehingga tabel (`Reports` & `Distributions`) beserta data dummynya akan otomatis terbuat saat backend dinyalakan.

### 2. Menjalankan Backend Server
Buka terminal baru di VS Code, masuk ke folder backend, install modul, lalu jalankan servernya:
```bash
cd mbg-backend
npm install
npm run dev