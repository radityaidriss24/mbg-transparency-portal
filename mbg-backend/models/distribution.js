    const { DataTypes } = require('sequelize');
const db = require('../config/database.js');

const Distribution = db.define('Distribution', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    schoolName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalPortions: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    menuVaried: {
        type: DataTypes.STRING,
        allowNull: false // Misal: "Nasi Ayam Capcay + Susu"
    },
    status: {
        type: DataTypes.ENUM('Persiapan', 'Pengiriman', 'Diterima'),
        defaultValue: 'Persiapan'
    },
    deliveryDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Distribution;