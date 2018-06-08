import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'ngx-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router, private flashMessagesService: FlashMessagesService) {
  }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {username: this.username, password: this.password};
    this.authService.authenticateCustomer(user).subscribe(customerData => {
      if (customerData.success) {
        this.authService.storeUser(customerData.customer, customerData.token, 'customer');
        this.router.navigate(['/']);
      }
      this.authService.authenticateConsultant(user).subscribe(consultantData => {
        if (consultantData.success) {
          this.authService.storeUser(consultantData.consultant, consultantData.token, 'consultant');
          this.router.navigate(['/']);
        }
        this.authService.authenticateCompany(user).subscribe(companyData => {
          if (companyData.success) {
            this.authService.storeUser(companyData.company, companyData.token, 'company');
            this.router.navigate(['/']);
          }
          this.flashMessagesService.show('Wrong username or password', {classes: ['alert', 'alert-danger'], timeout: 2000});
        });
      });
    });
  }
}
