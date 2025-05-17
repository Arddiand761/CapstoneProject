    // Mengimpor rute-rute dari berbagai fitur
    const authRoutes = require('./api/auth/routes');
    // const transactionRoutes = require('./api/transactions/routes'); // Contoh untuk fitur lain nanti
    // const budgetRoutes = require('./api/budgets/routes');       // Contoh untuk fitur lain nanti

    // Definisikan rute untuk root path
    const rootRoute = {
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return h.response({
          status: 'success',
          message: 'Selamat datang di API Capstone Project Keuangan!',
          documentation_hint: 'Silakan gunakan Postman atau alat serupa untuk menguji endpoint API seperti /auth/register dan /auth/login dengan metode POST.',
        }).code(200);
      },
      options: {
        description: 'Menampilkan pesan selamat datang untuk root API',
        tags: ['api', 'root'],
        notes: 'Endpoint ini hanya untuk memberikan konfirmasi bahwa server berjalan.',
      },
    };

    // Menggabungkan semua rute ke dalam satu array
    const allRoutes = [
      rootRoute, // Tambahkan rute root di sini
      ...authRoutes,
      // ...transactionRoutes, // Akan ditambahkan nanti
      // ...budgetRoutes,       // Akan ditambahkan nanti
    ];

    // Mengekspor array yang berisi semua rute aplikasi
    module.exports = allRoutes;
    