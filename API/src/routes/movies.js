import { Router } from "express";
import { catchAsync } from "../middlewares/errors";
import jwtAuth from "../middlewares/auth";
import moviesController from "../controllers/moviesController";

export default () => {
  const api = Router();

  // GET /rooms/:slug
  api.get("/:slug", catchAsync(moviesController.findOne));

  // GET /rooms
  api.get("/", catchAsync(moviesController.findAll));

  // POST /rooms
  api.post("/", catchAsync(moviesController.create));

  // PUT /rooms/:slug
  api.put("/:slug", jwtAuth, catchAsync(moviesController.update));

  // DELETE /rooms/:slug
  api.delete("/:slug", jwtAuth, catchAsync(moviesController.remove));

  return api;
};
