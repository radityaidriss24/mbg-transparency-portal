const { DataTypes } = require('sequelize');
const db = require('../config/database.js');

const Report = db.define('Report', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    schoolName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    issueType: {
         type: DataTypes.ENUM('Makanan Tidak Layak', 'Keterlambatan Distribusi', 'Dapur Fiktif'),
         allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Diproses', 'Selesai'),
        defaultValue: 'Pending'
    }
}, {
    timestamps: true
});

module.exports = Report;