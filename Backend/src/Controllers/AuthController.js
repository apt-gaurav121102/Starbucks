import User from "../Models/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

export const Register = async (req, res) => {
    try {
        const { name, phone, email, password, address, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        await User.create({
            name,
            phone,
            email,
            password: hashedPassword,
            address,
            role // optional (schema default = Customer)
        });

        return res.status(201).json({
            message: "User created successfully!"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error!"
        });
    }
};




export const Login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        const isMatch = await bcrypt.compare(password, user.password);

        const Token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

        if (!user) {
            return res.status(401).json({ message: "User does not exist. Please Register" });
        } else {
            if (isMatch) {

                return res.status(200).json({ Token, user, message: "Login Successful" });
            } else {
                return res.status(400).json({ message: "Invalid Credentials" });
            }
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error!"
        });
    }
}