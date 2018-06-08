import {Product} from './product';
import {Customer} from './customer';
import {Consultant} from './consultant';
import {Transportation} from './transportation';

export class Order {
  _id: String;
  product: Product;
  customer: Customer;
  consultant: Consultant;
  country: String;
  town: String;
  address: String;
  phone: String;
  transportation: Transportation;
  date: Date;

  constructor(product, customer, consultant, country, town, address, phone, transportation, date) {
    this.product = product;
    this.consultant = consultant;
    this.customer = customer;
    this.country = country;
    this.town = town;
    this.address = address;
    this.phone = phone;
    this.transportation = transportation;
    this.date = date;
  }
}
