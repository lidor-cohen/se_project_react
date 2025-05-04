import './FormElements.css';

function FormSubmit({ text, isButtonDisabled, subButton }) {
  return (
    <div className="form-modal__buttons-container">
      <button
        disabled={isButtonDisabled}
        className="button-primary form-modal__submit"
        type="submit"
      >
        {text}
      </button>
      {subButton && (
        <a className="form-modal__sub-button" onClick={subButton.action}>
          {subButton.text}
        </a>
      )}
    </div>
  );
}

export default FormSubmit;
