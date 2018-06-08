import {Component, OnInit} from '@angular/core';
import {FlashMessagesService} from 'ngx-flash-messages';
import {Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';
import {Customer} from '../../../classes/customer';
import {Product} from '../../../classes/product';
import {Consultant} from '../../../classes/consultant';
import {Order} from '../../../classes/order';
import {Transportation} from '../../../classes/transportation';
import {ProfileService} from '../../../services/profile.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OrderModalComponent} from '../../modals/OrderModal';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  customer: Customer;
  product: Product;
  consultant: Consultant;

  country: String;
  town: String;
  address: String;
  phoneNumber: String;


  delivery = 'Courier delivery';
  payment: 'Cash payment';
  deliveryTime = '3 days';

  constructor(private flashMessagesService: FlashMessagesService, private router: Router, private productService: ProductService,
              private profileService: ProfileService) {
  }

  ngOnInit() {
    this.product = JSON.parse(localStorage.getItem('product'));
    this.consultant = JSON.parse(localStorage.getItem('currentConsultant'));
    this.customer = JSON.parse(localStorage.getItem('user'));
  }

  rateConsultant() {

  }

  changeCurrentDelivery(delivery) {
    this.delivery = delivery;
    if (this.delivery === 'Courier delivery') {
      this.deliveryTime = '3 days';
    }
    if (this.delivery === 'Post office delivery') {
      this.deliveryTime = '2 days';
    }
    if (this.delivery === 'Pick up from stock') {
      this.deliveryTime = 'Right now';
    }
  }

  changeCurrentPayment(payment) {
    this.payment = payment;
  }


  onOrderSubmit() {
    const transportation = new Transportation(
      this.delivery,
      this.payment,
      this.deliveryTime
    );

    const order = new Order(
      this.product,
      this.customer,
      this.consultant,
      this.country,
      this.town,
      this.address,
      this.phoneNumber,
      transportation,
      Date.now()
    );

    let success = true;
    this.productService.updateCustomerPurchases(
      this.customer.username,
      this.consultant === null ? '---' : this.consultant.username,
      this.product.title)
      .subscribe(data => {
        if (!data.success) {
          this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
          success = false;
        }
      });

    this.product.quantity = this.product.quantity - 1;
    this.productService.changeQuantity(this.product).subscribe(data => {
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
        success = false;
      }
    });

    this.productService.createOrder(order).subscribe(data => {
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
        success = false;
      }
    });

    if (this.consultant !== null) {
      this.productService.updateConsultantDisposals(this.customer.username, this.consultant.username, this.product.title)
        .subscribe(data => {
          if (!data.success) {
            this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
            success = false;
          }
        });
      localStorage.removeItem('currentConsultant');
    }
    localStorage.removeItem('product');

    if (success) {
      this.flashMessagesService.show('Product ordered', {classes: ['alert', 'alert-success'], timeout: 2000});
    }
  }

}
