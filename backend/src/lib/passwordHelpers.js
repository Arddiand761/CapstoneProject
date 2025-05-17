// Mengimpor bcrypt untuk hashing password
const bcrypt = require('bcrypt');

/**
 * Melakukan hash pada password menggunakan bcrypt.
 * @param {string} password - Password teks biasa yang akan di-hash.
 * @returns {Promise<string>} Hash password.
 */
const hashPassword = async (password) => {
  // Jumlah salt rounds untuk hashing, semakin tinggi semakin aman tapi lambat
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

/**
 * Membandingkan password teks biasa dengan hash password.
 * @param {string} password - Password teks biasa yang dimasukkan pengguna.
 * @param {string} hashedPassword - Hash password yang tersimpan di database (atau penyimpanan lain).
 * @returns {Promise<boolean>} True jika password cocok, false jika tidak.
 */
const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

// Mengekspor fungsi agar bisa digunakan di modul lain
module.exports = {
  hashPassword,
  comparePassword,
};
