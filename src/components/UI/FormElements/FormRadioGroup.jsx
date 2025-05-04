import './FormElements.css';

function FormRadioGroup({ name, label, options, selectedValue, onChange }) {
  function handleChangeOption(evt) {
    onChange(evt);
  }

  return (
    <div className="form-modal__input-container">
      <p className="form-modal__label">{label}</p>

      {options.map((option) => {
        return (
          <div className="form-modal__radio-container" key={`${option.id}`}>
            <input
              className="form-modal__input_type_radio"
              type="radio"
              id={option.id}
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={handleChangeOption}
            />
            <label htmlFor={option.id} className="form-modal__label-radio">
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default FormRadioGroup;
