import { Router } from "express";
import authentication from './authentication';
import gudang from "./gudang";
import pengirim from "./pengirim";
const router = Router()

export default (): Router => {
    authentication(router)
    gudang(router)
    pengirim(router)
    return router
}