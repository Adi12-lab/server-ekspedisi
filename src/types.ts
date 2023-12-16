export enum RoleEnum {
    ROLE_USER = "ROLE_USER",
    ROLE_ADMIN = "ROLE_ADMIN"
}

export interface User extends Document {
    id: string;
    username: string;
    email: string;
    role: RoleEnum;
    password: string;
}

export interface Gudang extends Document {
    id: string;
    nama: string;
    alamat: string;
}

export interface Pengirim extends Document {
    id: string;
    nama: string;
    email: string;
    telepon: string;
    alamat: string;
}



