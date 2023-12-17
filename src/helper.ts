import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { Document } from "mongoose";

import { User } from "./types";

export async function comparePassword(password: string, hashedPassword: string) {
    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
}

export function generateAccessToken(user: User) {
    const {username, email, role} = user
    const payloadUser = {username, email, role}
    return "Bearer "+ jwt.sign(payloadUser, process.env.SECRET_KEY, { expiresIn: '1h' })
}

export function generateJNTResiNumber() {
    const length = 12; // Panjang nomor resi
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Karakter yang digunakan
    let randomResi = '';
  
    // Menggunakan Math.random() untuk menghasilkan nomor resi secara acak
    for (let i = 0; i < length; i++) {
      // Mendapatkan karakter secara acak dari characters dan menambahkannya ke nomor resi
      const index = Math.floor(Math.random() * characters.length);
      randomResi += characters.charAt(index);
    }
  
    return randomResi;
  }
  
  export function replaceId(data: Document | Document[]) {
    if (Array.isArray(data)) {
      // If data is an array
      return data.map((item) => {
        const { _id, ...rest } = item.toObject();
        return { id: _id, ...rest };
      });
    } else {
      // If data is a single object
      const { _id, ...rest } = data.toObject();
      return { id: _id, ...rest };
    }
  }
  

  // function replaceId(data) {
  //   if (Array.isArray(data)) {
  //     return data.map((item) => {
  //       const { _id, ...rest } = item;
  //       return { ...rest };
  //     });
  //   } else {
  //     const { _id, ...rest } = data;
  //     return { ...rest };
  //   }
  // }