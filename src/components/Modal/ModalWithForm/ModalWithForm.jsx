// External
import './ModalWithForm.css';

// Components
import closeButtonImage from '../../../assets/icons/close-button-gray.svg';
import Modal from '../../Modal/Modal';
import FormSubmit from '../../UI/FormElements/FormSubmit';
import FormTitle from '../../UI/FormElements/FormTitle';

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
      <FormTitle title={title} />
      <form
        name={name}
        className={`form-modal__form form-modal__form_type_${name}`}
        onSubmit={onSubmit}
        noValidate
      >
        {children}

        <FormSubmit
          text={buttonText}
          isButtonDisabled={isButtonDisabled}
          subButton={subButton}
        />
      </form>
    </Modal>
  );
}

export default ModalWithForm;
