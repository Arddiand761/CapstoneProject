// Mengimpor dotenv untuk memuat variabel lingkungan dari file .env
require('dotenv').config();

// Mengimpor Hapi.js
const Hapi = require('@hapi/hapi');

// Mengimpor semua rute aplikasi dari file routes.js utama
const allRoutes = require('./routes'); // <-- BARIS BARU: Impor allRoutes

// Fungsi utama untuk menginisialisasi dan menjalankan server
const init = async () => {
  // Membuat instance server Hapi baru
  const server = Hapi.server({
    // Mengambil port dari variabel lingkungan, atau default ke 5000 jika tidak ada
    port: process.env.PORT || 5000,
    // Mengambil host dari variabel lingkungan, atau default ke 'localhost'
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*'], // Izinkan semua origin untuk CORS (sesuaikan untuk produksi)
      },
    },
  });

  // Mendaftarkan semua rute yang telah diimpor ke server
  server.route(allRoutes); // <-- BARIS BARU: Daftarkan allRoutes

  // Menghapus rute sederhana awal karena sekarang kita punya rute dari allRoutes
  // server.route({
  //   method: 'GET',
  //   path: '/',
  //   handler: (request, h) => {
  //     return 'Halo! Server backend Capstone Project Anda berjalan!';
  //   },
  // });

  // Memulai server
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`); // Menampilkan URI server di konsol
};

// Menangani unhandled rejection untuk mencegah server crash
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1); // Keluar dari proses dengan kode error
});

// Menangani uncaught exception untuk mencegah server crash
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1); // Keluar dari proses dengan kode error
});

// Memanggil fungsi init untuk memulai server
init();
