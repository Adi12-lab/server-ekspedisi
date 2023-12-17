import mongoose, { Schema } from "mongoose";
import { Pengiriman } from "../types";
import { generateJNTResiNumber } from "../helper";
const PengirimanSchema: Schema = new mongoose.Schema<Pengiriman>({
    resi: {
        type: String,
        default: generateJNTResiNumber(),
        index: true,
        unique: true
    },
    nama_barang: {type: String, required: true},
    berat: {type: Number, required: true},
    kuantitas: {type: Number, required: true},
    biaya: {type: Number, required: true},
    status: {type: String, required: true},
    pengirim: {
        type: Schema.Types.ObjectId,
        ref:"pengirim",
        required: true
    },
    pesan: {type: String, required: false},
    bukti_pengiriman: {type: String, required: false}
    
})

export const PengirimanModel = mongoose.model<Pengiriman>("pengiriman", PengirimanSchema)
export const getPengiriman = ()=> PengirimanModel.find().populate("pengirim")
export const getPengirimanByResi = (resi: string) => PengirimanModel.findOne({resi}).populate("pengirim")
export const insertPengiriman = async (values: Partial<Pengiriman>): Promise<Pengiriman | null> => {
    try {
        const Pengiriman = await PengirimanModel.create(values);
        return Pengiriman.toObject();
    } catch (error) {
        console.error("Error creating Pengiriman:", error);
        return null;
    }
};
export const deletePengirimanByResi = async (id: string): Promise<boolean> => {
    try {
        const deletedPengiriman = await PengirimanModel.findByIdAndDelete(id );
        return !!deletedPengiriman; // Return true if deletedPengiriman is truthy, false if it is null or undefined
    } catch (error) {
        console.error("Error deleting Pengiriman:", error);
        return false;
    }
};
export const updatePengirimanByResi = async (resi: string, values: Partial<Pengiriman>): Promise<Pengiriman | null> => {
    try {
        const updatedPengiriman = await PengirimanModel.findOneAndUpdate({resi}, values, {new: true})
        return updatedPengiriman?.toObject() || null;
    } catch (error) {
        console.error("Error updating Pengiriman:", error);
        return null;
    }
}