import Customer from "../../models/base/customer";
import Payment from "../../models/sales/payment";
import { getRepository,getConnection } from "typeorm";
import Publication from "../../models/book/publication";
import Order from './../../models/sales/order';

interface Key {
  id?: any;
}

const findById = async function findById(id: string): Promise<Customer> {
  const CustomerRepository = getRepository(Customer);

  const customer: Customer = await CustomerRepository.findOneOrFail({
      where: {id: id }
    });

  return customer;
};

const findAll = async function findAll(): Promise<Customer[]> {
  const CustomerRepository = getRepository(Customer);

  const customers: Customer[] = await CustomerRepository.find({
    order: {
      phoneNumber: "ASC",
      id: "DESC",
    },
  });

  return customers;
}

const findByPhoneNumber = async function findByPhoneNumber(phoneNumber: string): Promise<Customer> {
  const CustomerRepository = getRepository(Customer);

  const customer: Customer = await CustomerRepository.findOneOrFail({
      where: {phoneNumber: phoneNumber }
    });

  return customer;
};

const findByPublications = async function findByPublications(phoneNumber: string, limit:number): Promise<Publication[]> {
  console.log({phoneNumber,limit});
  const publications: Publication[]= await getConnection()
    .createQueryBuilder()
    .select("publication")
    .from(Publication, "publication")
    .innerJoinAndSelect("publication.orders","order")
    .innerJoinAndSelect("order.payments","payment")
    .where("payment.phonenumber = :phoneNumber", { phoneNumber: phoneNumber })
    .orderBy("publication.date","DESC")
    .limit(limit)
    .getMany();

  return publications;
};

const create = async function create(
  customer: Customer
): Promise<Customer> {
  const customerRepository = getRepository(Customer);

  await customerRepository.save(customer);

  return customer;
};

export default {
  create,
  findAll,
  findById,
  findByPhoneNumber,
  findByPublications
};
