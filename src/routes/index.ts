import { Router } from "express";
import PostRoutes from "./PostRoutes";
import UserRoutes from "./UserRoutes";
import LikeRoutes from "./LikeRoutes";
import FriendRoutes from "./FriendRoutes";

const router: Router = Router();

const url_prefix = "/genix/v1";

router.use(`${url_prefix}/post`, new PostRoutes().getRouter());
router.use(`${url_prefix}/user`, new UserRoutes().getRouter());
router.use(`${url_prefix}/like`, new LikeRoutes().getRouter());
router.use(`${url_prefix}/friend`, new FriendRoutes().getRouter());

export default router;
