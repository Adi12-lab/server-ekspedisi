import { Router } from "express";
import { createGudang, getAllGudang, updateGudang, deleteGudang, findGudang } from "../controllers/GudangController";
import { auth, isAdmin } from "../middleware";

export default (router: Router) => {
  router.use(auth)
    router.get('/gudang/all', getAllGudang);
    router.get("/gudang/find/:id", findGudang)
    router.post('/gudang/create',isAdmin , createGudang);
    router.put("/gudang/update/:id", updateGudang)
    router.delete("/gudang/delete/:id", deleteGudang)
  };
