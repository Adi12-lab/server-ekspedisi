import mongoose, { Schema } from "mongoose";
import { Pengirim } from "../types";
import { v4 as uuidv4 } from "uuid";
const PengirimSchema: Schema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4(),
        index: true,
        unique: true
    },
    nama: {type: String, required: true},
    email: {type: String, required: true},
    telepon: {type: String, required: true},
    alamat: {type: String, required: true}
})

export const PengirimModel = mongoose.model<Pengirim>("Pengirim", PengirimSchema)
export const getPengirim = ()=> PengirimModel.find()
export const getPengirimById = (id: string) => PengirimModel.findOne({id})
export const insertPengirim = async (values: Partial<Pengirim>): Promise<Pengirim | null> => {
    try {
        const Pengirim = await PengirimModel.create(values);
        return Pengirim.toObject();
    } catch (error) {
        console.error("Error creating Pengirim:", error);
        return null;
    }
};
export const deletePengirimById = async (id: string): Promise<boolean> => {
    try {
        const deletedPengirim = await PengirimModel.findOneAndDelete({ id });
        return !!deletedPengirim; // Return true if deletedPengirim is truthy, false if it is null or undefined
    } catch (error) {
        console.error("Error deleting Pengirim:", error);
        return false;
    }
};
export const updatePengirimById = async (id: string, values: Partial<Pengirim>): Promise<Pengirim | null> => {
    try {
        const updatedPengirim = await PengirimModel.findOneAndUpdate({id}, values, {new: true})
        return updatedPengirim?.toObject() || null;
    } catch (error) {
        console.error("Error updating Pengirim:", error);
        return null;
    }
}