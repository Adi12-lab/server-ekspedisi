import { Request, Response } from "express";
import {
  getPengiriman,
  getPengirimanByResi,
  insertPengiriman,
  updatePengirimanById,
  deletePengirimanById,
  getPengirimanById,
} from "../models/Pengiriman";
import { replaceId } from "../helper";
import { Pengiriman } from "../types";
import { deleteTrackPengirimanByPengirimanId } from "../models/TrackPengiriman";

export const getAllPengiriman = async (req: Request, res: Response) => {
  try {
    const result = await getPengiriman();
    const pengiriman = replaceId(result)
    pengiriman.forEach((item: Pengiriman) => {
      if(item.pengirim._id) {
        item.pengirim.id = item.pengirim._id
      }
    })
    // console.log(pengiriman)
    return res.status(200).json(pengiriman);
  } catch (error) {
    console.log("[GET_Pengiriman] " + error);
    return res.sendStatus(400);
  }
};

export const findPengirimanById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(400);
    }

    const result= await getPengirimanById(id);
    const pengiriman = replaceId(result)
    pengiriman.pengirim.id = pengiriman.pengirim._id
    // pengiriman
    return res.status(200).json(pengiriman).end();
  } catch (error) {
    console.log("[FIND_Pengiriman] " + error);
  }
};

export const findPengirimanByResi = async (req: Request, res: Response) => {
  try {
    const { resi } = req.params;

    if (!resi) {
      return res.sendStatus(400);
    }

    const result= await getPengirimanByResi(resi);
    const pengiriman = replaceId(result)
    pengiriman.pengirim.id = pengiriman.pengirim._id
    // pengiriman
    return res.status(200).json(pengiriman).end();
  } catch (error) {
    console.log("[FIND_Pengiriman] " + error);
  }
};

export const createPengiriman = async (req: Request, res: Response) => {
  try {
    const {
      nama_barang,
      kuantitas,
      berat,
      biaya,
      status,
      pengirim,
      alamat_penerima,
      pesan,
    } = req.body;
    if (
      !nama_barang ||
      !kuantitas ||
      !berat ||
      !biaya ||
      !status ||
      !pengirim ||
      !alamat_penerima ||
      !pesan
    ) {
      return res.sendStatus(400);
    }

    const pengiriman = await insertPengiriman({
      nama_barang,
      kuantitas,
      berat,
      biaya,
      status,
      pengirim: pengirim.id,
      alamat_penerima,
      pesan
    });

    return res.status(201).json(pengiriman).end();
  } catch (error) {
    console.log("[POST_Pengiriman] " + error);
    return res.sendStatus(400);
  }
};

export const updatePengiriman = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      nama_barang,
      kuantitas,
      berat,
      biaya,
      status,
      pengirim,
      alamat_penerima,
      pesan,
      bukti_pengiriman
    } = req.body;

    if (
      !nama_barang ||
      !kuantitas ||
      !berat ||
      !biaya ||
      !status ||
      !pengirim ||
      !alamat_penerima ||
      !pesan
    ) {
      return res.sendStatus(400);
    }

    const pengiriman = await updatePengirimanById(id, {  
      nama_barang,
      kuantitas,
      berat,
      biaya,
      status,
      pengirim: pengirim.id,
      alamat_penerima,
      pesan,
      bukti_pengiriman
     });

    return res.status(200).json(pengiriman).end();
  } catch (error) {
    console.log("[PUT_Pengiriman] " + error);
    return res.sendStatus(400);
  }
};

export const deletePengiriman = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const isDeleteTrack =await deleteTrackPengirimanByPengirimanId(id) //dihapus terlebih dahulu yang berkaitan
    let isDeletedPengiriman = false
    if(isDeleteTrack) {
      isDeletedPengiriman = await deletePengirimanById(id);
    }

    return res.status(200).json({ success: isDeletedPengiriman });
  } catch (error) {
    console.log("[DELETE_Pengiriman] " + error);
    return res.sendStatus(400);
  }
};
