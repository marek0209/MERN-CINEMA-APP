import { Router } from "express";
import AuthController from "../controllers/authController";

export default () => {
  const api = Router();

  api.post("/login", AuthController.login);

  api.post("/register", AuthController.register);

  return api;
};
