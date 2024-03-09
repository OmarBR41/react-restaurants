import { Router } from "express";
import { getPaginatedBusinesses } from "../controllers/businesses.controller";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../lib/constants";

const router = Router();

router.get("/healthcheck", (_, res) => {
  res.status(200).send({
    ok: true,
  });
});

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(String(req.query.limit), 10) || DEFAULT_LIMIT;
    const offset = parseInt(String(req.query.offset), 10) || DEFAULT_OFFSET;

    const businessesResponse = await getPaginatedBusinesses({ limit, offset });

    if (!businessesResponse) {
      res.status(404).send({
        error: "No businesses found",
      });
    }

    res.json(businessesResponse);
  } catch (error) {
    res.send(error);
  }
});

export default router;
