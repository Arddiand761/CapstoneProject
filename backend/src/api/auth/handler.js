// Mengimpor helper untuk password dan JWT
const { hashPassword, comparePassword } = require('../../lib/passwordHelpers');
const { generateToken } = require('../../lib/jwtHelpers');

// Mengimpor nanoid untuk menghasilkan ID unik (versi 3.x.x karena commonJS)
const { nanoid } = require('nanoid');

// Penyimpanan pengguna sementara di memori (akan diganti dengan database)
const users = []; // Ini adalah array untuk menyimpan objek pengguna

/**
 * Handler untuk registrasi pengguna baru.
 * @param {import('@hapi/hapi').Request} request - Objek request Hapi.
 * @param {import('@hapi/hapi').ResponseToolkit} h - Objek response toolkit Hapi.
 * @returns {import('@hapi/hapi').ResponseObject} Respons Hapi.
 */
const registerUserHandler = async (request, h) => {
  try {
    const { username, email, password } = request.payload;

    // 1. Cek apakah email sudah terdaftar (simulasi)
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return h.response({
        status: 'fail',
        message: 'Email sudah terdaftar. Silakan gunakan email lain.',
      }).code(400); // 400 Bad Request
    }

    // 2. Hash password sebelum disimpan
    const hashedPassword = await hashPassword(password);

    // 3. Buat ID unik untuk pengguna baru
    const id = nanoid(16); // Menghasilkan ID dengan panjang 16 karakter

    // 4. Buat objek pengguna baru
    const newUser = {
      id,
      username,
      email,
      password: hashedPassword, // Simpan password yang sudah di-hash
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 5. Simpan pengguna baru ke array (simulasi database)
    users.push(newUser);
    console.log('Pengguna baru terdaftar:', newUser.email); // Untuk debugging
    console.log('Semua pengguna saat ini (setelah register):', users.map(u => u.email)); // Untuk debugging

    // 6. Kirim respons sukses
    return h.response({
      status: 'success',
      message: 'Pengguna berhasil diregistrasi!',
      data: {
        userId: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    }).code(201); // 201 Created
  } catch (error) {
    console.error('Error saat registrasi:', error);
    return h.response({
      status: 'error',
      message: 'Terjadi kesalahan internal pada server saat mencoba registrasi.',
      details: error.message,
    }).code(500); // 500 Internal Server Error
  }
};

/**
 * Handler untuk login pengguna.
 * @param {import('@hapi/hapi').Request} request - Objek request Hapi.
 * @param {import('@hapi/hapi').ResponseToolkit} h - Objek response toolkit Hapi.
 * @returns {import('@hapi/hapi').ResponseObject} Respons Hapi.
 */
const loginUserHandler = async (request, h) => {
  try {
    const { email, password } = request.payload;

    // 1. Cari pengguna berdasarkan email (simulasi)
    const user = users.find((u) => u.email === email);
    console.log('Mencoba login dengan email:', email); // Untuk debugging
    console.log('Pengguna ditemukan (jika ada saat login):', user ? user.email : undefined); // Untuk debugging
    console.log('Semua pengguna saat ini (saat login):', users.map(u => u.email)); // Untuk debugging


    if (!user) {
      return h.response({
        status: 'fail',
        message: 'Login gagal. Email tidak ditemukan.',
      }).code(401); // 401 Unauthorized
    }

    // 2. Bandingkan password yang dimasukkan dengan hash password yang tersimpan
    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      return h.response({
        status: 'fail',
        message: 'Login gagal. Password salah.',
      }).code(401); // 401 Unauthorized
    }

    // 3. Jika password cocok, buat JWT
    const tokenPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const token = generateToken(tokenPayload);

    // 4. Kirim respons sukses beserta token
    return h.response({
      status: 'success',
      message: 'Login berhasil!',
      data: {
        token,
      },
    }).code(200); // 200 OK
  } catch (error) {
    console.error('Error saat login:', error);
    if (error.message.includes('Konfigurasi server tidak lengkap')) {
        return h.response({
            status: 'error',
            message: 'Terjadi kesalahan konfigurasi pada server.',
            details: error.message,
        }).code(500);
    }
    return h.response({
      status: 'error',
      message: 'Terjadi kesalahan internal pada server saat mencoba login.',
      details: error.message,
    }).code(500); // 500 Internal Server Error
  }
};

// Mengekspor handler DAN array users agar bisa digunakan di modul lain
module.exports = {
  registerUserHandler,
  loginUserHandler,
  users, // <-- PERUBAHAN PENTING: Ekspor array users
};
