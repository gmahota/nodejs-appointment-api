import { Router, Request, Response } from "express";
import authMiddleware from "./middlewares/auth";

import MpesaController from "./controllers/MpesaController";
import FlippingBook from "./services/book/publication";

import {
  get_all_users,
  get_user,
  create_user,
  delete_user,
} from "./controllers/admin/userController";

import AuthController from "./controllers/admin/authController";

import {
  get_all_journals,
  get_journal,
  create_journal,
  delete_journal,
  update_price
} from "./controllers/book/journalController";

import {
  get_all_publications,
  get_publication,
  create_Publication
} from "./controllers/book/publicationController";

import {
  get_all_orders,
  get_order,
  create_order
} from "./controllers/sales/orderController";

import {
  get_all_payments,
  get_payment,
  create_payment
} from "./controllers/sales/paymentController";

import {
  get_all_customers,
  get_customer,
  create_customer,
  get_customer_publication
} from "./controllers/base/customerController";

const routes = Router();

routes.get("/", async (request: Request, response: Response) => {
  response.send("WellCome!");
});

routes.get("/mpesa/receivemoney", MpesaController.receiveMoney);

routes
  .get("/api/users", get_all_users)
  .get("/api/users/:id", get_user)
  .post("/api/users", create_user)
  .delete("/api/users/:id", delete_user)

  .post("/api/auth/login", AuthController.login)
  .get("/api/auth/guest", AuthController.guest)
  .get("/api/auth/auth", authMiddleware, AuthController.auth)
  
  .get("/api/journals", get_all_journals)
  .get("/api/journals/:id", get_journal)
  .post("/api/journals", create_journal)
  .post("/api/journals/:id/newprice/:price", update_price)
  .delete("/api/journals/:id", delete_journal)

  .get("/api/publications", get_all_publications)
  .get("/api/publications/:id", get_publication)
  .get("/api/flippingBook/",create_Publication)

  .get("/api/orders", get_all_orders)
  .get("/api/orders/:id", get_order)
  .post("/api/orders/",create_order)

  .get("/api/payments", get_all_payments)
  .get("/api/payments/:id", get_payment)
  .post("/api/payments/",create_payment)

  .get("/api/customer", get_all_customers)
  .get("/api/customer/:phonenumber", get_customer)
  .get("/api/customer/:phonenumber/publications",get_customer_publication)
  .post("/api/customer/",create_customer)
  
export default routes;
