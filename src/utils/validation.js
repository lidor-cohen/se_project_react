import validator from 'validator';

const isNameValid = (name) => {
  const namePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  return namePattern.test(name) && name.length >= 2 && name.length <= 30;
};

const isEmailValid = (email) => {
  return validator.isEmail(email);
};

const isAvatarValid = (avatar) => {
  return validator.isURL(avatar) && /\.(png|jpe?g)$/i.test(avatar);
};

const isPasswordValid = (password) => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,16}$/;
  return passwordPattern.test(password);
};

export { isNameValid, isEmailValid, isAvatarValid, isPasswordValid };
