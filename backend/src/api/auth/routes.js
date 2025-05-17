// Mengimpor handler dan skema validasi untuk autentikasi
const { registerUserHandler, loginUserHandler } = require('./handler');
const { registerUserPayloadSchema, loginUserPayloadSchema } = require('./validation');

// Handler untuk rute /auth/me (mengembalikan info pengguna dari token)
const getMyProfileHandler = (request, h) => {
  // request.auth.credentials akan berisi payload yang kita set di fungsi validateArtifacts
  // dari strategi JWT (misalnya, { id, username, email })
  const userCredentials = request.auth.credentials;

  if (!userCredentials || !userCredentials.id) {
    // Seharusnya tidak terjadi jika strategi auth bekerja dengan benar
    return h.response({
      status: 'fail',
      message: 'Kredensial pengguna tidak ditemukan setelah autentikasi.',
    }).code(500);
  }

  return h.response({
    status: 'success',
    message: 'Data profil berhasil diambil.',
    data: {
      id: userCredentials.id,
      username: userCredentials.username,
      email: userCredentials.email,
      // Anda bisa menambahkan data lain yang disimpan di credentials
    },
  }).code(200);
};


// Mendefinisikan rute-rute untuk fitur autentikasi
const authRoutes = [
  {
    method: 'POST',
    path: '/auth/register',
    handler: registerUserHandler,
    options: {
      validate: {
        payload: registerUserPayloadSchema,
        failAction: (request, h, err) => {
          throw err;
        },
      },
      description: 'Registrasi pengguna baru',
      tags: ['api', 'auth'],
      notes: 'Membuat akun pengguna baru dengan username, email, dan password.',
    },
  },
  {
    method: 'POST',
    path: '/auth/login',
    handler: loginUserHandler,
    options: {
      validate: {
        payload: loginUserPayloadSchema,
        failAction: (request, h, err) => {
          throw err;
        },
      },
      description: 'Login pengguna',
      tags: ['api', 'auth'],
      notes: 'Mengautentikasi pengguna dan mengembalikan JWT jika berhasil.',
    },
  },
  // --- RUTE BARU YANG DILINDUNGI ---
  {
    method: 'GET',
    path: '/auth/me', // Endpoint untuk mendapatkan profil pengguna yang sedang login
    handler: getMyProfileHandler, // Handler baru
    options: {
      auth: 'jwt_strategy', // Menerapkan strategi autentikasi 'jwt_strategy' ke rute ini
      description: 'Mendapatkan profil pengguna yang terautentikasi',
      tags: ['api', 'auth', 'profile'],
      notes: 'Memerlukan token JWT yang valid di header Authorization (Bearer Token). Mengembalikan detail pengguna dari token.',
    },
  },
];

module.exports = authRoutes;
