const logger = require("../config/winston");
const User = require("../models/User");
const { validateSignUpData, validateSignInData } = require("../utils/validation");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
    //Using Try...Catch error handling
    try {
        validateSignUpData(req);
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("Email already exists");
            error.statusCode = 400;
            throw error;
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: passwordHash });
        await user.save();
        
        res.status(201).json({ message: "User created successfully!", user });
    } catch (err) {
        // error handling middleware 
        next(err);
    }
};

exports.signin = async (req, res, next) => {
    try {
        validateSignInData(req);
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        next(err);
    }
};