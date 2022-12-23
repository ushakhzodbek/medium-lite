import { Router } from "express";
import { expressjwt as jwt, Request as JWTRequest } from "express-jwt";
import { toNum, toStr } from "../../../lib/typeconversion";

import * as config from "../../../init/config";

import { create, get, get_by_id, add_rate, get_by_user_id } from "../../../core/model/post";

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

router.post("/", jwt({ secret: config.jwt.secret, algorithms: ["HS256"] }), async (req: JWTRequest, res) => {
	if (!req.auth.user_id) return res.sendStatus(401);
	const data: any = req.body;
	const id = toNum(toStr(Math.random()).slice(2));
	const user_id = toNum(req.auth.user_id);
	await create({ ...data, author: user_id, id });
	res.send({ id });
});

router.post("/rate/:id", async (req, res) => {
	const { id }: any = req.params;
	const { rate_value }: any = req.body;
	await add_rate(toNum(id), toNum(rate_value));
});

router.get("/byuser/:user_id", async (req, res) => {
	const { user_id }: any = req.params;
	const { page, size }: any = req.query;
	const posts = await get_by_user_id(toNum(user_id), page, size);
	res.send(posts);
});