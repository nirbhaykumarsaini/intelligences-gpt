const validator = require("validator");



 const passwordOptions = {
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,  
    minNumbers: 1,
    minSymbols: 0,    
};

const validateSignUpData = (req) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const error = new Error("All fields are required");
        error.statusCode = 400;
        throw error;
    }

    if (typeof name !== "string" || name.trim().length < 2) {
        const error = new Error("Name must be at least 2 characters");
        error.statusCode = 400;
        throw error;
    }

    if (!validator.isEmail(email)) {
        const error = new Error("Invalid email format");
        error.statusCode = 400;
        throw error;
    }

    if (!validator.isStrongPassword(password, passwordOptions)) {
        const error = new Error("Password must be at least 6 characters with at least one number");
        error.statusCode = 400;
        throw error;
    }
};


const validateSignInData = (req) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Error("Email and password are required");
        error.statusCode = 400;
        throw error;
    }

    if (!validator.isEmail(email)) {
        const error = new Error("Invalid email format");
        error.statusCode = 400;
        throw error;
    }
    if (!validator.isStrongPassword(password, passwordOptions)) {
        const error = new Error("Password must be at least 6 characters with at least one number");
        error.statusCode = 400;
        throw error;
    }
};

module.exports = { validateSignUpData, validateSignInData };
