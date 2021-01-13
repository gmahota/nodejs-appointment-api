import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,OneToOne, JoinColumn,OneToMany } from "typeorm";
import Publication from "../book/publication";
import Payment from './payment';

@Entity("orders")
export default class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  date: Date;
  @Column({length: 50, nullable:false })  
  name: string;
  @Column({length: 50, nullable:true })
  province?: string;
  @Column({length: 20, nullable:false })
  phoneNumber: string;

  @Column({length: 10, nullable:true })
  status?: string;

  @Column()
  amount?: number;

  @ManyToOne(() => Publication, (publication) => publication.orders)
  @JoinColumn({ name: "publication_id" })
  publication: Publication;

  @OneToMany(() => Payment,payment=> payment.order , {
    nullable:true ,
    cascade:['insert','update']
  })
  @JoinColumn([{ referencedColumnName: "id" }, { referencedColumnName: "paymentId" }])
  payments: Payment[];

  constructor() {
    this.date = new Date();
  }
}
