import Router from "koa-router";
import personalDataRouter from "./personalData.route.js"
import listsRouter from "./lists.router.js"

const router = new Router();
router.use("/api",personalDataRouter.routes());
router.use("/api",listsRouter.routes());

export default router;