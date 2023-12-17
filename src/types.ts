import { Document } from "mongoose";
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

export type StatusPengiriman = "BELUM_DIANGKUT" | "DALAM_PENGIRIMAN" | "TERKIRIM" | "DIBATALKAN";

export interface Pengiriman extends Document {
    resi: string;
    nama_barang: string;
    kuantitas: number;
    berat: number;
    biaya: number;
    status: StatusPengiriman;
    pengirim: Pengirim;
    alamat_penerima: string;
    bukti_pengiriman: string;
    pesan: string;
}


export interface TrackPengiriman extends Document {
    resi: string;
    gudang: Gudang,
    pengiriman: Pengiriman
    tanggal_sampai: Date,
    keterangan: string,
}


