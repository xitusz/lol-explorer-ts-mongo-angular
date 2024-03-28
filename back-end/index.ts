import express from "express";
import cors from "cors";
import routes from "./src/routes";
import errorMiddleware from "./src/middlewares/errorMiddleware";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

app.listen(port);

console.log(`Api rodando na porta ${port}`);

export default app;
