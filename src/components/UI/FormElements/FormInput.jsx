import { useState, useRef } from 'react';
import './FormElements.css';

function FormInput({
  id,
  name,
  type,
  label,
  labelRef,
  value,
  checkErrors = true,
  minLength,
  maxLength,
  placeholder,
  onChange,
  validator,
  required,
}) {
  const [error, setError] = useState('');
  const _labelRef = labelRef || useRef();
  const _inputRef = useRef();

  const handleChange = (evt) => {
    if (!checkErrors) {
      onChange(evt);
      return;
    }

    const isValid = validator
      ? validator(evt.target.value)
      : evt.target.validity.valid;

    if (!isValid) {
      const message = evt.target.validationMessage;
      setError(message);
      _labelRef.current.classList.add('form__label-error');
      _inputRef.current.classList.add('form__input-error');
    } else {
      setError('');
      _labelRef.current.classList.remove('form__label-error');
      _inputRef.current.classList.remove('form__input-error');
    }

    onChange(evt);
  };
  return (
    <div className="form-modal__input-container">
      <label ref={_labelRef} htmlFor={id} className="form-modal__label">
        {label} {error ? `(${error})` : ''}
      </label>
      <input
        className="form-modal__input form-modal__input_type_text"
        required={required}
        id={id}
        value={value}
        type={type}
        name={name || id}
        placeholder={placeholder || label}
        {...(minLength !== undefined && { minLength })}
        {...(maxLength !== undefined && { maxLength })}
        onChange={handleChange}
        ref={_inputRef}
      />
    </div>
  );
}

export default FormInput;
