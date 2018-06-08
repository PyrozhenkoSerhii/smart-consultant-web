import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'ngx-flash-messages';
import {Product} from '../../../classes/product';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  companySort = null;
  categorySort = null;

  products: Product[] = null;
  tvProducts: Product[] = null;
  pcProducts: Product[] = null;
  monitorProducts: Product[] = null;
  componentsProducts: Product[] = null;
  laptopProducts: Product[] = null;
  smartphoneProducts: Product[] = null;

  userType: string;
  user: any;

  sortedProducts: Product[] = null;

  constructor(private productService: ProductService, private router: Router, private flashMessagesService: FlashMessagesService) {
  }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(data => {
      if (!data.success) {
        console.log(data.msg);
      } else {
        this.products = data.products;
        this.userType = localStorage.getItem('type');
        this.user = JSON.parse(localStorage.getItem('user'));
        this.sortedProducts = this.products;
      }
    });
  }

  changeCategory(event) {
    if (event === null) {
      this.sortedProducts = this.products;
      return;
    }
    this.categorySort = event.target.id;
    if (!this.isLoadedCategories(this.categorySort)) {
      this.productService.getProductsByCategory(this.categorySort).subscribe(data => {
        if (!data.success) {
          this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
        }
        this.sortedProducts = data.products;
        this.writeToLoadedCategories(data.products, this.categorySort);
      });
    } else {
      this.applyLoadedCategory(this.categorySort);
    }
  }

  isLoadedCategories(category) {
    switch (category) {
      case 'TV':
        return this.tvProducts !== null;
      case 'PC':
        return this.pcProducts !== null;
      case 'Component':
        return this.componentsProducts !== null;
      case 'Smartphone':
        return this.smartphoneProducts !== null;
      case 'Laptop':
        return this.laptopProducts !== null;
      case 'Monitor':
        return this.monitorProducts !== null;
    }
  }

  writeToLoadedCategories(products, category) {
    switch (category) {
      case 'TV':
        this.tvProducts = products;
        break;
      case 'PC':
        this.pcProducts = products;
        break;
      case 'Component':
        this.componentsProducts = products;
        break;
      case 'Smartphone':
        this.smartphoneProducts = products;
        break;
      case 'Laptop':
        this.laptopProducts = products;
        break;
      case 'Monitor':
        this.monitorProducts = products;
        break;
    }
  }

  applyLoadedCategory(category) {
    switch (category) {
      case 'TV':
        this.sortedProducts = this.tvProducts;
        break;
      case 'PC':
        this.sortedProducts = this.pcProducts;
        break;
      case 'Component':
        this.sortedProducts = this.componentsProducts;
        break;
      case 'Smartphone':
        this.sortedProducts = this.smartphoneProducts;
        break;
      case 'Laptop':
        this.sortedProducts = this.laptopProducts;
        break;
      case 'Monitor':
        this.sortedProducts = this.monitorProducts;
        break;
    }
  }

  getByCompany() {
    this.productService.getProductsByCompany(this.companySort).subscribe(data => {
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
      }
      this.sortedProducts = data.products;
    });
  }

  createProduct() {
    this.router.navigate(['/creation']);
  }

  goToProduct(product) {
    localStorage.setItem('product', JSON.stringify(product));
    localStorage.setItem('productUrl', 'http://localhost:4200/product-view/' + product._id);
    this.router.navigate(['/product-view', product._id]);
  }

  deleteProduct(product) {
    this.productService.removeProduct(product).subscribe(data => {
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
      } else {
        this.products = this.products.filter(el => el.title !== product.title);
      }
      console.log(data);
    });
    this.productService.removeCompanyProduct(product, this.user.title).subscribe(data => {
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
      }
      console.log(data);
    });
  }
}
