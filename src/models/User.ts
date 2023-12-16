import mongoose, { Schema } from "mongoose";
import { RoleEnum, User } from "../types";
import { v4 as uuidv4 } from "uuid";

const UserSchema: Schema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4(),
        index: true,
        unique: true
    },
    username: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String, enum: Object.values(RoleEnum), default: RoleEnum.ROLE_USER ,required: true},
    password: {type: String, select: false}
})

export const UserModel = mongoose.model<User>("User", UserSchema)

export const getUserByUsername = (username: string) => UserModel.findOne({username})
export const getUserById = (id: string) => UserModel.findById(id)
export const createUser = async (values: Partial<User>): Promise<User | null> => {
    try {
        const user = await UserModel.create(values);
        return user.toObject();
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
};