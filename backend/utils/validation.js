// utils/validation.js

// Validation for user registration data
const validateUserRegistration = ({ name, email, password }) => {
    const errors = {};

    if (!name || name.trim() === '') {
        errors.name = 'Name is required';
    }

    if (!email || email.trim() === '') {
        errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errors.email = 'Invalid email format';
    }

    if (!password || password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Validation for user update data
const validateUserUpdate = ({ name, email, password, bio, phoneNumber, address }) => {
    const errors = {};

    if (name && name.trim() === '') {
        errors.name = 'Name cannot be empty';
    }

    if (email && email.trim() !== '' && !/^\S+@\S+\.\S+$/.test(email)) {
        errors.email = 'Invalid email format';
    }

    if (password && password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }

    if (bio && bio.trim() === '') {
        errors.bio = 'Bio cannot be empty';
    }

    if (phoneNumber && !/^\+?\d+$/.test(phoneNumber)) {
        errors.phoneNumber = 'Invalid phone number';
    }

    if (address && address.trim() === '') {
        errors.address = 'Address cannot be empty';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

module.exports = {
    validateUserRegistration,
    validateUserUpdate
};
