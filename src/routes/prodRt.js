import express from "express";
import { PROD } from "../controllers/prodCon.js";

export const prodRt = express.Router();
    prodRt.get("/", PROD.All);
    prodRt.get("/:id", PROD.One);
    


