import { Router } from "express";
import {
  getAllTrackPengiriman,
  createTrackPengiriman,
  getTrackResi,
  findTrackPengiriman,
  deleteTrackPengiriman,
  updateTrackPengiriman,
} from "../controllers/TrackPengirimanController";
import { auth } from "../middleware";

export default (router: Router) => {
  router.use(auth)
  router.get("/track-pengiriman/all", getAllTrackPengiriman);
  router.get("/track-pengiriman/find-by-resi/:resi", getTrackResi);
  router.get("/track-pengiriman/find-by-id/:id", findTrackPengiriman);
  router.post("/track-pengiriman/create", createTrackPengiriman);
  router.put("/track-pengiriman/update/:id", updateTrackPengiriman);
  router.delete("/track-pengiriman/delete/:id", deleteTrackPengiriman);
};
