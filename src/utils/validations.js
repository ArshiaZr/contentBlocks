// Desc: Validation functions for email and password

export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  // pasword should contain at least one number
  if (!/\d/.test(password)) {
    return "Password must contain at least one number";
  }
  // password should contain at least one special character
  if (!/[!@#$%^&*]/.test(password)) {
    return "Password must contain at least one special character";
  }
  // password should contain at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  // password should contain at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  return null;
};
