import closeButtonImage from '../../../assets/icons/close-button-gray.svg';
import Modal from '../Modal/Modal';
import './ModalWithForm.css';

function ModalWithForm({
  title,
  name,
  buttonText,
  onClose,
  onSubmit,
  isButtonDisabled,
  children,
}) {
  return (
    <Modal
      modalClass="modal_type_form"
      modalCloseButton={closeButtonImage}
      onClose={onClose}
    >
      <h2 className="form-modal__header">{title}</h2>
      <form
        name={name}
        className={`form-modal__form form-modal__form_type_${name}`}
        onSubmit={onSubmit}
        noValidate
      >
        {children}

        <button
          disabled={isButtonDisabled}
          className="button-primary form-modal__submit"
          type="submit"
        >
          {buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
