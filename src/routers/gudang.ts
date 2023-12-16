import { Router } from "express";
import { createGudang, getAllGudang, updateGudang, deleteGudang, findGudang } from "../controllers/gudang";

export default (router: Router) => {
    router.get('/gudang/all', getAllGudang);
    router.get("/gudang/find/:id", findGudang)
    router.post('/gudang/create', createGudang);
    router.put("/gudang/update/:id", updateGudang)
    router.delete("/gudang/delete/:id", deleteGudang)
  };
