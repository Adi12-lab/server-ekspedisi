import { Router } from "express";
import PengirimRouter from "./PengirimRouter";
import PengirimanRouter from "./PengirimanRouter";
import GudangRouter from "./GudangRouter";
import AuthenticationRouter from "./AuthenticationRouter";
const router = Router()

export default (): Router => {
    AuthenticationRouter(router)
    GudangRouter(router)
    PengirimRouter(router)
    PengirimanRouter(router)
    return router
}