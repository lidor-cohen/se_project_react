import { useState } from 'react';

export function useModalState() {
  const [activeModal, setActiveModal] = useState('');
  const [modalData, setModalData] = useState({});
  const [selectedItemId, setSelectedItemId] = useState(-1);

  function openModal(modalName) {
    setActiveModal(modalName);
  }

  function closeModal() {
    setActiveModal('');
  }

  return {
    activeModal,
    modalData,
    selectedItemId,
    openModal,
    closeModal,
    setModalData,
    setSelectedItemId,
  };
}
