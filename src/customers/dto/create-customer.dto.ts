export class CreateCustomerDto {
  name: string;
  role: 'CUSTOMER' | 'EMPLOYEE' | 'ADMIN';
}
