// External
import { useContext } from 'react';

// Components
import ItemModal from '../ItemModal/ItemModal';
import AddItemModal from '../ModalWithForm/AddItemModal/AddItemModal';
import SignInModal from '../ModalWithForm/SignInModal/SignInModal';
import SignUpModal from '../ModalWithForm/SignUpModal/SignUpModal';

// Contexts
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

function ModalContainer({
  activeModal,
  modalData,
  closeModal,
  onAddItem,
  onDeleteItem,
  openModal,
}) {
  const { handleSignIn, handleSignUp } = useContext(CurrentUserContext);
  return (
    <>
      <SignInModal
        isOpen={activeModal === 'signin-modal'}
        closeModal={closeModal}
        signInUser={handleSignIn}
        openModal={openModal}
      />

      <SignUpModal
        isOpen={activeModal === 'signup-modal'}
        closeModal={closeModal}
        openModal={openModal}
        handleSignUp={handleSignUp}
      />

      <AddItemModal
        isOpen={activeModal === 'add-garment'}
        onAddItem={onAddItem}
        closeModal={closeModal}
      />

      <ItemModal
        isOpen={activeModal === 'item-modal'}
        name={modalData?.name}
        imageUrl={modalData?.imageUrl}
        weatherCondition={modalData?.weather}
        onClose={closeModal}
        onDelete={onDeleteItem}
      />
    </>
  );
}

export default ModalContainer;
