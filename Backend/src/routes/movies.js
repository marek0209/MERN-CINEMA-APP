import { Router } from "express";
import { catchAsync } from "../middlewares/errors";
import jwtAuth from "../middlewares/auth";
import moviesController from "../controllers/moviesController";

export default () => {
  const api = Router();

  // GET /movies/:id
  api.get("/:id", catchAsync(moviesController.findOne));

  // GET /movies
  api.get("/", catchAsync(moviesController.findAll));

  // POST /movies
  api.post("/", catchAsync(moviesController.create));

  // PUT /movies/:id
  api.put("/:id", jwtAuth, catchAsync(moviesController.update));

  // DELETE /movies/:id
  api.delete("/:id", jwtAuth, catchAsync(moviesController.remove));

  return api;
};
