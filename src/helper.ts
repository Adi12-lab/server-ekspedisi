import bcrypt from "bcrypt"
import { User } from "./types";
import jwt from "jsonwebtoken";
export async function comparePassword(password: string, hashedPassword: string) {
    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
}

export function generateAccessToken(user: User) {
    const {username, email, role} = user
    const payloadUser = {username, email, role}
    return "Bearer "+ jwt.sign(payloadUser, process.env.SECRET_KEY, { expiresIn: '1h' })
}
