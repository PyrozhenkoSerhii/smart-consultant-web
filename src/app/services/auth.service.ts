import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Response} from '../interface/response';
import {tokenNotExpired} from 'angular2-jwt';

// const baseUrl = 'http://localhost:8000/';
const baseUrl = '';

const headers = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable()
export class AuthService {
  user: any;
  token: string;

  constructor(private http: HttpClient) {
  }

  registerCustomer(customer) {
    return this.http.post<Response>(baseUrl + 'customers/register', {customer: customer}, headers);
  }

  registerConsultant(consultant) {
    return this.http.post<Response>(baseUrl + 'consultants/register', {consultant: consultant}, headers);
  }

  registerCompany(company) {
    return this.http.post<Response>(baseUrl + 'companies/register', {company: company}, headers);
  }

  authenticateCustomer(customer) {
    return this.http.post<Response>(baseUrl + 'customers/authenticate', {customer: customer}, headers);
  }

  authenticateConsultant(consultant) {
    return this.http.post<Response>(baseUrl + 'consultants/authenticate', {consultant: consultant}, headers);
  }

  authenticateCompany(company) {
    const query = {company: {title: company.username, key: company.password}};
    return this.http.post<Response>(baseUrl + 'companies/authenticate', query, headers);
  }

  storeUser(user, token, type) {
    localStorage.setItem('user_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('user_id', user._id);
    localStorage.setItem('type', type);
    type === 'company' ? localStorage.setItem('username', user.title) : localStorage.setItem('username', user.username);
    this.user = user;
    this.token = token;
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn() {
    return tokenNotExpired('user_token');
  }
}
