import { useState } from 'react';

export function useModalState() {
  const [activeModal, setActiveModal] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(-1);

  function openModal(modalName) {
    setActiveModal(modalName);
  }

  function closeModal() {
    setActiveModal('');
  }

  return {
    activeModal,
    selectedItemId,
    openModal,
    closeModal,
    setSelectedItemId,
  };
}
