import { Request, Response } from "express";
import {
  getTrackPengiriman,
  getTrackPengirimanByResi,
  getTrackPengirimanById,
  insertTrackPengiriman,
  updateTrackPengirimanById,
  deleteTrackPengirimanById,
} from "../models/TrackPengiriman";
import { replaceId } from "../helper";
import { TrackPengiriman } from "../types";

export const getAllTrackPengiriman = async (req: Request, res: Response) => {
  try {
    const result = await getTrackPengiriman()
    const trackPengiriman = replaceId(result)
    trackPengiriman.forEach((item: TrackPengiriman) => {
      if(item.gudang._id) {
        item.gudang.id = item.gudang._id
      }
      if(item.pengiriman._id) {
        item.pengiriman.id = item.pengiriman._id
      }
    })
    return res.status(200).json(trackPengiriman)
  } catch(error) {
    console.log("[GET_TrackPengiriman] " + error);
    return res.sendStatus(400);
  }
}

export const getTrackResi = async (req: Request, res: Response) => {
  try {
    const {resi} = req.params
    const result = await getTrackPengirimanByResi(resi);
    const trackPengiriman = replaceId(result)
    trackPengiriman.forEach((item: TrackPengiriman) => {
      if(item.gudang._id) {
        item.gudang.id = item.gudang._id
      }
      if(item.pengiriman._id) {
        item.pengiriman.id = item.pengiriman._id
      }
    })
    return res.status(200).json(trackPengiriman);
  } catch (error) {
    console.log("[GET_TrackPengiriman] " + error);
    return res.sendStatus(400);
  }
};
export const findTrackPengiriman = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(400);
    }

    const result = await getTrackPengirimanById(id);
    const trackPengiriman = replaceId(result)
    trackPengiriman.pengirim.id = trackPengiriman.pengirim._id
    trackPengiriman.gudang.id = trackPengiriman.gudang._id
    // TrackPengiriman
    return res.status(200).json(trackPengiriman).end();
  } catch (error) {
    console.log("[FIND_TrackPengiriman] " + error);
  }
};

export const createTrackPengiriman = async (req: Request, res: Response) => {
  try {
    const {
      gudang,
      tanggal_sampai,
      pengiriman,
      keterangan //gak wajib
      
    } = req.body;
    if (
      !gudang ||
      !tanggal_sampai ||
      !pengiriman
    ) {
      return res.sendStatus(400);
    }

    const trackPengiriman = await insertTrackPengiriman({
      gudang: gudang.id,
      tanggal_sampai: new Date(tanggal_sampai),
      pengiriman: pengiriman.id,
      keterangan
    });

    return res.status(201).json(trackPengiriman).end();
  } catch (error) {
    console.log("[POST_TrackPengiriman] " + error);
    return res.sendStatus(400);
  }
};

export const updateTrackPengiriman = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
        gudang,
        tanggal_sampai,
        pengiriman,
        keterangan //gak wajib
    } = req.body;

    if (
        !gudang ||
        !tanggal_sampai ||
        !pengiriman
    ) {
      return res.sendStatus(400);
    }

    const trackPengiriman = await updateTrackPengirimanById(id, {  
        gudang: gudang.id,
        tanggal_sampai,
        pengiriman: pengiriman.id,
        keterangan //gak wajib
     });

    return res.status(200).json(trackPengiriman).end();
  } catch (error) {
    console.log("[PUT_TrackPengiriman] " + error);
    return res.sendStatus(400);
  }
};

export const deleteTrackPengiriman = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const isDeleted = await deleteTrackPengirimanById(id);

    return res.status(200).json({ success: isDeleted });
  } catch (error) {
    console.log("[DELETE_TrackPengiriman] " + error);
    return res.sendStatus(400);
  }
};
