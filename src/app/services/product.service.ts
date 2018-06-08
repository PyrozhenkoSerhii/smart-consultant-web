import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Response} from '../interface/response';

// const baseUrl = 'http://localhost:8000/';
const baseUrl = '';
const headers = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};


@Injectable()
export class ProductService {
  product: any;

  constructor(private http: HttpClient) {
  }

  createProduct(product) {
    return this.http.post<Response>(baseUrl + 'products/add', {product: product}, headers);
  }

  removeProduct(product) {
    return this.http.post<Response>(baseUrl + 'products/remove', {product: product}, headers);
  }

  getProductsByCategory(category) {
    return this.http.post<Response>(baseUrl + 'products/getAllByCategory', {category: category}, headers);
  }

  getProductsByCompany(company) {
    return this.http.post<Response>(baseUrl + 'products/getAllByCompany', {company: company}, headers);
  }

  getAllProducts() {
    return this.http.get<Response>(baseUrl + 'products/getAll', headers);
  }

  changePrice(product) {
    return this.http.post<Response>(baseUrl + 'products/changePrice', {product: product}, headers);
  }

  changeImage(product) {
    return this.http.post<Response>(baseUrl + 'products/changeImage', {product: product}, headers);
  }

  changeQuantity(product) {
    return this.http.post<Response>(baseUrl + 'products/changeQuantity', {product: product}, headers);
  }

  updateCustomerPurchases(customerUsername, consultantUsername, productTitle) {
    return this.http.post<Response>(baseUrl + 'customers/updatePurchases',
      {data: {customer: customerUsername, consultant: consultantUsername, product: productTitle, date: Date.now()}}, headers);
  }

  updateConsultantDisposals(customerUsername, consultantUsername, productTitle) {
    return this.http.post<Response>(baseUrl + 'consultants/updateDisposals',
      {data: {customer: customerUsername, consultant: consultantUsername, product: productTitle, date: Date.now()}}, headers);
  }

  addCompanyProduct(product, companyTitle) {
    return this.http.post<Response>(baseUrl + 'companies/addProduct',
      {data: {company: companyTitle, product: product}}, headers);
  }

  removeCompanyProduct(product, companyTitle) {
    return this.http.post<Response>(baseUrl + 'companies/removeProduct',
      {data: {company: companyTitle, product: product}}, headers);
  }

  getAvailableConsultantByCategory(category) {
    return this.http.post<Response>(baseUrl + 'consultants/getAvailableByCategory', {category: category}, headers);
  }

  createOrder(order) {
    return this.http.post<Response>(baseUrl + 'products/createOrder', {order: order}, headers);
  }
}
