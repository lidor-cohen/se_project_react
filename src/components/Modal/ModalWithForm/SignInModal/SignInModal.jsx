import './SignInModal.css';
import ModalWithForm from '../ModalWithForm';
import { useRef, useState } from 'react';

function SignInModal({ isOpen, signInUser, closeModal, setActiveModal }) {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [passwordLabel, setPasswordLabel] = useState('Password');

  const passwordRef = useRef();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInUser({
      email: userData.email,
      password: userData.password,
    })
      .then(console.log)
      .catch(() => {
        passwordRef.current.classList.add(
          'form-modal__input-container-incorrect'
        );
        setPasswordLabel('Incorrect Password');
      });
  };

  return (
    isOpen && (
      <ModalWithForm
        title="Log in"
        name="login"
        buttonText="Log in"
        subButton={{
          text: 'or Sign Up',
          action: () => {
            setActiveModal('signup-modal');
          },
        }}
        modalClass={'modal_type_sign-in'}
        onSubmit={handleSubmit}
        onClose={closeModal}
      >
        <div className="form-modal__input-container">
          <label htmlFor="userEmail" className="form-modal__label">
            Email
          </label>
          <input
            required
            name="email"
            minLength={2}
            maxLength={20}
            id="userEmail"
            placeholder="Email"
            type="email"
            className="form-modal__input form-modal__input_type_text"
            value={userData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-modal__input-container" ref={passwordRef}>
          <label htmlFor="userPassword" className="form-modal__label">
            {passwordLabel}
          </label>
          <input
            required
            name="password"
            id="userPassword"
            placeholder="Password"
            type="password"
            className="form-modal__input form-modal__input_type_text"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
      </ModalWithForm>
    )
  );
}

export default SignInModal;
