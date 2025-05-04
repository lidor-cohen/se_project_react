import './SignInModal.css';
import ModalWithForm from '../ModalWithForm';
import { useRef, useState } from 'react';
import FormInput from '../../../UI/FormElements/FormInput';

function SignInModal({ isOpen, signInUser, openModal, closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordLabel, setPasswordLabel] = useState('Password');
  const passwordRef = useRef();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signInUser({
      email,
      password,
    })
      .then(closeModal)
      .catch(() => {
        passwordRef.current.classList.add('form__input-error');
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
            openModal('signup-modal');
          },
        }}
        onSubmit={handleSubmit}
        onClose={closeModal}
      >
        <FormInput
          id="userEmail"
          name="email"
          label="Email"
          type="email"
          minLength={2}
          maxLength={20}
          value={email}
          onChange={handleEmailChange}
          required={true}
          checkErrors={false}
        />

        <FormInput
          id="userPassword"
          name="password"
          label={passwordLabel}
          labelRef={passwordRef}
          placeholder="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required={true}
        />
      </ModalWithForm>
    )
  );
}

export default SignInModal;
