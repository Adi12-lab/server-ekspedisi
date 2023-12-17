import mongoose, { Schema } from "mongoose";
import { RoleEnum, User } from "../types";


const UserSchema: Schema = new mongoose.Schema<User>({
    username: {type: String, required: true, index: true, unique: true},
    email: {type: String, required: true},
    role: {type: String, enum: Object.values(RoleEnum), default: RoleEnum.ROLE_USER},
    password: {type: String, select: false}
})

export const UserModel = mongoose.model<User>("user", UserSchema)

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