import {Customer} from '../classes/customer';
import {Consultant} from '../classes/consultant';
import {Product} from '../classes/product';
import {Company} from '../classes/company';

export interface Response {
  msg: string;
  success: string;
  token: string;

  customer: Customer;
  customers: Customer[];
  consultant: Consultant;
  consultants: Consultant[];
  company: Company;
  companies: Company[];
  product: Product;
  products: Product[];

  key: string;
  module: string;
}
