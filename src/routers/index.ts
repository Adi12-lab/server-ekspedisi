import { Router } from "express";
import PengirimRouter from "./PengirimRouter";
import PengirimanRouter from "./PengirimanRouter";
import GudangRouter from "./GudangRouter";
import AuthenticationRouter from "./AuthenticationRouter";
import TrackPengirimanRouter from "./TrackPengirimanRouter";
const router = Router()

export default (): Router => {
    AuthenticationRouter(router)
    GudangRouter(router)
    PengirimRouter(router)
    PengirimanRouter(router)
    TrackPengirimanRouter(router)
    return router
}