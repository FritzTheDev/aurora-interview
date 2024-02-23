import "dotenv/config";
import Express from "express";
import { cleanEnv, str, port } from "envalid";

cleanEnv(process.env, {
  PORT: port({ default: 4200 }),
  OPENAI_API_KEY: str(),
});

const app = Express();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
