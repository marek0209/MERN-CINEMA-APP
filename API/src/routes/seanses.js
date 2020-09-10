import { Router } from "express";
import { catchAsync } from "../middlewares/errors";
import jwtAuth from "../middlewares/auth";
import seansesController from "../controllers/seansesController";

export default () => {
  const api = Router();

  // GET /rooms/:slug
  api.get("/:slug", catchAsync(seansesController.findOne));

  // GET /rooms
  api.get("/", catchAsync(seansesController.findAll));

  // POST /rooms
  api.post("/", catchAsync(seansesController.create));

  // PUT /rooms/:slug
  api.put("/:slug", jwtAuth, catchAsync(seansesController.update));

  // DELETE /rooms/:slug
  api.delete("/:slug", jwtAuth, catchAsync(seansesController.remove));

  return api;
};
