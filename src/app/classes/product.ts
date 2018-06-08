export class Product {
  _id: string;
  title: String;
  category: String;
  quantity: number;
  price: number;
  image: String;
  company: String;
  specification: Array<{ name: String, title: String }>;

  constructor(title, category, quantity, price, image, company, specification) {
    this.title = title;
    this.category = category;
    this.quantity = quantity;
    this.price = price;
    this.image = image;
    this.company = company;
    this.specification = specification;
  }
}
