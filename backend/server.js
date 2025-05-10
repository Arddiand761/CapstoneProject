// index.js
import Hapi from '@hapi/hapi';

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'], // biar React bisa akses API ini
      }
    }
  });

  // Route dasar
  server.route({
    method: 'GET',
    path: '/',
    handler: () => {
      return { message: 'API Hapi.js Aktif!' };
    },
  });

  // Contoh route tambahan
  server.route({
    method: 'GET',
    path: '/api/products',
    handler: () => {
      return [
        { id: 1, name: 'Produk A' },
        { id: 2, name: 'Produk B' },
      ];
    },
  });

  await server.start();
  console.log(`Server berjalan di ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
