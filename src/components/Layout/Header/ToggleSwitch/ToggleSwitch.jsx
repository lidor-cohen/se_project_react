// External
import './ToggleSwitch.css';
import { useContext } from 'react';

// Contexts
import { CurrentTemperatureUnitContext } from '../../../../contexts/CurrentTemperatureUnitContext';

function ToggleSwitch({ value }) {
  const { handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <div className="switch__container">
      <input
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
