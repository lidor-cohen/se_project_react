// Components
import ItemModal from '../ItemModal/ItemModal';
import AddItemModal from '../ModalWithForm/AddItemModal/AddItemModal';
import SignInModal from '../ModalWithForm/SignInModal/SignInModal';
import SignUpModal from '../ModalWithForm/SignUpModal/SignUpModal';

import authApi from '../../../utils/auth';

function ModalContainer({
  activeModal,
  modalData,
  closeModal,
  onAddItem,
  onDeleteItem,
  openModal,
}) {
  // Sign in user
  function handleSignIn({ email, password }) {
    return authApi.login({ email, password }).then(() => {
      closeModal();
    });
  }

  // Sign up user
  function handleSignUp({ email, password, name, avatar }) {
    return authApi
      .signup({ email, password, name, avatar })
      .then(() => {
        closeModal();
        openModal('signin-modal');
      })
      .catch((error) => {
        console.error('Signup error:', error);
      });
  }

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
        signUpUser={handleSignUp}
        openModal={openModal}
      />

      <AddItemModal
        isOpen={activeModal === 'add-garment'}
        onAddItem={onAddItem}
        onCloseModal={closeModal}
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
