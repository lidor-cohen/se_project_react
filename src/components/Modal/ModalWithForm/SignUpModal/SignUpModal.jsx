import './SignUpModal.css';
import ModalWithForm from '../ModalWithForm';
import { useEffect, useState } from 'react';
import {
  isNameValid,
  isEmailValid,
  isAvatarValid,
  isPasswordValid,
} from '../../../../utils/validation';
import FormInput from '../../../UI/FormElements/FormInput';
import authApi from '../../../../utils/apis/authApi';

function SignUpModal({ isOpen, closeModal, openModal, handleSignUp }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');

  const [nameLabel, setNameLabel] = useState('Name *');
  const [emailLabel, setEmailLabel] = useState('Email *');
  const [avatarLabel, setAvatarLabel] = useState('Avatar URL *');
  const [passwordLabel, setPasswordLabel] = useState('Password *');

  const [validity, setValidity] = useState({
    name: false,
    email: false,
    avatar: false,
    password: false,
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleNameChange = (evt) => {
    const newName = evt.target.value;
    setName(newName);

    validateName(newName)
      ? setValidity({
          ...validity,
          name: true,
        })
      : setValidity({
          ...validity,
          name: false,
        });
  };
  const handleEmailChange = (evt) => {
    const newEmail = evt.target.value;
    setEmail(newEmail);

    validateEmail(newEmail)
      ? setValidity({
          ...validity,
          email: true,
        })
      : setValidity({
          ...validity,
          email: false,
        });
  };
  const handleAvatarChange = (evt) => {
    const newAvatar = evt.target.value;
    setAvatar(newAvatar);

    validateAvatar(newAvatar)
      ? setValidity({
          ...validity,
          avatar: true,
        })
      : setValidity({
          ...validity,
          avatar: false,
        });
  };
  const handlePasswordChange = (evt) => {
    const newPassword = evt.target.value;
    setPassword(newPassword);

    validatePassword(newPassword)
      ? setValidity({
          ...validity,
          password: true,
        })
      : setValidity({
          ...validity,
          password: false,
        });
  };

  const validateName = (value) => {
    const isValid = isNameValid(value);

    if (!isValid) {
      setNameLabel('Name (must be 2-30 characters) *');
      setButtonDisabled(true);
    } else if (isValid) {
      setNameLabel('Name *');
    }

    return isValid;
  };
  const validateEmail = (value) => {
    const isValid = isEmailValid(value);

    if (!isValid) {
      setEmailLabel('Email (must be a valid email address) *');
      setButtonDisabled(true);
    } else if (isValid) {
      setEmailLabel('Email *');
    }

    return isValid;
  };
  const validateAvatar = (value) => {
    const isValid = isAvatarValid(value);

    if (!isValid) {
      setAvatarLabel('Avatar URL (must be a valid image URL) *');
      setButtonDisabled(true);
    } else if (isValid) {
      setAvatarLabel('Avatar URL *');
    }

    return isValid;
  };
  const validatePassword = (value) => {
    const isValid = isPasswordValid(value);

    if (!isValid) {
      setPasswordLabel(
        'Password (must be between 8-16 characters with at least one uppercase letter and one lowercase letter)'
      );
      setButtonDisabled(true);
    } else if (isValid) {
      setPasswordLabel('Password *');
    }

    return isValid;
  };

  const resetValues = () => {
    setName('');
    setAvatar('');
    setPassword('');
    setEmail('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleSignUp({
      email,
      password,
      name,
      avatar,
    })
      .then(closeModal)
      .catch(console.error);
  };

  useEffect(() => {
    if (Object.values(validity).every((item) => item === true))
      setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [validity]);

  return (
    isOpen && (
      <ModalWithForm
        title="Sign Up"
        name="signup"
        buttonText="Sign up"
        subButton={{
          text: 'or Login',
          action: () => {
            openModal('signin-modal');
          },
        }}
        isButtonDisabled={buttonDisabled}
        onSubmit={handleSubmit}
        onClose={closeModal}
      >
        <FormInput
          id="userEmail"
          label={emailLabel}
          placeholder="Email"
          type="email"
          value={email}
          minLength={6}
          maxLength={30}
          onChange={handleEmailChange}
          required={true}
          checkErrors={false}
        />

        <FormInput
          id="userPassword"
          label={passwordLabel}
          placeholder="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required={true}
          checkErrors={false}
        />

        <FormInput
          id="userName"
          label={nameLabel}
          placeholder="Name"
          type="text"
          value={name}
          onChange={handleNameChange}
          minLength={2}
          maxLength={20}
          required={true}
          checkErrors={false}
        />

        <FormInput
          id="userAvatar"
          label={avatarLabel}
          placeholder="Avatar URL"
          type="url"
          value={avatar}
          onChange={handleAvatarChange}
          required={true}
          checkErrors={false}
        />
      </ModalWithForm>
    )
  );
}

export default SignUpModal;
