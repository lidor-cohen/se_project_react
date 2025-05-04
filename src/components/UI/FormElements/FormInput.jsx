import { useState, useRef } from 'react';
import './FormElements.css';

function FormInput({
  id,
  name,
  type,
  label,
  value,
  minLength,
  maxLength,
  placeholder,
  onChange,
  required,
}) {
  const [error, setError] = useState('');
  const labelRef = useRef();
  const inputRef = useRef();

  const handleChange = (evt) => {
    const isValid = validationFn
      ? validationFn(evt.target.value)
      : evt.target.validity.valid;

    if (!isValid) {
      const message = errorMessage || evt.target.validationMessage;
      setError(message);
      labelRef.current.classList.add('form__label-error');
      inputRef.current.classList.add('form__input-error');
    } else {
      setError('');
      labelRef.current.classList.remove('form__label-error');
      inputRef.current.classList.remove('form__input-error');
    }

    onChange(evt);
  };
  return (
    <div className="form-modal__input-container">
      <label ref={labelRef} htmlFor={id} className="form-modal__label">
        {label} ({error || ''})
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
        ref={inputRef}
      />
    </div>
  );
}

export default FormInput;
