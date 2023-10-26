import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { creteOrder, getAllOrders } from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, creteOrder);

orderRouter.post(
  "/get-orders",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders
);

export default orderRouter;
