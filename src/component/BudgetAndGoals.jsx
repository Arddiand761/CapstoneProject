import React, { useState, useEffect } from 'react';
import Navbar from './sidebar'; 
import GoalCard from './GoalCard';
import AddGoalModal from './AddGoalModal';
import AddFundsModal from './AddFundsModal';

const BudgetAndGoals = () => {
  // Coba ambil data dari localStorage, atau gunakan data awal jika tidak ada
  const initialGoals = JSON.parse(localStorage.getItem('userGoals')) || [
    { id: 1, name: 'Jordan 11', currentAmount: 4500000, targetAmount: 11125000 },
    { id: 2, name: 'Canon Camera', currentAmount: 45000000, targetAmount: 110000000 },
    { id: 3, name: 'Liburan ke Bali', currentAmount: 6000000, targetAmount: 7500000 }
  ];
  const [goals, setGoals] = useState(initialGoals);
  
  const [isAddGoalModalOpen, setAddGoalModalOpen] = useState(false);
  const [isAddFundsModalOpen, setAddFundsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  // Simpan data ke localStorage setiap kali 'goals' berubah
  useEffect(() => {
    localStorage.setItem('userGoals', JSON.stringify(goals));
  }, [goals]);

  const budgetSummary = { income: 15000000, expense: 8500000 };
  const remainingFunds = budgetSummary.income - budgetSummary.expense;
  
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    }).format(number);
  };

  const handleAddGoal = (newGoalData) => {
    const newGoal = {
      id: Date.now(),
      ...newGoalData,
      currentAmount: 0,
    };
    setGoals([...goals, newGoal]);
  };

  const handleAddFunds = (amount) => {
    setGoals(goals.map(goal => 
      goal.id === selectedGoal.id 
        ? { ...goal, currentAmount: Math.min(goal.currentAmount + amount, goal.targetAmount) } 
        : goal
    ));
    setSelectedGoal(null);
  };

  const openAddFundsModal = (goal) => {
    setSelectedGoal(goal);
    setAddFundsModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen pt-24 px-4 md:px-10 pb-10">
        <header>
            <h1 className="text-3xl font-bold text-gray-800">Budget & Goals</h1>
        </header>
        <section className="mt-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-4">Ringkasan Budget Bulan Ini</h3>
              <div className="mt-4 grid md:grid-cols-3 gap-6 text-center">
                  <div>
                      <p className="text-sm text-gray-500">Pemasukan</p>
                      <span className="text-2xl font-semibold text-gray-800">{formatRupiah(budgetSummary.income)}</span>
                  </div>
                  <div>
                      <p className="text-sm text-gray-500">Pengeluaran</p>
                      <span className="text-2xl font-semibold text-gray-800">{formatRupiah(budgetSummary.expense)}</span>
                  </div>
                  <div className="md:border-l md:pl-6">
                      <p className="text-sm text-gray-500">Sisa Dana Bisa Dipakai</p>
                      <span className="text-2xl font-bold text-teal-600">{formatRupiah(remainingFunds)}</span>
                  </div>
              </div>
            </div>
        </section>
        <section className="mt-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">My Goals</h2>
                <button 
                  onClick={() => setAddGoalModalOpen(true)}
                  className="bg-emerald-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-emerald-700 transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Buat Goal Baru
                </button>
            </div>
            <div className="space-y-4">
              {goals.length > 0 ? (
                goals.map(goal => (
                  <GoalCard key={goal.id} goal={goal} onAddFunds={openAddFundsModal} />
                ))
              ) : (
                <div className="text-center py-10 px-6 bg-white rounded-lg shadow-md">
                  <p className="text-gray-500">Anda belum memiliki goal. Ayo buat satu!</p>
                </div>
              )}
            </div>
        </section>
      </div>
      <AddGoalModal 
        isOpen={isAddGoalModalOpen}
        onClose={() => setAddGoalModalOpen(false)}
        onSave={handleAddGoal}
      />
      {selectedGoal && (
        <AddFundsModal 
          isOpen={isAddFundsModalOpen}
          onClose={() => setAddFundsModalOpen(false)}
          onSave={handleAddFunds}
          goal={selectedGoal}
        />
      )}
    </>
  );
};

export default BudgetAndGoals;
