import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  getPengiriman,
  getPengirimanByResi,
  insertPengiriman,
  updatePengirimanByResi,
  deletePengirimanByResi,
} from "../models/Pengiriman";
import { replaceId } from "../helper";
import { Pengiriman } from "../types";

export const getAllPengiriman = async (req: Request, res: Response) => {
  try {
    const result = await getPengiriman();
    const pengiriman = replaceId(result)
    pengiriman.forEach((item: Pengiriman) => {
      if(item.pengirim._id) {
        item.pengirim.id = item.pengirim._id
      }
    })
    return res.status(200).json(pengiriman);
  } catch (error) {
    console.log("[GET_Pengiriman] " + error);
    return res.sendStatus(400);
  }
};
export const findPengiriman = async (req: Request, res: Response) => {
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

    const Pengiriman = await insertPengiriman({
      nama_barang,
      kuantitas,
      berat,
      biaya,
      status,
      pengirim,
      alamat_penerima,
      pesan
    });

    return res.status(201).json(Pengiriman).end();
  } catch (error) {
    console.log("[POST_Pengiriman] " + error);
    return res.sendStatus(400);
  }
};

export const updatePengiriman = async (req: Request, res: Response) => {
  try {
    const { resi } = req.params;
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

    const Pengiriman = await updatePengirimanByResi(resi, {  
      nama_barang,
      kuantitas,
      berat,
      biaya,
      status,
      pengirim,
      alamat_penerima,
      pesan,
      bukti_pengiriman
     });

    return res.status(200).json(Pengiriman).end();
  } catch (error) {
    console.log("[PUT_Pengiriman] " + error);
    return res.sendStatus(400);
  }
};

export const deletePengiriman = async (req: Request, res: Response) => {
  try {
    const { resi } = req.params;

    const isDeleted = await deletePengirimanByResi(resi);

    return res.status(200).json({ success: isDeleted });
  } catch (error) {
    console.log("[DELETE_Pengiriman] " + error);
    return res.sendStatus(400);
  }
};
