import { Router } from "express";
import { createPengirim, getAllPengirim, updatePengirim, deletePengirim, findPengirim } from "../controllers/PengirimController";

export default (router: Router) => {
    router.get('/pengirim/all', getAllPengirim);
    router.get("/pengirim/find/:id", findPengirim)
    router.post('/pengirim/create', createPengirim);
    router.put("/pengirim/update/:id", updatePengirim)
    router.delete("/pengirim/delete/:id", deletePengirim)
  };
