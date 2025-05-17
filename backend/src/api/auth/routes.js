// Mengimpor handler dan skema validasi untuk autentikasi
const { registerUserHandler, loginUserHandler } = require('./handler');
const { registerUserPayloadSchema, loginUserPayloadSchema } = require('./validation');

// Mendefinisikan rute-rute untuk fitur autentikasi
const authRoutes = [
  {
    method: 'POST',
    path: '/auth/register', // Endpoint untuk registrasi pengguna
    handler: registerUserHandler, // Menggunakan handler registrasi
    options: {
      // Konfigurasi validasi untuk payload permintaan
      validate: {
        payload: registerUserPayloadSchema, // Menggunakan skema validasi registrasi
        failAction: (request, h, err) => {
          // Kustomisasi respons jika validasi gagal
          // Ini akan mengirimkan detail error validasi ke klien
          throw err; // Melempar error agar Hapi menanganinya (biasanya respons 400)
        },
      },
      description: 'Registrasi pengguna baru',
      tags: ['api', 'auth'], // Tag untuk dokumentasi API (jika menggunakan Swagger/OpenAPI)
      notes: 'Membuat akun pengguna baru dengan username, email, dan password.',
    },
  },
  {
    method: 'POST',
    path: '/auth/login', // Endpoint untuk login pengguna
    handler: loginUserHandler, // Menggunakan handler login
    options: {
      // Konfigurasi validasi untuk payload permintaan
      validate: {
        payload: loginUserPayloadSchema, // Menggunakan skema validasi login
        failAction: (request, h, err) => {
          throw err;
        },
      },
      description: 'Login pengguna',
      tags: ['api', 'auth'],
      notes: 'Mengautentikasi pengguna dan mengembalikan JWT jika berhasil.',
    },
  },
];

// Mengekspor array rute agar bisa didaftarkan ke server Hapi
module.exports = authRoutes;
