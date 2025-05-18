import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomersService {
  constructor(@InjectRepository(Customer) private repo: Repository<Customer>) {}

  findAll() {
    return this.repo.find({ relations: ['orders'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['orders'] });
  }

  create(data: Partial<Customer>) {
    const customer = this.repo.create(data);
    return this.repo.save(customer);
  }
}
