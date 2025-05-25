import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar'; // Pastikan path ke komponen Sidebar Anda benar

// Data Dummy untuk Transaksi
const dummyTransactionsData = [
  {
    id: 'trx001',
    date: '2025-05-23',
    description: 'Makan siang di kantor',
    category: 'Food',
    type: 'expense',
    amount: 55000,
    paymentMethod: 'Non-Tunai',
  },
  {
    id: 'trx002',
    date: '2025-05-23',
    description: 'Gaji bulanan',
    category: 'Salary',
    type: 'income',
    amount: 7500000,
    paymentMethod: 'Non-Tunai',
  },
  {
    id: 'trx003',
    date: '2025-05-24',
    description: 'Belanja bulanan supermarket',
    category: 'Shop',
    type: 'expense',
    amount: 650000,
    paymentMethod: 'Non-Tunai',
  },
  {
    id: 'trx004',
    date: '2025-05-24',
    description: 'Transportasi ke kantor (Bensin)',
    category: 'Transport',
    type: 'expense',
    amount: 75000,
    paymentMethod: 'Tunai',
  },
  {
    id: 'trx005',
    date: '2025-05-25',
    description: 'Langganan streaming film',
    category: 'Other',
    type: 'expense',
    amount: 49000,
    paymentMethod: 'Non-Tunai',
  },
  {
    id: 'trx006',
    date: '2025-05-25',
    description: 'Bonus proyek',
    category: 'Bonus',
    type: 'income',
    amount: 1200000,
    paymentMethod: 'Non-Tunai',
  },
  {
    id: 'trx007',
    date: '2025-05-26',
    description: 'Membeli buku baru',
    category: 'Shop',
    type: 'expense',
    amount: 150000,
    paymentMethod: 'Tunai',
  }
];

const TransactionListPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'income', 'expense'

  useEffect(() => {
    // Simulasi pengambilan data
    setTransactions(dummyTransactionsData);
    setIsMounted(true);
  }, []);

  // Fungsi untuk memformat mata uang
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  // Fungsi untuk memformat tanggal
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const filteredTransactions = transactions
    .filter(transaction => {
      if (filterType === 'all') return true;
      return transaction.type === filterType;
    })
    .filter(transaction =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <main className={`flex-1 p-6 sm:p-8 bg-gray-100 transition-opacity duration-700 ease-in-out md:ml-64 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Riwayat Transaksi
          </h1>
          <p className="text-sm text-gray-600 mt-1">Lihat semua pemasukan dan pengeluaran Anda.</p>
        </header>

        {/* Filter dan Search Bar */}
        <div className={`bg-white rounded-xl shadow-md p-4 mb-6 transition-all duration-500 ease-in-out ${isMounted ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-grow sm:max-w-xs">
              <input
                type="text"
                placeholder="Cari deskripsi atau kategori..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors duration-200 ${filterType === 'all' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilterType('income')}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors duration-200 ${filterType === 'income' ? 'bg-green-600 text-white border-green-600' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}
              >
                Pemasukan
              </button>
              <button
                onClick={() => setFilterType('expense')}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors duration-200 ${filterType === 'expense' ? 'bg-red-500 text-white border-red-500' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}
              >
                Pengeluaran
              </button>
            </div>
          </div>
        </div>


        <div className={`bg-white rounded-xl shadow-xl transition-all duration-500 ease-in-out delay-100 ${isMounted ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0'}`}>
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Deskripsi</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Jenis</th>
                  <th scope="col" className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Jumlah</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Pembayaran</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-emerald-50/50 transition-colors duration-150 group">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 group-hover:text-gray-900">{formatDate(transaction.date)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 group-hover:text-gray-900 max-w-xs truncate" title={transaction.description}>{transaction.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {transaction.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'expense' && '- '}{formatCurrency(transaction.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-gray-700">{transaction.paymentMethod}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-10 text-center text-gray-500 italic">
                      {transactions.length === 0 ? "Belum ada data transaksi." : "Tidak ada transaksi yang cocok dengan filter atau pencarian Anda."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransactionListPage;