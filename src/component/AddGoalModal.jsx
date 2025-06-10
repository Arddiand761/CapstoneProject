import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddGoalModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault(); // Mencegah form submit default
    if (name && target > 0) {
      onSave({ name, target: parseFloat(target) });
      setName('');
      setTarget('');
      onClose();
    } else {
      alert('Nama goal dan target harus diisi dengan benar.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-btn">
          <X size={24} />
        </button>
        <h2 className="modal-title">Buat Goal Baru</h2>
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label htmlFor="goalName" className="modal-label">Nama Goal</label>
            <input
              id="goalName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Sepatu Baru"
              className="modal-input"
              required
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="goalTarget" className="modal-label">Target Dana (IDR)</label>
            <input
              id="goalTarget"
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Contoh: 1500000"
              className="modal-input"
              required
              min="1"
            />
          </div>
          <button type="submit" className="modal-save-btn">
            Simpan Goal
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;
