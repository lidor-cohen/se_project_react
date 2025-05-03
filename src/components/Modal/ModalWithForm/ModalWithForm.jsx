// External
import './ModalWithForm.css';

// Components
import closeButtonImage from '../../../assets/icons/close-button-gray.svg';
import Modal from '../../Modal/Modal';

function ModalWithForm({
  title,
  name,
  buttonText,
  subButton,
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
        <div className="form-modal__buttons-container">
          <button
            disabled={isButtonDisabled}
            className="button-primary form-modal__submit"
            type="submit"
          >
            {buttonText}
          </button>
          {subButton && (
            <a className="form-modal__sub-button" onClick={subButton.action}>
              {subButton.text}
            </a>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
