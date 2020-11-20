import { Router } from "express";
import { catchAsync } from "../middlewares/errors";
import jwtAuth from "../middlewares/auth";
import roomsController from "../controllers/roomsController";

export default () => {
  const api = Router();

  // GET /rooms/:slug
  api.get("/:slug", catchAsync(roomsController.findOne));

  // GET /rooms
  api.get("/", catchAsync(roomsController.findAll));

  // POST /rooms
  api.post("/", jwtAuth, catchAsync(roomsController.create));

  // PUT /rooms/:slug
  api.put("/:slug", jwtAuth, catchAsync(roomsController.update));

  // DELETE /rooms/:slug
  api.delete("/:slug", jwtAuth, catchAsync(roomsController.remove));

  return api;
};
