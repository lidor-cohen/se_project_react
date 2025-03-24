import { useRef } from 'react';
import './ToggleSwitch.css';
import { CurrentTemperatureUnitContext } from '../../../../contexts/CurrentTemperatureUnitContext';
import { useContext } from 'react';

function ToggleSwitch({ value, onChange }) {
  const inputRef = useRef();
  const { handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <div className="switch__container">
      <input
        ref={inputRef}
        className="switch__input"
        id={`switch-input`}
        type="checkbox"
        value={value}
        onChange={handleToggleSwitchChange}
      />
    </div>
  );
}

export default ToggleSwitch;
