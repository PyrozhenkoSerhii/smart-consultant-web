import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'ngx-flash-messages';
import {Specification} from '../../../classes/specification';
import {Product} from '../../../classes/product';
import {ProfileService} from '../../../services/profile.service';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {
  user: any;

  title: string;
  price: string;
  category: string;
  quantity: string;
  image: string;
  company: string;
  specification: Specification[] = [];

  categories = ['TV', 'PC', 'Monitor', 'Component', 'Laptop', 'Smartphone'];

  specificationName: string;
  specificationValue: string;

  constructor(private productService: ProductService, private router: Router, private flashMessagesService: FlashMessagesService,
              private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileService.getCompanyInfoByUsername().subscribe(data => {
      this.user = data.company;
      this.company = this.user.title;
    });
  }

  onCreateSubmit() {
    const product = new Product(this.title, this.category, this.quantity, this.price, this.image, this.company, this.specification);
    this.productService.createProduct(product).subscribe(data => {
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
      } else {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-success'], timeout: 2000});
        this.title = '';
        this.quantity = '';
        this.price = '';
        this.image = '';
        this.category = '';
        this.specification = [];
      }
    });
    this.productService.addCompanyProduct(product, this.company).subscribe(data => {
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
      }
      console.log(data.msg);
    });

  }

  changeCurrentCategory(category) {
    this.category = category;
  }

  addSpecification() {
    const specificationElement = new Specification(this.specificationName, this.specificationValue);
    this.specification.push(specificationElement);
    this.specificationName = '';
    this.specificationValue = '';
  }

  deleteSpecificationElement(name) {
    this.specification = this.specification.filter(el => el.name !== name);
  }

  clearSpecification() {
    this.specification = [];
  }

  backToCatalog() {
    this.router.navigate(['/catalog']);
  }

}
