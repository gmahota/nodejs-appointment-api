import {Entity,Column,PrimaryColumn,PrimaryGeneratedColumn, ManyToOne,JoinColumn} from 'typeorm';
import Publication from "../book/publication";
import Order from "../sales/order";
import Payment from "../sales/payment";
import PaymentMpesaLog from "../sales/paymentMpesaLog";

@Entity('customers')
export default class Customer {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({length: 50, nullable:false })
    name?:string;
    
    @Column({length: 50, nullable:true })
    address?:string;

    @Column({length: 20, nullable:true })
    vat?:string;

    @Column({length: 50, nullable:true })
    province?: string;
    
    @Column({length: 20, nullable:false })
    phoneNumber:string;

    @Column()
    status?:string;
    
    publications?:Publication[]

    orders?:Order[];

    payments?:Payment[]
}