import './SignUpModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useRef, useState } from 'react';
import {
  isNameValid,
  isEmailValid,
  isAvatarValid,
  isPasswordValid,
} from '../../../utils/validation';

function SignUpModal({ isOpen, signUpUser, closeModal, setActiveModal }) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    avatar: '',
    password: '',
  });

  const [nameLabel, setNameLabel] = useState('Name *');
  const [emailLabel, setEmailLabel] = useState('Email *');
  const [avatarLabel, setAvatarLabel] = useState('Avatar URL *');
  const [passwordLabel, setPasswordLabel] = useState('Password *');

  const nameRef = useRef();
  const emailRef = useRef();
  const avatarRef = useRef();
  const passwordRef = useRef();

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleChange = (e) => {
    userData[e.target.name] = e.target.value;
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });

    const validName = isNameValid(userData.name);
    const validEmail = isEmailValid(userData.email);
    const validAvatar = isAvatarValid(userData.avatar);
    const validPassword = isPasswordValid(userData.password);

    if (!validName && e.target.name === 'name') {
      setNameLabel('Name (must be 2-30 characters) *');
      setButtonDisabled(true);
    } else if (validName && e.target.name === 'name') {
      setNameLabel('Name *');
    }

    if (!validEmail && e.target.name === 'email') {
      setEmailLabel('Email (must be a valid email address) *');
      setButtonDisabled(true);
    } else if (validEmail && e.target.name === 'email') {
      setEmailLabel('Email *');
    }

    if (!validAvatar && e.target.name === 'avatar') {
      setAvatarLabel('Avatar URL (must be a valid image URL) *');
      setButtonDisabled(true);
    } else if (validAvatar && e.target.name === 'avatar') {
      setAvatarLabel('Avatar URL *');
    }

    if (!validPassword && e.target.name === 'password') {
      setPasswordLabel(
        'Password (must be between 8-16 characters with at least one uppercase letter and one lowercase letter)'
      );
      setButtonDisabled(true);
    } else if (validPassword && e.target.name === 'password') {
      setPasswordLabel('Password *');
    }

    if (validName && validEmail && validAvatar && validPassword)
      setButtonDisabled(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpUser({
      email: userData.email,
      password: userData.password,
      name: userData.name,
      avatar: userData.avatar,
    })
      .then(() => {
        closeModal();
        setActiveModal('signin-modal');
      })
      .catch(console.error);
  };

  return (
    isOpen && (
      <ModalWithForm
        title="Sign Up"
        name="signup"
        buttonText="Sign up"
        subButton={{
          text: 'or Login',
          action: () => {
            setActiveModal('signin-modal');
          },
        }}
        modalClass={'modal_type_sign-up'}
        isButtonDisabled={buttonDisabled}
        onSubmit={handleSubmit}
        onClose={closeModal}
      >
        <div ref={emailRef} className="form-modal__input-container">
          <label htmlFor="userEmail" className="form-modal__label">
            {emailLabel}
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

        <div ref={passwordRef} className="form-modal__input-container">
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

        <div ref={nameRef} className="form-modal__input-container">
          <label htmlFor="userName" className="form-modal__label">
            {nameLabel}
          </label>
          <input
            required
            name="name"
            id="userName"
            placeholder="Name"
            type="text"
            className="form-modal__input form-modal__input_type_text"
            value={userData.name}
            onChange={handleChange}
          />
        </div>

        <div ref={avatarRef} className="form-modal__input-container">
          <label htmlFor="userAvatar" className="form-modal__label">
            {avatarLabel}
          </label>
          <input
            required
            name="avatar"
            id="userAvatar"
            placeholder="Avatar URL"
            type="url"
            className="form-modal__input form-modal__input_type_text"
            value={userData.avatar}
            onChange={handleChange}
          />
        </div>
      </ModalWithForm>
    )
  );
}

export default SignUpModal;
