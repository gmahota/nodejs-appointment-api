import { Request, Response } from "express";
import orderService from "../../services/sales/order";
import Order from "../../models/sales/order";
import publicationService from '../../services/book/publication'
import Publication from '../../models/book/publication';

export const get_all_orders = async (request: Request, response: Response) => {
  const orders = await orderService.getAll();
  return response.status(200).json(orders);
};

export const get_order = async (request: Request, response: Response) => {
  const { id } = request.body;

  const order = await orderService.getById(id);

  if (order) {
    return response.status(200).json(order);
  }
  return response.status(404).json({ msg: "no order with that id" });
};

export const create_order = async (request: Request, response: Response) => {
  const {
    date,
    name,
    province,
    phoneNumber,
    status,
    publicationId
  } = await request.body;
  
  try {
    const publication: Publication = await publicationService.getById(publicationId);

    let order: Order= {
      id:0,
      date,
      name,
      province,
      phoneNumber,
      status,
      amount:publication.journal.price,
      publication
    };

    order = await orderService.create(order);
    
    return response.status(200).json(order);
  } catch (e) {
    return response.status(404).json(
      { msg: "error to create a order with that i", error:e },
    );
  }
};

export const delete_order = async (request: Request, response: Response) => {
  return response.status(500).json(
    { msg: "not Implemented" },
  );
  const { id } = request.body;

  try {
    //await orderService.remove(id);

    return response.send(200).json({ id: id });
  } catch (e) {
    return response.send(404).json(
        { msg: "error to create a order with that i" },
      );
  }
};
