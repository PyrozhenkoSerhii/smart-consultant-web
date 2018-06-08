import {Component, OnInit} from '@angular/core';
import {Consultant} from '../../../classes/consultant';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'ngx-flash-messages';
import {ValidationMessage} from '../../../classes/validation-message';

@Component({
  selector: 'app-consultant-registration',
  templateUrl: './consultant-registration.component.html',
  styleUrls: ['./consultant-registration.component.scss']
})
export class ConsultantRegistrationComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  age: String;
  phone: String;
  languages: String;
  card: String;
  category: String;
  certificate: String;
  validation: any;

  categories = ['TV', 'PC', 'Monitor', 'Component', 'Laptop', 'Smartphone'];
  imageSourceDefault = 'https://www.shareicon.net/download/2016/09/01/822725_user_512x512.png';

  constructor(private authService: AuthService, private flashMessagesService: FlashMessagesService, private router: Router) {
  }

  ngOnInit() {
    this.validation = {
      name: {},
      username: {},
      email: {},
      password: {},
      age: {},
      phone: {},
      languages: {},
      certificate: {},
      category: {},
    };
  }

  onRegisterSubmit() {
    if (!this.isValidForm()) {
      return;
    }

    this.category = this.category === undefined ? null : this.category;
    const consultant = new Consultant(
      this.name, this.username.toLocaleLowerCase(), this.email, this.password, this.age, this.phone, this.languages,
      this.card, this.category, this.certificate, false, 0, '30',
      this.imageSourceDefault, 0, null, [], []);

    console.log(consultant);

    this.authService.registerConsultant(consultant).subscribe(data => {
      if (data.success) {
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
      }
    });
  }

  changeCurrentCategory(category) {
    this.category = category;
  }

  isValidForm() {
    const validEmail = this.isValidEmail();
    const validUsername = this.isValidUsername();
    const validName = this.isValidName();
    const validPassword = this.isValidPassword();
    const validAge = this.isValidAge();
    const validPhone = this.isValidPhone();
    const validLanguages = this.isValidLang();
    const validCertificates = this.isValidCertificates();
    const validCategory = this.isValidCategory();
    return validEmail && validUsername && validName && validPassword && validAge
      && validPhone && validLanguages && validCertificates && validCategory;
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

  isValidLang() {
    if (!this.languages) {
      this.validation.languages.errorMessage = ValidationMessage.getLanguagesField() + ValidationMessage.getRequiredMessage();
      return false;
    }

    this.validation.languages.errorMessage = undefined;
    return true;
  }

  isValidCategory() {
    if (!this.category) {
      this.validation.category.errorMessage = ValidationMessage.getCategoriesField() + ValidationMessage.getRequiredMessage();
      return false;
    }

    this.validation.category.errorMessage = undefined;
    return true;
  }

  isValidCertificates() {
    if (!this.certificate) {
      this.validation.certificate.errorMessage = ValidationMessage.getCertificatesField() + ValidationMessage.getRequiredMessage();
      return false;
    }

    this.validation.certificate.errorMessage = undefined;
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
}
