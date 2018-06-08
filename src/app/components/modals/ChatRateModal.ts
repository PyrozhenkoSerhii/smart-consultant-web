import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-chat-rate-modal',
  templateUrl: './ChatRateModal.html',
  styles: [`
    .star {
      font-size: 1.5rem;
      color: #b0c4de;
    }

    .filled {
      color: #1e90ff;
    }

    .bad {
      color: #deb0b0;
    }

    .filled.bad {
      color: #ff1e1e;
    }
  `]
})
export class ChatRateModalComponent {
  closeResult: string;
  currentRate = 0;

  constructor(private modalService: NgbModal, private router: Router, private profileService: ProfileService) {
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  rateConsultant() {
    const consultant = JSON.parse(localStorage.getItem('currentConsultant'));
    let consultantRate = Number.parseInt(consultant.rate);
    console.log('before: ' + consultantRate);
    consultantRate = this.evaluationLogic(consultantRate, this.currentRate);
    console.log('after: ' + consultantRate);
    consultant.rate = consultantRate.toString();
    this.profileService.rateConsultant(consultant).subscribe(data => {
      if (!data.success) {
        console.log(data);
      }
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private evaluationLogic(consultantRate, currentRate) {
    if ((consultantRate + (currentRate - 5) / 2 > 100) && currentRate > 4) {
      consultantRate = 100;
      return consultantRate;
    }
    if (currentRate > 5) {
      if (consultantRate < 50) {
        consultantRate += (currentRate - 5);
      } else {
        consultantRate += (currentRate - 5) / 2;
      }
    } else {
      if (consultantRate < 50) {
        consultantRate -= (currentRate - 5) / 2;
      } else {
        consultantRate -= (currentRate - 5);
      }
    }
    return consultantRate;
  }
}
