import { Router } from "express";
import {
  getAllPengiriman,
  findPengirimanByResi,
  createPengiriman,
  updatePengiriman,
  deletePengiriman,
  findPengirimanById,
} from "../controllers/PengirimanController";

export default (router: Router) => {
  router.get("/pengiriman/all", getAllPengiriman);
  router.get("/pengiriman/find-by-id/:id", findPengirimanById);
  router.get("/pengiriman/find-by-resi/:resi", findPengirimanByResi);
  router.post("/pengiriman/create", createPengiriman);
  router.put("/pengiriman/update/:id", updatePengiriman);
  router.delete("/pengiriman/delete/:id", deletePengiriman);
};
