import { Router } from "express";
import PostRoutes from "./PostRoutes";

const router: Router = Router();

const url_prefix = "/genix/v1";

router.use(`${url_prefix}/post`, new PostRoutes().getRouter());
router.use(`${url_prefix}/user`, new UserRoutes().getRouter());

export default router;
