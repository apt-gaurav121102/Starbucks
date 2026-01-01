import User from "../Models/UserSchema.js";
import bcrypt from "bcryptjs";

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
