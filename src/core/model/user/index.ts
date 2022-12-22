import crypto from "node:crypto";
import { toStr } from "../../../lib/typeconversion";

import { db as database } from "../../../init/database/sqlite";

export interface IPost {
    id: number;
    title: string;
    content: string;
    author: IUser;
}

export interface IUser {
    id: number;
    email: string;
    password: number;
    posts: IPost[];
}

const table = "users";

export async function get(page: number = 0, size: number = 10): Promise<Array<IUser>> {
	const offset = page * size;
	const limit = size;
	return await (await database).all(`SELECT id, email FROM ${table} LIMIT ${offset},${limit}`);
}

export async function get_by_id(id: number): Promise<IUser> {
	return await (await database).get(`SELECT id, email FROM ${table} WHERE id = ${id}`);
}

export async function create(user: IUser): Promise<void | Error> {
	const password = BigInt("0x" + crypto.createHash("sha256").update(toStr(user.password)).digest("hex")).toString(10);
	await (await database).run(`INSERT INTO ${table}(id, email, password) VALUES (${user.id}, '${user.email}', ${password})`);
}