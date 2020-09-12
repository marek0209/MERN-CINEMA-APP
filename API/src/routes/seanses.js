import { Router } from "express";
import { catchAsync } from "../middlewares/errors";
import jwtAuth from "../middlewares/auth";
import seansesController from "../controllers/seansesController";

export default () => {
  const api = Router();

  // GET /seanses/:id
  api.get("/:id", catchAsync(seansesController.findOne));

  // GET /seanses
  api.get("/", catchAsync(seansesController.findAll));

  // POST /seanses
  api.post("/", catchAsync(seansesController.create));

  // PUT /seanses/:id
  api.put("/:id", jwtAuth, catchAsync(seansesController.update));

  // DELETE /seanses/:id
  api.delete("/:id", jwtAuth, catchAsync(seansesController.remove));

  return api;
};
