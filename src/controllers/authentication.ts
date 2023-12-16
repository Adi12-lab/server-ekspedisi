import { Request, Response } from "express";
import bcrypt from "bcrypt"

import { createUser, getUserByUsername } from "../models/User";
import { User } from "../types";
import { comparePassword, generateAccessToken } from "../helper";


export const login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.sendStatus(400);
      }
  
      const user: User = await getUserByUsername(username).select("+password");
  
      if (!user) {
        return res.status(400).send("User belum teregistrasi");
      }
      console.log(user)
      const isPasswordMatch = await comparePassword(password, user.password);
      //cek password apakah sesuai
      if(!isPasswordMatch) {
        res.status(401).send("Password salah");
      }

      //buat payloadnya
      const payload = {
        username: user.username,
        email: user.email,
        role: user.role,
        accessToken: generateAccessToken(user)
      }
  
      return res.status(200).json(payload).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

export const register = async (req: Request, res: Response) => {
    try {
      const { email, password, username } = req.body;
  
      if (!email || !password || !username) {
        return res.sendStatus(400);
      }
  
      const existingUser = await getUserByUsername(username);
    
      if (existingUser) {
        return res.sendStatus(400);
      }
      const hashedPassword = await bcrypt.hash(password, 10) //berapa laam mengenkripsi
      const user = await createUser({
        email,
        username,
        password: hashedPassword
      })

      return res.status(200).json(user).end();
    } catch (error) {
      console.log(`[REGISTER] ${error}`);
      return res.sendStatus(400);
    }
  }