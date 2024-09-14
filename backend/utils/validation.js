const validateUserRegistration = (userData) => {
    const errors = [];
    if (!userData.username || userData.username.length < 3) errors.push('Username must be at least 3 characters long');
    if (!userData.email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[A-Z|a-z]{2,7}$/.test(userData.email)) errors.push('Invalid email');
    if (!userData.password || userData.password.length < 6) errors.push('Password must be at least 6 characters long');
    if (!['admin', 'donor', 'recipient'].includes(userData.role)) errors.push('Invalid role');

    return { isValid: errors.length === 0, errors };
};

const validateUserUpdate = (userData) => {
    const errors = [];
    if (userData.username && userData.username.length < 3) errors.push('Username must be at least 3 characters long');
    if (userData.email && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[A-Z|a-z]{2,7}$/.test(userData.email)) errors.push('Invalid email');
    if (userData.password && userData.password.length < 6) errors.push('Password must be at least 6 characters long');
    
    return { isValid: errors.length === 0, errors };
};

module.exports = {
    validateUserRegistration,
    validateUserUpdate
};
