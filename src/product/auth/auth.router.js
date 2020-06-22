import express from "express";
import authController from "./auth.contorller";
import authSchema from "./valid/auth.schema";

const router = express.Router();

router.post(
  "/auth",
  authSchema.createAccessToken,
  authController.createAccessToken
);

module.exports = router;
