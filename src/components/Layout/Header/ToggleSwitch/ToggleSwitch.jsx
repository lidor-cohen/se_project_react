// External
import './ToggleSwitch.css';
import { useContext } from 'react';

// Contexts
import { CurrentTemperatureUnitContext } from '../../../../contexts/CurrentTemperatureUnitContext';

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const isChecked = currentTemperatureUnit === 'C';

  return (
    <div className="switch__container">
      <input
        className="switch__input"
        id={`switch-input`}
        type="checkbox"
        value={isChecked}
        onChange={handleToggleSwitchChange}
      />
    </div>
  );
}

export default ToggleSwitch;
