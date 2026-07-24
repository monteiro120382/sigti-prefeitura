import { Router } from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import secretariaRoutes from "./secretaria.routes";
import setorRoutes from "./setor.routes";
import funcionarioRoutes from "./funcionario.routes";
import equipamentoRoutes from "./equipamento.routes";
import chamadoRoutes from "./chamado.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/secretarias", secretariaRoutes);
router.use("/setores", setorRoutes);
router.use("/funcionarios", funcionarioRoutes);
router.use("/equipamentos", equipamentoRoutes);
router.use("/chamados", chamadoRoutes);

router.get("/", (req, res) => {
  res.json({
    status: "online",
    sistema: "SIGTI API",
    versao: "1.0.0"
  });
});

export default router;