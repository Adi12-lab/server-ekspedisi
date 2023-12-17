import mongoose, { Schema } from "mongoose";
import { TrackPengiriman } from "../types";
import { PengirimanModel } from "./Pengiriman";

const TrackPengirimanSchema: Schema = new mongoose.Schema<TrackPengiriman>({
    gudang: {
        type: Schema.Types.ObjectId,
        ref:"gudang",
        required: true
    },
    pengiriman: {
        type: Schema.Types.ObjectId,
        ref:"pengiriman",
        required: true
    },
    tanggal_sampai: {type: Date, required: true},
    keterangan: {type: String, required: false}
    
})

export const TrackPengirimanModel = mongoose.model<TrackPengiriman>("trackpengiriman", TrackPengirimanSchema)
export const getTrackPengiriman = ()=> TrackPengirimanModel.find().populate("gudang").populate("pengiriman")
export const getTrackPengirimanByResi = async (resi: string) => {
    // First find the pengiriman document with the matching resi
    const pengiriman = await PengirimanModel.findOne({ resi: resi });
    if (!pengiriman) {
      // No matching pengiriman found, return null or handle this case as you see fit
      return null;
    }
  
    // Then find the TrackPengiriman documents with the matching pengiriman ObjectId
    return TrackPengirimanModel.find({ pengiriman: pengiriman._id }).populate("gudang").populate("pengiriman");
  };
export const getTrackPengirimanById = (id: string) => TrackPengirimanModel.findById(id).populate("gudang").populate("pengiriman")
export const insertTrackPengiriman = async (values: Partial<TrackPengiriman>): Promise<TrackPengiriman | null> => {
    try {
        const trackPengiriman = await TrackPengirimanModel.create(values);
        return trackPengiriman.toObject();
    } catch (error) {
        console.error("Error creating Track Pengiriman:", error);
        return null;
    }
};
export const deleteTrackPengirimanById = async (id: string): Promise<boolean> => {
    try {
        const deleteTrackPengiriman = await TrackPengirimanModel.findByIdAndDelete(id );
        return !!deleteTrackPengiriman; // Return true if deletedPengiriman is truthy, false if it is null or undefined
    } catch (error) {
        console.error("Error deleting Track Pengiriman:", error);
        return false;
    }
};

export const deleteTrackPengirimanByPengirimanId = async (idPengiriman: string): Promise<boolean> => {
    try {
        const deleteTrackPengiriman = await TrackPengirimanModel.findOneAndDelete({pengiriman: idPengiriman});
        return !!deleteTrackPengiriman; // Return true if deletedPengiriman is truthy, false if it is null or undefined
    } catch (error) {
        console.error("Error deleting Track Pengiriman:", error);
        return false;
    }
};

export const updateTrackPengirimanById = async (id: string, values: Partial<TrackPengiriman>): Promise<TrackPengiriman | null> => {
    try {
        const updatedTrackPengiriman = await TrackPengirimanModel.findByIdAndUpdate(id, values, {new: true})
        return updatedTrackPengiriman?.toObject() || null;
    } catch (error) {
        console.error("Error updating Track Pengiriman:", error);
        return null;
    }
}