import { Router } from "express";
import { toNum, toStr } from "../../../lib/typeconversion";

import { create, get, get_by_id } from "../../../core/model/user";
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