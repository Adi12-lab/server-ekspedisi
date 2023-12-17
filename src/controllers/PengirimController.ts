import { Request, Response } from "express";
import {
  getPengirim,
  getPengirimById,
  insertPengirim,
  updatePengirimById,
  deletePengirimById,
} from "../models/Pengirim";
import { replaceId } from "../helper";

export const getAllPengirim = async (req: Request, res: Response) => {
  try {
    const result = await getPengirim();
    const pengirim = replaceId(result)

    return res.status(200).json(pengirim);
  } catch (error) {
    console.log("[GET_Pengirim] " + error);
    return res.sendStatus(400);
  }
};

export const findPengirim = async (req: Request, res: Response) => {
  try {
    const {id} = req.params

    if(!id) {
      return res.sendStatus(400)
    }

    const result = await getPengirimById(id)
    const pengirim = replaceId(result)

    return res.status(200).json(pengirim).end()
  } catch (error) {
    console.log("[FIND_GUDANG] " + error);
  }
}


export const createPengirim = async (req: Request, res: Response) => {
  try {
    const { nama,email, telepon ,alamat } = req.body;
    if (!nama || !alamat) {
      return res.sendStatus(400);
    }

    const pengirim = await insertPengirim({
      nama,
      email,
      telepon,
      alamat,
    });

    return res.status(201).json(pengirim).end();
  } catch (error) {
    console.log("[POST_Pengirim] " + error);
    return res.sendStatus(400);
  }
};

export const updatePengirim = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nama,email, telepon, alamat } = req.body;

    if (!nama || !alamat || !email || !telepon) {
      return res.sendStatus(400);
    }

    const pengirim = await updatePengirimById(id, { nama,email, telepon ,alamat });

    return res.status(200).json(pengirim).end();
  } catch (error) {
    console.log("[PUT_Pengirim] " + error);
    return res.sendStatus(400);
  }
};

export const deletePengirim = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const isDeleted = await deletePengirimById(id);

    return res.status(200).json({ success: isDeleted });
  } catch (error) {
    console.log("[DELETE_Pengirim] " + error);
    return res.sendStatus(400);
  }
};
