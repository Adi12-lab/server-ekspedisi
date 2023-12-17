import { Router } from "express";
import { getAllPengiriman, findPengiriman, createPengiriman, updatePengiriman, deletePengiriman } from "../controllers/PengirimanController";

export default (router: Router) => {
    router.get('/pengiriman/all', getAllPengiriman);
    router.get("/pengiriman/find/:resi", findPengiriman)
    router.post('/pengiriman/create', createPengiriman);
    router.put("/pengiriman/update/:resi", updatePengiriman)
    router.delete("/pengiriman/delete/:resi", deletePengiriman)
  };
