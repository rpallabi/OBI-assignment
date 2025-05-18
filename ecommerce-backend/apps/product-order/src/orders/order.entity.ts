import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn() id: number;
  @Column() customerId: number;
  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
