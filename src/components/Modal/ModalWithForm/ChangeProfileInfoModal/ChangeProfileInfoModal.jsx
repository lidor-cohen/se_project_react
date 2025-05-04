// External
import './ChangeProfileInfoModal.css';
import { useContext, useState } from 'react';

// Components
import ModalWithForm from '../ModalWithForm';
import FormInput from '../../../UI/FormElements/FormInput';
import authApi from '../../../../utils/apis/authApi';

// Contexts
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';

// Validators
import { isAvatarValid } from '../../../../utils/validation';

function ChangeProfileInfoModal({ isOpen, closeModal }) {
  const { updateUserInfo } = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const onChangeNameHandler = (evt) => {
    setName(evt.target.value);
  };
  const onChangeAvatarHandler = (evt) => {
    setAvatar(evt.target.value);
  };

  const resetFields = () => {
    setName('');
    setAvatar('');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    return authApi
      .updateUser({
        name,
        avatar,
      })
      .then((data) => {
        updateUserInfo({ name: data.name, avatar: data.avatar });
        resetFields();
        closeModal();
      });
  };

  return (
    isOpen && (
      <ModalWithForm
        title="Change profile data"
        name="change-profile-info"
        buttonText="Save Changes"
        onSubmit={handleSubmit}
        onClose={closeModal}
      >
        <FormInput
          id="changeNameInput"
          name="name"
          type="text"
          label="Name *"
          placeholder="Name"
          minLength={2}
          maxLength={30}
          value={name}
          required={true}
          onChange={onChangeNameHandler}
        />

        <FormInput
          id="changeAvatarInput"
          name="avatar"
          type="url"
          label="Avatar *"
          placeholder="Avatar"
          value={avatar}
          required={true}
          validator={isAvatarValid}
          onChange={onChangeAvatarHandler}
        />
      </ModalWithForm>
    )
  );
}

export default ChangeProfileInfoModal;
