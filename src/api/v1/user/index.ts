import { Router } from "express";
import { toNum, toStr } from "../../../lib/typeconversion";

import { create, get, get_by_id } from "../../../core/model/user";

export const router = Router();
export default router;

router.get("/", async (req, res) => {
    const { page, size }: any = req.query;
    const users = await get(page, size);
    res.send(users);
});

router.get("/:id", async (req, res) => {
    const { id }: any = req.params;
    const user = await get_by_id(toNum(id));
    res.send(user);
});

router.post("/", async (req, res) => {
    const data: any = req.body;
    const id = toNum(toStr(Math.random()).slice(2));
    await create({ ...data, id });
    res.send({ id });
});