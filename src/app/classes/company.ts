export class Company {
  _id: String;
  title: String;
  key: String;
  phone: String;
  email: String;
  profileImg: String;
  requirements: String;
  consultants: Array<String>;
  products: Array<String>;

  constructor(title, key, phone, email, profileImg, requirements, consultants, products) {
    this.title = title;
    this.key = key;
    this.phone = phone;
    this.email = email;
    this.profileImg = profileImg;
    this.requirements = requirements;
    this.consultants = consultants;
    this.products = products;
  }
}
