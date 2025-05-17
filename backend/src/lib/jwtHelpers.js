// Mengimpor @hapi/jwt untuk manajemen token
const Jwt = require('@hapi/jwt');

// Mengambil kunci rahasia dan masa berlaku token dari variabel lingkungan
// Pastikan variabel ini sudah diatur di file .env Anda
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'; // Default 1 jam jika tidak diatur

/**
 * Membuat (generate) JSON Web Token (JWT).
 * @param {object} payload - Data yang akan disimpan dalam token (misalnya, userId, username).
 * @returns {string} Token JWT yang dihasilkan.
 * @throws {Error} Jika JWT_SECRET_KEY tidak diatur.
 */
const generateToken = (payload) => {
  if (!JWT_SECRET_KEY) {
    console.error('Kesalahan: JWT_SECRET_KEY tidak diatur di variabel lingkungan.');
    throw new Error('Konfigurasi server tidak lengkap, token tidak dapat dibuat.');
  }
  // Membuat token dengan payload, kunci rahasia, dan opsi masa berlaku
  const token = Jwt.token.generate(
    payload,
    {
      key: JWT_SECRET_KEY,
      algorithm: 'HS256', // Algoritma enkripsi yang umum digunakan
    },
    {
      ttlSec: parseExpiry(JWT_EXPIRES_IN), // Masa berlaku token dalam detik
    },
  );
  return token;
};

/**
 * Memverifikasi JSON Web Token (JWT).
 * @param {string} token - Token JWT yang akan diverifikasi.
 * @returns {object | null} Objek yang berisi data payload jika token valid, atau null jika tidak valid.
 * @throws {Error} Jika JWT_SECRET_KEY tidak diatur.
 */
const verifyToken = (token) => {
  if (!JWT_SECRET_KEY) {
    console.error('Kesalahan: JWT_SECRET_KEY tidak diatur di variabel lingkungan.');
    throw new Error('Konfigurasi server tidak lengkap, token tidak dapat diverifikasi.');
  }
  try {
    // Memverifikasi token dan mendekode payload-nya
    const decoded = Jwt.token.decode(token, {
      key: JWT_SECRET_KEY,
      algorithms: ['HS256'],
    });
    return decoded.decoded.payload; // Mengembalikan payload dari token yang terdekode
  } catch (error) {
    // Menangani error jika token tidak valid (misalnya, kedaluwarsa atau signature salah)
    console.error('Gagal memverifikasi token:', error.message);
    return null;
  }
};

/**
 * Helper function untuk mengonversi string masa berlaku (seperti '1h', '7d') ke detik.
 * @param {string} expiresIn - String masa berlaku (contoh: '1h', '30m', '7d').
 * @returns {number} Masa berlaku dalam detik.
 */
const parseExpiry = (expiresIn) => {
  if (typeof expiresIn === 'number') {
    return expiresIn; // Jika sudah dalam detik
  }
  if (typeof expiresIn === 'string') {
    const unit = expiresIn.slice(-1);
    const value = parseInt(expiresIn.slice(0, -1), 10);

    if (isNaN(value)) {
      return 3600; // Default 1 jam jika format salah
    }

    switch (unit) {
      case 's': return value; // detik
      case 'm': return value * 60; // menit
      case 'h': return value * 60 * 60; // jam
      case 'd': return value * 24 * 60 * 60; // hari
      default: return 3600; // Default 1 jam
    }
  }
  return 3600; // Default 1 jam jika tipe tidak dikenali
};


// Mengekspor fungsi agar bisa digunakan di modul lain
module.exports = {
  generateToken,
  verifyToken,
};
