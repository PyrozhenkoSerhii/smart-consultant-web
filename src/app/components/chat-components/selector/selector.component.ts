import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Consultant} from '../../../classes/consultant';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'ngx-flash-messages';
import {Product} from '../../../classes/product';
import {Customer} from '../../../classes/customer';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {
  consultants: Consultant[];
  product: Product;
  customer: Customer;

  constructor(private router: Router, private flashMessagesService: FlashMessagesService, private productService: ProductService) {
  }

  ngOnInit() {
    this.customer = JSON.parse(localStorage.getItem('user'));
    this.product = JSON.parse(localStorage.getItem('product'));

    this.productService.getAvailableConsultantByCategory(this.product.category).subscribe(data => {
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
      } else {
        console.log(data);
        this.consultants = data.consultants;
      }
    });
    console.log(this.consultants);
  }

  getConsultation(consultant) {
    localStorage.setItem('currentConsultant', JSON.stringify(consultant));
    this.router.navigate(['/chat', consultant._id]);
  }

  getRate(consultant) {
    let rate = Number.parseInt(consultant.rate);
    rate = rate / 10;
    return rate;
  }
}
