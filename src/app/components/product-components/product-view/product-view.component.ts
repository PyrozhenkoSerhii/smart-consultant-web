import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'ngx-flash-messages';
import {Product} from '../../../classes/product';
import {Specification} from '../../../classes/specification';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  user: any;
  product: Product;
  type: string;

  attrClass = 'attribute';
  disabledEdit = true;


  price: number;
  quantity: number;
  image: String;
  specification: Specification[];
  productURL: String;

  constructor(private productService: ProductService, private router: Router, private flashMessagesService: FlashMessagesService) {
  }

  ngOnInit() {
    this.product = JSON.parse(localStorage.getItem('product'));
    this.user = JSON.parse(localStorage.getItem('user'));
    this.type = localStorage.getItem('type');

    this.price = this.product.price;
    this.quantity = this.product.quantity;
    this.image = this.product.image;

    this.productURL = localStorage.getItem('productUrl');
  }

  changeMode(): void {
    // emit update
    if (this.disabledEdit) {
      this.disabledEdit = false;
      this.attrClass = 'attributeEditor';
      // after update
    } else {
      this.disabledEdit = true;
      this.attrClass = 'attribute';

      if (this.price !== this.product.price) {
        this.product.price = this.price;
        this.productService.changePrice(this.product).subscribe(data => {
          if (!data.success) {
            this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
          } else {
            localStorage.setItem('product', JSON.stringify(this.product));
          }
        });
      }
      if (this.image !== this.product.image) {
        this.product.image = this.image;
        this.productService.changeImage(this.product).subscribe(data => {
          if (!data.success) {
            this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
          } else {
            localStorage.setItem('product', JSON.stringify(this.product));
          }
        });
      }
      if (this.quantity !== this.product.quantity) {
        this.product.quantity = this.quantity;
        this.productService.changeQuantity(this.product).subscribe(data => {
          if (!data.success) {
            this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
          } else {
            localStorage.setItem('product', JSON.stringify(this.product));
          }
        });
      }
    }
  }

  catalogRouter(): void {
    this.router.navigate(['/catalog']);
  }

  deleteProduct(): void {
    this.productService.removeProduct(this.product).subscribe(data => {
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
      }
    });
    this.productService.removeCompanyProduct(this.product, this.user.title).subscribe(data => {
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
      }
    });
  }

  orderProduct(): void {
    localStorage.setItem('product', JSON.stringify(this.product));
    this.router.navigate(['order', this.product._id]);
  }

  getConsultation(): void {
    localStorage.setItem('product', JSON.stringify(this.product));
    this.router.navigate(['/selector']);
  }
}
