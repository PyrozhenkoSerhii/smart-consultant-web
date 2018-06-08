import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Customer} from '../../../classes/customer';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'ngx-flash-messages';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ValidationMessage} from '../../../classes/validation-message';


@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss']
})
export class CustomerRegistrationComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;
  age: string;
  validation: any;

  imageSourceDefault = 'https://www.shareicon.net/download/2016/09/01/822725_user_512x512.png';

  constructor(private authService: AuthService, private router: Router, private flashMessagesService: FlashMessagesService) {
  }

  ngOnInit() {
    this.validation = {
      name: {},
      username: {},
      email: {},
      password: {},
      age: {}
    };
  }

  onRegisterSubmit() {
    if (!this.isValidForm()) {
      return;
    }

    const customer = new Customer(this.name, this.username.toLocaleLowerCase(), this.email, this.password,
      this.age, this.imageSourceDefault, [], []);

    this.authService.registerCustomer(customer).subscribe(data => {
      if (data.success) {
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
      }
    });
  }

  isValidForm() {
    const validEmail = this.isValidEmail();
    const validUsername = this.isValidUsername();
    const validName = this.isValidName();
    const validPassword = this.isValidPassword();
    const validAge = this.isValidAge();
    return validEmail && validUsername && validName && validPassword && validAge;
  }

  isValidEmail() {
    if (!this.email) {
      this.validation.email.errorMessage = ValidationMessage.getEmailField() + ValidationMessage.getRequiredMessage();
      return false;
    }

    if (!this.email.includes('@') || !this.email.includes('.')) {
      this.validation.email.errorMessage = ValidationMessage.getValidEmailMessage();
      return false;
    }

    // const pattern = '^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$';
    // if (!this.email.match(pattern)) {
    //   this.validation.email.errorMessage = ValidationMessage.getValidEmailMessage();
    //   return false;
    // }

    this.validation.email.errorMessage = undefined;
    return true;
  }

  isValidPassword() {
    if (!this.password) {
      this.validation.password.errorMessage = ValidationMessage.getPasswordField() + ValidationMessage.getRequiredMessage();
      return false;
    }

    if (this.password.length < 8) {
      this.validation.password.errorMessage = ValidationMessage.getPasswordField() + ValidationMessage.getLengthMessage(8);
      return false;
    }

    this.validation.password.errorMessage = undefined;
    return true;
  }

  isValidUsername() {
    if (!this.username) {
      this.validation.username.errorMessage = ValidationMessage.getUsernameField() + ValidationMessage.getRequiredMessage();
      return false;
    }

    if (this.username.length < 2) {
      this.validation.username.errorMessage = ValidationMessage.getPasswordField() + ValidationMessage.getLengthMessage(2);
      return false;
    }

    this.validation.username.errorMessage = undefined;
    return true;
  }

  isValidName() {
    if (!this.name) {
      this.validation.name.errorMessage = ValidationMessage.getNameField() + ValidationMessage.getRequiredMessage();
      return false;
    }

    if (this.name.length < 2) {
      this.validation.name.errorMessage = ValidationMessage.getPasswordField() + ValidationMessage.getLengthMessage(2);
      return false;
    }

    this.validation.name.errorMessage = undefined;
    return true;
  }

  isValidAge() {
    if (!this.age) {
      this.validation.age.errorMessage = ValidationMessage.getAgeField() + ValidationMessage.getRequiredMessage();
      return false;
    }

    this.validation.age.errorMessage = undefined;
    return true;
  }
}
