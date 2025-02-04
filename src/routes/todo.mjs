import {Router} from "express";
import {prefix} from "../utils/constants.mjs";
const router = Router();

router.use(prefix, router);

router.get("/todos", async (req, res) => {
    res.status(200).send({todos: 'works'});
});

router.post("/todos", async (req, res) => {

});

router.patch("/todo:id", async (req, res) => {

});

router.delete("/todo:id", async (req, res) => {

});

export default router;