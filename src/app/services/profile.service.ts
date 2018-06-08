import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Response} from '../interface/response';

// const baseUrl = 'http://localhost:8000/';
const baseUrl = '';

const headers = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable()
export class ProfileService {
  token = localStorage.getItem('user_token');
  authHeaders = {
    headers: new HttpHeaders({'Content-type': 'application/json', 'Authorization': this.token})
  };

  constructor(private http: HttpClient) {
  }

  // getters
  getCustomerInfoByUsername() {
    const customer = localStorage.getItem('username');
    return this.http.post<Response>(baseUrl + 'customers/getByUsername', {customer: customer}, this.authHeaders);
  }

  getConsultantInfoByUsername() {
    const consultant = localStorage.getItem('username');
    return this.http.post<Response>(baseUrl + 'consultants/getByUsername', {consultant: consultant}, this.authHeaders);
  }

  getConsultantForCompany(username) {
    return this.http.post<Response>(baseUrl + 'consultants/getByUsername', {consultant: username}, this.authHeaders);
  }

  getCompanyInfoByUsername() {
    const company = localStorage.getItem('username');
    return this.http.post<Response>(baseUrl + 'companies/getByTitle', {company: company}, this.authHeaders);
  }

  changeAvailability(consultant) {
    return this.http.post<Response>(baseUrl + 'consultants/changeAvailability', {consultant: consultant}, this.authHeaders);
  }

  // email changers
  changeCustomerEmail(customer) {
    return this.http.post<Response>(baseUrl + 'customers/changeEmail', {customer: customer}, this.authHeaders);
  }

  changeConsultantEmail(consultant) {
    return this.http.post<Response>(baseUrl + 'consultants/changeEmail', {consultant: consultant}, this.authHeaders);
  }

  changeCompanyEmail(company) {
    return this.http.post<Response>(baseUrl + 'companies/changeEmail', {company: company}, this.authHeaders);
  }

  // phone changers
  changeConsultantPhone(consultant) {
    return this.http.post<Response>(baseUrl + 'consultants/changePhone', {consultant: consultant}, this.authHeaders);
  }

  changeCompanyPhone(company) {
    return this.http.post<Response>(baseUrl + 'companies/changePhone', {company: company}, this.authHeaders);
  }

  // age changers
  changeCustomerAge(customer) {
    return this.http.post<Response>(baseUrl + 'customers/changeAge', {customer: customer}, this.authHeaders);
  }

  changeConsultantAge(consultant) {
    return this.http.post<Response>(baseUrl + 'consultants/changeAge', {consultant: consultant}, this.authHeaders);
  }

  // profile images changers
  changeCustomerProfileImg(customer) {
    return this.http.post<Response>(baseUrl + 'customers/changeProfileImg', {customer: customer}, this.authHeaders);
  }

  changeConsultantProfileImg(consultant) {
    return this.http.post<Response>(baseUrl + 'consultants/changeProfileImg', {consultant: consultant}, this.authHeaders);
  }

  changeCompanyProfileImg(company) {
    return this.http.post<Response>(baseUrl + 'companies/changeProfileImg', {company: company}, this.authHeaders);
  }

  // another changers
  changeCompanyRequirements(company) {
    return this.http.post<Response>(baseUrl + 'companies/changeRequirements', {company: company}, this.authHeaders);
  }

  changeConsultantCard(consultant) {
    return this.http.post<Response>(baseUrl + 'consultants/changeCard', {consultant: consultant}, this.authHeaders);
  }

  changeConsultantCategory(consultant) {
    return this.http.post<Response>(baseUrl + 'consultants/changeCategory', {consultant: consultant}, this.authHeaders);
  }

  changeConsultantCertificate(consultant) {
    return this.http.post<Response>(baseUrl + 'consultants/changeCertificate', {consultant: consultant}, this.authHeaders);
  }

  // work in company
  addConsultantCompany(companyTitle, consultantUsername) {
    return this.http.post<Response>(baseUrl + 'consultants/addCompany',
      {data: {username: consultantUsername, company: companyTitle}}, this.authHeaders);
  }

  removeConsultantCompany(consultant) {
    return this.http.post<Response>(baseUrl + 'consultants/removeCompany', {consultant: consultant}, this.authHeaders);
  }

  hireConsultant(companyTitle, consultantUsername) {
    return this.http.post<Response>(baseUrl + 'companies/hireConsultant',
      {data: {title: companyTitle, request: {consultant: consultantUsername, date: Date.now()}}}, this.authHeaders);
  }

  dismissConsultant(companyTitle, consultantUsername) {
    return this.http.post<Response>(baseUrl + 'companies/dismissConsultant',
      {data: {title: companyTitle, consultant: consultantUsername}}, this.authHeaders);
  }

  addConsultantRequest(companyTitle, request) {
    return this.http.post<Response>(baseUrl + 'companies/addRequest',
      {data: {title: companyTitle, request: request}}, this.authHeaders);
  }

  deleteConsultantRequest(companyTitle, consultantUsername) {
    return this.http.post<Response>(baseUrl + 'companies/deleteRequest',
      {data: {title: companyTitle, user: consultantUsername}}, this.authHeaders);
  }

  rateConsultant(consultant) {
    return this.http.post<Response>(baseUrl + 'consultants/changeRate', {consultant: consultant}, this.authHeaders);
  }
}
