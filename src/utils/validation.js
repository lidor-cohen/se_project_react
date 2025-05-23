import validator from 'validator';

const isNameValid = (name) => {
  const namePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  return namePattern.test(name) && name.length >= 2 && name.length <= 30;
};

const isEmailValid = (email) => {
  return validator.isEmail(email);
};

const isAvatarValid = (avatar) => {
  return validator.isURL(avatar);
};

const isPasswordValid = (password) => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,16}$/;
  return passwordPattern.test(password);
};

const isImageValid = async (imageUrl) => {
  const img = new Image();

  const isValid = await new Promise((resolve) => {
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = imageUrl;
  });

  return isValid;
};

export {
  isNameValid,
  isEmailValid,
  isAvatarValid,
  isPasswordValid,
  isImageValid,
};
