import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  getGudang,
  getGudangById,
  insertGudang,
  updateGudangById,
  deleteGudangById,
} from "../models/Gudang";

export const getAllGudang = async (req: Request, res: Response) => {
  try {
    const gudang = await getGudang();

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

    const gudang = await getGudangById(id)
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
      id: uuidv4(),
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
