import { Router } from "express";
import { toNum, toStr } from "../../../lib/typeconversion";

import { create, get, get_by_id } from "../../../core/model/post";

export const router = Router();
export default router;

router.get("/", (req, res) => {
    const { page, size }: any = req.query;
    const posts = get(page, size);
    res.send(posts);
});

router.get("/:id", (req, res) => {
    const { id }: any = req.params;
    const post = get_by_id(toNum(id));
    res.send(post);
});

router.post("/", (req, res) => {
    const data: any = req.body;
    const id = toNum(toStr(Math.random()).slice(2));
    create({ ...data, id });
    res.send({ id });
});