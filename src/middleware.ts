import { NextFunction, Request, Response } from "express";
import {merge, get} from "lodash"
import jwt from "jsonwebtoken"
import { RoleEnum } from "./types";


export function auth(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization 
        const token = authHeader && authHeader.split(' ')[1]
        if(!token) {
            return res.status(403).send("Harap login dulu")
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        merge(req, {identity: decoded})

        return next()
    } catch (error) {
        console.log("[AUTH] "+error)
        return res.sendStatus(400)
    }
}


export async function isAdmin(req: Request, res: Response, next: NextFunction){
    try {
        const adminRole = get(req, 'identity.role')

        if(adminRole !== RoleEnum.ROLE_ADMIN) {
            return res.sendStatus(403)
        }
        
       return next()
        
    } catch(error) {
        console.log("[CHECK_ADMIN] "+ error)
        return res.sendStatus(400)
    }

}


