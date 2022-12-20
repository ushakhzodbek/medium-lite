import { Router } from "express";
import { toNum, toStr } from "../../../lib/typeconversion";

import { create, get, get_by_id } from "../../../core/model/user";

export const router = Router();
export default router;

router.get("/", (req, res) => {
    const { page, size }: any = req.query;
    const users = get(page, size);
    res.send(users);
});

router.get("/:id", (req, res) => {
    const { id }: any = req.params;
    const user = get_by_id(toNum(id));
    res.send(user);
});

router.post("/", (req, res) => {
    const data: any = req.body;
    const id = toNum(toStr(Math.random()).slice(2));
    create({ ...data, id });
    res.send({ id });
});