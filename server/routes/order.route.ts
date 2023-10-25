import express from "express";
import { isAuthenticated } from "../middleware/auth";
import { creteOrder } from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, creteOrder);

export default orderRouter;
