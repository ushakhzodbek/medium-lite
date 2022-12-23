import { Router } from "express";
import jwt from "jsonwebtoken";
import { toNum, toStr } from "../../../lib/typeconversion";

import * as config from "../../../init/config";

import { create, get, get_by_id, check } from "../../../core/model/user";
import { get_all_posts_rating_by_user_id, get_by_user_id } from "../../../core/model/post";

export const router = Router();
export default router;

router.get("/", async (req, res) => {
	const { page, size }: any = req.query;
	const users = await get(page, size);
	const result = users.map(async user => ({ ...user, ...await get_all_posts_rating_by_user_id(user.id) }));
	res.send(await Promise.all(result));
});

router.get("/:id", async (req, res) => {
	const { id }: any = req.params;
	const user = await get_by_id(toNum(id));
	const { rating } = await get_all_posts_rating_by_user_id(toNum(id));
	const posts = await get_by_user_id(toNum(id));
	res.send({ ...user, rating, posts });
});

router.post("/", async (req, res) => {
	const data: any = req.body;
	const id = toNum(toStr(Math.random()).slice(2));
	await create({ ...data, id });
	res.send({ id });
});

router.post("/auth", async (req, res) => {
	const { email, password }: any = req.body;
	const { id } = await check(email, password);
	const access_token = jwt.sign({ user_id: id }, config.jwt.secret, { expiresIn: "1800s" });
	res.send({ access_token });
});