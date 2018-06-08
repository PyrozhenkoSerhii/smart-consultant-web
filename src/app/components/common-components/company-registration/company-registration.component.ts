import {Component, OnInit} from '@angular/core';
import {Company} from '../../../classes/company';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'ngx-flash-messages';
import {ValidationMessage} from '../../../classes/validation-message';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent implements OnInit {
  title: string;
  key: string;
  phone: string;
  email: string;
  certificateRequirements: string;
  validation: any;

  imageSourceDefault = 'https://www.shareicon.net/download/2016/09/01/822725_user_512x512.png';

  constructor(private authService: AuthService, private flashMessagesService: FlashMessagesService, private router: Router) {
  }

  ngOnInit() {
    this.validation = {
      title: {},
      key: {},
      email: {},
      phone: {},
      certificateRequirements: {}
    };
  }

  onRegisterSubmit() {
    if (!this.isValidForm()) {
      return;
    }
    const company = new Company(this.title.toLocaleLowerCase(), this.key, this.phone, this.email, this.imageSourceDefault,
      this.certificateRequirements, [], []);
    console.log(company);
    this.authService.registerCompany(company).subscribe(data => {
      if (data.success) {
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
      }
    });
  }

  isValidForm() {
    const validEmail = this.isValidEmail();
    const validTitle = this.isValidTitle();
    const validPhone = this.isValidPhone();
    const validPassword = this.isValidPassword();
    const validCertificateRequirements = this.isValidCertificateRequirements();
    return validEmail && validTitle && validPhone && validPassword && validCertificateRequirements;
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

    this.validation.email.errorMessage = undefined;
    return true;
  }

  isValidPassword() {
    if (!this.key) {
      this.validation.key.errorMessage = ValidationMessage.getKeyField() + ValidationMessage.getRequiredMessage();
      return false;
    }

    if (this.key.length < 8) {
      this.validation.key.errorMessage = ValidationMessage.getKeyField() + ValidationMessage.getLengthMessage(8);
      return false;
    }

    this.validation.key.errorMessage = undefined;
    return true;
  }

  isValidTitle() {
    if (!this.title) {
      this.validation.title.errorMessage = ValidationMessage.getTitleField() + ValidationMessage.getRequiredMessage();
      return false;
    }

    if (this.title.length < 2) {
      this.validation.title.errorMessage = ValidationMessage.getTitleField() + ValidationMessage.getLengthMessage(2);
      return false;
    }

    this.validation.title.errorMessage = undefined;
    return true;
  }

  isValidPhone() {
    if (!this.phone) {
      this.validation.phone.errorMessage = ValidationMessage.getPhoneField() + ValidationMessage.getRequiredMessage();
      return false;
    }

    if (this.phone.length < 6) {
      this.validation.phone.errorMessage = ValidationMessage.getPhoneField() + ValidationMessage.getLengthMessage(6);
      return false;
    }

    this.validation.phone.errorMessage = undefined;
    return true;
  }

  isValidCertificateRequirements() {
    if (!this.certificateRequirements) {
      this.validation.certificateRequirements.errorMessage
        = ValidationMessage.getRequirementsField() + ValidationMessage.getRequiredMessage();
      return false;
    }

    this.validation.certificateRequirements.errorMessage = undefined;
    return true;
  }

}
