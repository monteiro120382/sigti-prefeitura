import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import routes from "./routes";
import { swaggerSpec } from "./config/swagger";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

// Swagger
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// Rotas da API
app.use(routes);

// Middleware global de tratamento de erros
app.use(errorHandler);

export default app;