import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
  ) {}

  async findByUid(uid: number): Promise<Customer | null> {
    return this.customerRepo.findOne({ where: { uid }, relations: ['user'] });
  }

  async update(uid: number, dto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findByUid(uid);
    if (!customer) throw new Error('Customer not found');
    Object.assign(customer, dto);
    return this.customerRepo.save(customer);
  }
}
