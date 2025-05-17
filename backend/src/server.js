// Mengimpor dotenv untuk memuat variabel lingkungan dari file .env
require('dotenv').config();

// Mengimpor Hapi.js
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt'); // <-- BARIS BARU: Diperlukan untuk @hapi/jwt sebagai plugin

// Mengimpor semua rute aplikasi dari file routes.js utama
const allRoutes = require('./routes');

// Mengimpor plugin strategi autentikasi JWT kita
const jwtAuthStrategyPlugin = require('./middlewares/authStrategy'); // <-- BARIS BARU

// Fungsi utama untuk menginisialisasi dan menjalankan server
const init = async () => {
  // Membuat instance server Hapi baru
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*'], // Izinkan semua origin untuk CORS (sesuaikan untuk produksi)
      },
    },
  });

  // Mendaftarkan plugin @hapi/jwt yang diperlukan untuk strategi autentikasi
  await server.register(Jwt); // <-- BARIS BARU: Daftarkan plugin @hapi/jwt

  // Mendaftarkan plugin strategi autentikasi JWT kita
  await server.register(jwtAuthStrategyPlugin); // <-- BARIS BARU

  // Mendaftarkan semua rute yang telah diimpor ke server
  server.route(allRoutes);
  // console.log('Rute yang akan didaftarkan:', JSON.stringify(allRoutes, null, 2)); // Untuk debugging jika diperlukan

  // Memulai server
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

// Menangani unhandled rejection untuk mencegah server crash
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});

// Menangani uncaught exception untuk mencegah server crash
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

// Memanggil fungsi init untuk memulai server
init();

