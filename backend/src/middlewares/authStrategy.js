// Mengimpor @hapi/jwt untuk validasi token
const Jwt = require('@hapi/jwt');
// Mengimpor helper jwt kita, khususnya untuk mendapatkan JWT_SECRET_KEY
// Meskipun @hapi/jwt menangani verifikasi, kita mungkin memerlukan secret key jika ada konfigurasi lanjutan
// atau jika kita ingin melakukan validasi tambahan. Untuk kasus ini, @hapi/jwt akan menggunakannya secara internal.
// const { JWT_SECRET_KEY } = require('../lib/jwtHelpers'); // Kita akan mengambilnya dari process.env langsung

// Penyimpanan pengguna sementara di memori (untuk mencocokkan ID pengguna dari token)
// PENTING: Ini HANYA untuk simulasi. Dalam aplikasi nyata, Anda akan mengambil data pengguna dari database.
const { users } = require('../api/auth/handler'); // Impor array users dari auth handler

/**
 * Fungsi untuk memvalidasi artefak (token) yang didekode.
 * Fungsi ini akan dipanggil oleh strategi @hapi/jwt setelah token berhasil didekode.
 * @param {object} artifacts - Objek yang berisi token yang telah didekode.
 * @param {import('@hapi/hapi').Request} request - Objek request Hapi.
 * @param {import('@hapi/hapi').ResponseToolkit} h - Objek response toolkit Hapi.
 * @returns {Promise<{isValid: boolean, credentials: object | null, response?: import('@hapi/hapi').ResponseObject}>}
 * - isValid: true jika token dan pengguna valid.
 * - credentials: data pengguna yang akan tersedia di request.auth.credentials.
 * - response: (opsional) jika ingin mengoverride respons error default.
 */
const validateArtifacts = async (artifacts, request, h) => {
  // artifacts.decoded.payload berisi payload dari token JWT (misalnya, { id, username, email })
  const { id: userIdFromToken } = artifacts.decoded.payload;

  // Simulasi: Cek apakah pengguna dengan ID dari token ada di "database" kita (array users)
  // Dalam aplikasi nyata, ini akan menjadi query ke database:
  // const user = await YourUserModel.findById(userIdFromToken);
  const user = users.find(u => u.id === userIdFromToken);

  if (!user) {
    console.warn(`Autentikasi gagal: Pengguna dengan ID ${userIdFromToken} dari token tidak ditemukan.`);
    return { isValid: false }; // Pengguna tidak ditemukan
  }

  // Jika pengguna ditemukan, token dianggap valid dan kita bisa meneruskan kredensial pengguna.
  // Kredensial ini akan tersedia di handler rute melalui request.auth.credentials.
  console.log(`Pengguna terautentikasi: ${user.username} (ID: ${user.id})`);
  return {
    isValid: true,
    credentials: {
      id: user.id,
      username: user.username,
      email: user.email,
      // Anda bisa menambahkan scope atau peran pengguna di sini jika ada
      // scope: user.roles,
    },
  };
};

// Plugin Hapi untuk mendaftarkan strategi autentikasi JWT
const jwtAuthStrategyPlugin = {
  name: 'jwtAuthStrategy',
  version: '1.0.0',
  /**
   * Fungsi register untuk plugin.
   * @param {import('@hapi/hapi').Server} server - Instance server Hapi.
   * @param {object} options - Opsi plugin (jika ada).
   */
  register: async (server, options) => {
    // Mendaftarkan plugin @hapi/jwt jika belum terdaftar (sebaiknya dilakukan sekali di server.js)
    // Namun, untuk modularitas, kita bisa pastikan di sini atau di server.js
    // await server.register(Jwt); // Biasanya sudah diregister jika kita pakai Jwt.token.generate

    // Mengambil JWT_SECRET_KEY dari variabel lingkungan
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) {
      console.error('FATAL ERROR: JWT_SECRET_KEY tidak ditemukan di variabel lingkungan. Strategi JWT tidak dapat didaftarkan.');
      // Sebaiknya hentikan server atau throw error yang lebih signifikan di sini
      // agar masalah konfigurasi ini segera terlihat.
      // Untuk contoh ini, kita hanya log error.
      return;
    }

    // Mendaftarkan strategi autentikasi 'jwt'
    server.auth.strategy('jwt_strategy', 'jwt', {
      keys: jwtSecretKey, // Kunci rahasia untuk memverifikasi signature token
      verify: {
        aud: false, // Audience (aud) tidak diverifikasi dalam contoh ini
        iss: false, // Issuer (iss) tidak diverifikasi dalam contoh ini
        sub: false, // Subject (sub) tidak diverifikasi dalam contoh ini
        nbf: true,  // Not Before (nbf) akan diverifikasi
        exp: true,  // Expiration (exp) akan diverifikasi (default: true)
        maxAgeSec: 14400, // Contoh: Maksimum umur token 4 jam (opsional, ttlSec di generateToken lebih utama)
      },
      validate: validateArtifacts, // Fungsi validasi kustom kita setelah token didekode
    });

    // (Opsional) Menetapkan strategi 'jwt_strategy' sebagai strategi default untuk seluruh server
    // Jika Anda melakukan ini, semua rute akan memerlukan autentikasi JWT kecuali di-override.
    // Biasanya lebih baik menerapkan strategi per rute atau dengan `server.auth.default(false)`
    // dan kemudian `auth: 'jwt_strategy'` pada rute yang dilindungi.
    // server.auth.default('jwt_strategy');

    console.log("Strategi autentikasi JWT 'jwt_strategy' berhasil didaftarkan.");
  },
};

module.exports = jwtAuthStrategyPlugin;
