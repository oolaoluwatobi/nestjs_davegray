import { Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  private customers = [
    { id: 1, name: 'John Doe', role: 'CUSTOMER' },
    { id: 2, name: 'Alice Caeiro', role: 'EMPLOYEE' },
    { id: 3, name: 'Who Knows', role: 'ADMIN' },
  ];

  findAll(role?: 'CUSTOMER' | 'EMPLOYEE' | 'ADMIN') {
    if (role) {
      return this.customers.filter((customer) => customer.role === role);
    }
    return this.customers;
  }

  findOne(id: number) {
    return this.customers.find((customer) => customer.id === +id);
  }

  create(createCustomerDto: CreateCustomerDto) {
    const usersByHighestId = [...this.customers].sort((a, b) => b.id - a.id);
    const newCustomer = {
      ...createCustomerDto,
      id: usersByHighestId[0].id + 1,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    this.customers = this.customers.map((customer) =>
      customer.id === id ? { ...customer, ...updateCustomerDto } : customer,
    );
    return this.findOne(id);
  }

  remove(id: number) {
    const removeCustomer = this.findOne(id);
    this.customers.filter((customer) => customer.id !== id);
    return removeCustomer;
  }
}
