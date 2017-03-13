const validateInput = (data) => {
  const errors = {};

  if (data.email === '' || null) {
    errors.email = 'you have to provide your email';
  }

  if (data.password === '' || null) {
    errors.password = 'you have to provide your password';
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
};

module.exports = validateInput;
