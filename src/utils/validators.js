const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const namePattern = /^[A-Za-zÀ-ɏ][A-Za-zÀ-ɏ .'-]*$/;
const phonePattern = /^\+?[0-9\s-]+$/;

export const isValidEmail = (value) => {
  return emailPattern.test(value.trim());
};

export const isValidName = (value) => {
  return namePattern.test(value.trim());
};

export const isValidPhone = (value) => {
  const text = value.trim();

  if (phonePattern.test(text) === false) {
    return false;
  }

  const digitCount = text.replace(/\D/g, '').length;
  return digitCount >= 10 && digitCount <= 13;
};

export const validateCheckoutField = (name, value) => {
  const text = value.trim();

  if (name === 'fullName') {
    if (text === '') {
      return 'Full name is required.';
    }
    if (text.length < 3) {
      return 'Full name must be at least 3 characters.';
    }
    if (isValidName(text) === false) {
      return 'Full name can only contain letters, spaces, periods, apostrophes, and hyphens.';
    }
    if (text.split(/\s+/).length < 2) {
      return 'Please enter both your first and last name.';
    }
    return '';
  }

  if (name === 'email') {
    if (text === '') {
      return 'Email address is required.';
    }
    if (isValidEmail(text) === false) {
      return 'Enter a valid email address, for example name@example.com.';
    }
    return '';
  }

  if (name === 'phone') {
    if (text === '') {
      return 'Phone number is required.';
    }
    if (phonePattern.test(text) === false) {
      return 'Phone number can only contain digits, spaces, "+" and "-".';
    }
    if (isValidPhone(text) === false) {
      return 'Phone number must have 10 to 13 digits.';
    }
    return '';
  }

  if (name === 'address') {
    if (text === '') {
      return 'Delivery address is required.';
    }
    if (text.length < 10) {
      return 'Please enter a complete address (at least 10 characters).';
    }
    return '';
  }

  if (name === 'paymentMethod') {
    if (value !== 'Cash on Delivery') {
      return 'Please select Cash on Delivery as your payment method.';
    }
    return '';
  }

  return '';
};

export const validateCheckoutForm = (formData) => {
  const fields = ['fullName', 'email', 'phone', 'address', 'paymentMethod'];
  const errors = {};

  fields.forEach((field) => {
    const message = validateCheckoutField(field, formData[field]);
    if (message !== '') {
      errors[field] = message;
    }
  });

  return errors;
};
