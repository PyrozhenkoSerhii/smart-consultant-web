import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'ngx-flash-messages';
import {WorkRequest} from '../../classes/work-request';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  consultantsRequests: WorkRequest[] = [];
  type = 'customer';
  disabledEdit = true;
  attrClass = 'attribute';
  imageSourceDefault = 'https://www.shareicon.net/download/2016/09/01/822725_user_512x512.png';
  defaultCompany = '---';
  currentCompany;

  // general properties
  email: string;
  age: string;
  profileImg: string;

  // consultant properties
  phone: string;
  card: string;
  category: string;
  certificate: string;
  company: string;
  available: string;

  // company properties
  requirements: string;

  constructor(private profileService: ProfileService, private router: Router, private flashMessagesService: FlashMessagesService) {
  }

  ngOnInit() {
    this.type = localStorage.getItem('type');
    if (this.type === 'customer') {
      this.profileService.getCustomerInfoByUsername().subscribe(data => {
        if (!data.success) {
          console.log(data.msg);
          this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
        } else {
          this.user = data.customer;
          this.user.purchases = this.user.purchases.reverse();
          this.email = this.user.email;
          this.age = this.user.age;
        }
      });
    }
    if (this.type === 'consultant') {
      this.profileService.getConsultantInfoByUsername().subscribe(data => {
        if (!data.success) {
          console.log(data.msg);
          this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 4000});
        } else {
          this.user = data.consultant;
          this.user.disposals = this.user.disposals.reverse();
          this.email = this.user.email;
          this.age = this.user.age;
          this.phone = this.user.phone;
          this.card = this.user.card;
          this.certificate = this.user.certificate;
          this.category = this.user.category;
          this.user.company === null ? this.currentCompany = this.defaultCompany : this.currentCompany = this.user.company;
        }
      });
    }
    if (this.type === 'company') {
      this.profileService.getCompanyInfoByUsername().subscribe(data => {
        if (!data.success) {
          console.log(data.msg);
          this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 4000});
        } else {
          this.user = data.company;
          this.user.consultants = this.user.consultants.reverse();
          this.email = this.user.email;
          this.requirements = this.user.requirements;
          this.phone = this.user.phone;
          for (const request of this.user.requests) {
            this.profileService.getConsultantForCompany(request.user).subscribe(result => {
              const workRequest = new WorkRequest(request.message, result.consultant);
              this.consultantsRequests.push(workRequest);
            });
          }
        }
      });
    }
  }

  changeMode() {
    // emit update
    if (this.disabledEdit) {
      this.disabledEdit = false;
      this.attrClass = 'attributeEditor';
      // after update
    } else {
      this.disabledEdit = true;
      this.attrClass = 'attribute';


      if (this.type === 'customer') {
        if (this.email !== this.user.email) {
          this.user.email = this.email;
          this.profileService.changeCustomerEmail(this.user).subscribe(emailResponse => {
            if (!emailResponse.success) {
              this.flashMessagesService.show(emailResponse.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
            }
          });
        }
        if (this.age !== this.user.age) {
          this.user.age = this.age;
          this.profileService.changeCustomerAge(this.user).subscribe(ageResponse => {
            if (!ageResponse.success) {
              this.flashMessagesService.show(ageResponse.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
            }
          });
        }
        if (this.profileImg !== this.user.profileImg && this.profileImg !== undefined && this.profileImg.includes('http')) {
          this.user.profileImg = this.profileImg;
          this.profileService.changeCustomerProfileImg(this.user).subscribe(imgData => {
            if (!imgData.success) {
              this.flashMessagesService.show(imgData.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
            }
          });
        }
      }
      if (this.type === 'consultant') {
        if (this.email !== this.user.email) {
          this.user.email = this.email;
          this.profileService.changeConsultantEmail(this.user).subscribe(emailResponse => {
            if (!emailResponse.success) {
              this.flashMessagesService.show(emailResponse.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
            }
          });
        }
        if (this.phone !== this.user.phone) {
          this.user.phone = this.phone;
          this.profileService.changeConsultantPhone(this.user).subscribe(phoneResponse => {
            if (!phoneResponse.success) {
              this.flashMessagesService.show(phoneResponse.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
            }
          });
        }
        if (this.card !== this.user.card) {
          this.user.card = this.card;
          this.profileService.changeConsultantCard(this.user).subscribe(cardResponse => {
            if (!cardResponse.success) {
              this.flashMessagesService.show(cardResponse.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
            }
          });
        }
        if (this.age !== this.user.age) {
          this.user.age = this.age;
          this.profileService.changeConsultantAge(this.user).subscribe(ageResponse => {
            if (!ageResponse.success) {
              this.flashMessagesService.show(ageResponse.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
            }
          });
        }
        if (this.category !== this.user.category) {
          this.user.category = this.category;
          this.profileService.changeConsultantCategory(this.user).subscribe(categoryResponse => {
            if (!categoryResponse.success) {
              this.flashMessagesService.show(categoryResponse.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
            }
          });
        }
        if (this.certificate !== this.user.certificate) {
          this.user.certificate = this.certificate;
          this.profileService.changeConsultantCertificate(this.user).subscribe(certificateResponse => {
            if (!certificateResponse.success) {
              this.flashMessagesService.show(certificateResponse.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
            }
          });
        }
        if (this.profileImg !== this.user.profileImg && this.profileImg !== undefined && this.profileImg.includes('http')) {
          this.user.profileImg = this.profileImg;
          this.profileService.changeConsultantProfileImg(this.user).subscribe(imgData => {
            if (!imgData.success) {
              this.flashMessagesService.show(imgData.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
            }
          });
        }
      }
      if (this.type === 'company') {
        if (this.email !== this.user.email) {
          this.user.email = this.email;
          this.profileService.changeCompanyEmail(this.user).subscribe(emailResponse => {
            if (!emailResponse.success) {
              this.flashMessagesService.show(emailResponse.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
            }
          });
        }
        if (this.phone !== this.user.phone) {
          this.user.phone = this.phone;
          this.profileService.changeCompanyPhone(this.user).subscribe(phoneResponse => {
            if (!phoneResponse.success) {
              this.flashMessagesService.show(phoneResponse.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
            }
          });
        }
        if (this.requirements !== this.user.requirements) {
          this.user.requirements = this.requirements;
          this.profileService.changeCompanyRequirements(this.user).subscribe(requirementsResponse => {
            if (!requirementsResponse.success) {
              this.flashMessagesService.show(requirementsResponse.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
            }
          });
        }
        if (this.profileImg !== this.user.profileImg && this.profileImg !== undefined && this.profileImg.includes('http')) {
          this.user.profileImg = this.profileImg;
          this.profileService.changeCompanyProfileImg(this.user).subscribe(imgData => {
            if (!imgData.success) {
              this.flashMessagesService.show(imgData.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
            }
          });
        }
      }
    }
  }

  changeAvailability(availability) {
    this.user.available = availability;
    this.profileService.changeAvailability(this.user).subscribe(data => {
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
      }
      localStorage.setItem('user', JSON.stringify(this.user));
      const locale = localStorage.getItem('locale');
      if (this.user.available) {
        if (locale === 'ru-RU') {
          this.flashMessagesService.show('Вы теперь онлайн', {classes: ['alert', 'alert-success'], timeout: 2000});
        }
        if (locale === 'uk-UK') {
          this.flashMessagesService.show('Ви тепер онлайн', {classes: ['alert', 'alert-success'], timeout: 2000});
        }
        if (!locale) {
          this.flashMessagesService.show('You are online now', {classes: ['alert', 'alert-success'], timeout: 2000});
        }
      } else {
        if (locale === 'ru-RU') {
          this.flashMessagesService.show('Вы теперь офлайн', {classes: ['alert', 'alert-success'], timeout: 2000});
        }
        if (locale === 'uk-UK') {
          this.flashMessagesService.show('Ви тепер офлайн', {classes: ['alert', 'alert-success'], timeout: 2000});
        }
        if (!locale) {
          this.flashMessagesService.show('You are offline now', {classes: ['alert', 'alert-success'], timeout: 2000});
        }
      }
    });
  }

  changeCompany() {
    // add company
    if (this.user.company === null) {
      this.profileService.addConsultantRequest(this.company, {'user': this.user.username, 'message': 'i want to work'})
        .subscribe(data => {
          if (!data.success) {
            this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
          }
          this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-success'], timeout: 2000});
          this.company = '';
          this.changeMode();
        });
      // delete company
    } else {
      this.profileService.dismissConsultant(this.user.company, this.user.username).subscribe(data => {
        if (!data.success) {
          this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
        }
      });
      this.profileService.removeConsultantCompany(this.user.username).subscribe(data => {
        if (!data.success) {
          this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
        }
        this.flashMessagesService.show('Company was removed', {classes: ['alert', 'alert-success'], timeout: 2000});
      });
      this.currentCompany = this.defaultCompany;
      this.changeMode();
    }
  }

  hireConsultant(consultantUsername) {
    this.profileService.addConsultantCompany(this.user.title, consultantUsername).subscribe(data => {
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
      }
    });
    this.profileService.hireConsultant(this.user.title, consultantUsername).subscribe(data => {
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
      }
      this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-success'], timeout: 2000});
    });
    this.profileService.deleteConsultantRequest(this.user.title, consultantUsername).subscribe(data => {
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
      }
    });
    // todo delete from page
  }

  refuseConsultant(consultantUsername) {
    this.profileService.deleteConsultantRequest(this.user.title, consultantUsername).subscribe(data => {
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
      }
      this.flashMessagesService.show('Consultant\'s request was rejected', {classes: ['alert', 'alert-warning'], timeout: 2000});
    });
    // todo delete from page
    this.consultantsRequests = this.consultantsRequests.filter(obj => obj.consultant !== consultantUsername);
  }

  dismissConsultant(consultantUsername) {
    this.profileService.dismissConsultant(this.user.title, consultantUsername).subscribe(data => {
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
      }
    });
    this.profileService.removeConsultantCompany(consultantUsername).subscribe(data => {
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
      }
      this.flashMessagesService.show('Consultant was dismissed', {classes: ['alert', 'alert-success'], timeout: 2000});
    });
  }

  showChat() {
    this.router.navigate(['/chat', this.user._id]);
  }

  productsComponent() {
    this.router.navigate(['/catalog']);
  }

  getDate(date) {
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
  }
}
