import express from "express";
import db from "./src/database/models";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Api rodando na porta ${port}`);
  });
});

export default app;
