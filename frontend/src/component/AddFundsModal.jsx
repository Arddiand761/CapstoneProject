import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddFundsModal = ({ isOpen, onClose, onSave, goal }) => {
  const [amount, setAmount] = useState('');

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    const fundAmount = parseFloat(amount);
    if (fundAmount > 0) {
      onSave(fundAmount);
      setAmount('');
      onClose();
    } else {
      alert('Jumlah dana harus lebih besar dari 0.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-btn">
          <X size={24} />
        </button>
        <h2 className="modal-title">Tambah Dana untuk <span className="font-bold text-emerald-600">{goal.name}</span></h2>
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label htmlFor="fundAmount" className="modal-label">Jumlah Dana (IDR)</label>
            <input
              id="fundAmount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Masukkan jumlah dana"
              className="modal-input"
              required
              min="1"
              autoFocus
            />
          </div>
          <button type="submit" className="modal-save-btn">
            Tambahkan Dana
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFundsModal;
