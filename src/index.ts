import "dotenv/config";
import Express from "express";
import { cleanEnv, str, port } from "envalid";

import { router } from "./routes";

cleanEnv(process.env, {
  PORT: port(),
  OPENAI_API_KEY: str(),
});

const app = Express();

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
