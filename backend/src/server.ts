import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";

import { PORT } from "./lib/constants";

export const server = async () => {
  const app = express();

  app.set("port", PORT);
  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());
  app.use(cors());

  app.get("/healthcheck", (_, res) => {
    res.status(200).send({
      ok: true,
    });
  });

  const server = createServer(app);
  server.listen(app.get("port"), () =>
    console.log(`Server listening on port ${app.get("port")}`)
  );
};