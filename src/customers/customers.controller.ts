import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';

import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

// type Role = 'CUSTOMER' | 'EMPLOYEE' | 'ADMIN';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get() //     /customers /customer?role=value endpoint.
  findAll(@Query('role') role?: 'CUSTOMER' | 'EMPLOYEE' | 'ADMIN'): any[] {
    return this.customersService.findAll(role);
  }
  @Get(':id') //    /customers/:id endpoint.
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @Post() //     /customers endpoint.
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Patch(':id') //    /customers/:id endpoint.
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id') // /customers/:id endpoint.
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(id);
  }
}
