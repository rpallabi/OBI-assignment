import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from '../customers/customer.entity';

@Entity('customer_orders')
export class Order {
  @PrimaryGeneratedColumn() id: number;
  @Column() externalOrderId: number;
  @Column('json') items: any;
  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
