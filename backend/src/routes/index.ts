import { Router } from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import secretariaRoutes from "./secretaria.routes";
import setorRoutes from "./setor.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/secretarias", secretariaRoutes);
router.use("/setores", setorRoutes);
router.get("/", (req, res) => {
  res.json({
    status: "online",
    sistema: "SIGTI API",
    versao: "1.0.0"
  });
});

export default router;
