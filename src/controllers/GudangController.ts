import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  getGudang,
  getGudangById,
  insertGudang,
  updateGudangById,
  deleteGudangById,
} from "../models/Gudang";
import { replaceId } from "../helper";

export const getAllGudang = async (req: Request, res: Response) => {
  try {
    const result = await getGudang();
    const gudang = replaceId(result)

    return res.status(200).json(gudang);
  } catch (error) {
    console.log("[GET_GUDANG] " + error);
    return res.sendStatus(400);
  }
};
export const findGudang = async (req: Request, res: Response) => {
  try {
    const {id} = req.params

    if(!id) {
      return res.sendStatus(400)
    }

    const result = await getGudangById(id)
    const gudang = replaceId(result)
    
    return res.status(200).json(gudang).end()
  } catch (error) {
    console.log("[FIND_GUDANG] " + error);
  }
}


export const createGudang = async (req: Request, res: Response) => {
  try {
    const { nama, alamat } = req.body;
    if (!nama || !alamat) {
      return res.sendStatus(400);
    }

    const gudang = await insertGudang({
      nama,
      alamat,
    });

    return res.status(201).json(gudang).end();
  } catch (error) {
    console.log("[POST_GUDANG] " + error);
    return res.sendStatus(400);
  }
};

export const updateGudang = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nama, alamat } = req.body;

    if (!nama || !alamat) {
      return res.sendStatus(400);
    }

    const gudang = await updateGudangById(id, { nama, alamat });

    return res.status(200).json(gudang).end();
  } catch (error) {
    console.log("[PUT_GUDANG] " + error);
    return res.sendStatus(400);
  }
};

export const deleteGudang = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const isDeleted = await deleteGudangById(id);

    return res.status(200).json({ success: isDeleted });
  } catch (error) {
    console.log("[DELETE_GUDANG] " + error);
    return res.sendStatus(400);
  }
};
