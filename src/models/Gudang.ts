import mongoose, { Schema } from "mongoose";
import { Gudang } from "../types";
const GudangSchema: Schema = new mongoose.Schema({
    nama: {type: String, required: true},
    alamat: {type: String, required: true}
})

export const GudangModel = mongoose.model<Gudang>("gudang", GudangSchema)
export const getGudang = ()=> GudangModel.find()
export const getGudangById = (id: string) => GudangModel.findById(id)
export const insertGudang = async (values: Partial<Gudang>): Promise<Gudang | null> => {
    try {
        const Gudang = await GudangModel.create(values);
        return Gudang.toObject();
    } catch (error) {
        console.error("Error creating Gudang:", error);
        return null;
    }
};
export const deleteGudangById = async (id: string): Promise<boolean> => {
    try {
        const deletedGudang = await GudangModel.findByIdAndDelete(id);
        return !!deletedGudang; // Return true if deletedGudang is truthy, false if it is null or undefined
    } catch (error) {
        console.error("Error deleting Gudang:", error);
        return false;
    }
};
export const updateGudangById = async (id: string, values: Partial<Gudang>): Promise<Gudang | null> => {
    try {
        const updatedGudang = await GudangModel.findByIdAndUpdate(id, values, {new: true})
        return updatedGudang?.toObject() || null;
    } catch (error) {
        console.error("Error updating Gudang:", error);
        return null;
    }
}