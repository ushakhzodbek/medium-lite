import { Router } from "express";
import { toNum, toStr } from "../../../lib/typeconversion";

import { create, get, get_by_id, add_rate } from "../../../core/model/post";

export const router = Router();
export default router;

router.get("/", async (req, res) => {
	const { page, size }: any = req.query;
	const posts = await get(page, size);
	res.send(posts);
});

router.get("/:id", async (req, res) => {
	const { id }: any = req.params;
	const post = await get_by_id(toNum(id));
	res.send(post);
});

router.post("/", async (req, res) => {
	const data: any = req.body;
	const id = toNum(toStr(Math.random()).slice(2));
	await create({ ...data, id });
	res.send({ id });
});

router.post("/rate/:id", async (req, res) => {
	const { id }: any = req.params;
	const { rate_value }: any = req.body;
	await add_rate(toNum(id), toNum(rate_value));
});