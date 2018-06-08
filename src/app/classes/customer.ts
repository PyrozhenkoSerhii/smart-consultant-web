export class Customer {
  _id: string;
  name: String;
  username: String;
  email: String;
  password: String;
  age: String;
  profileImg: Object;
  purchases: Array<{ product: String, consultant: String, date: Date }>;
  correspondence: Array<{ user: String, message: String, date: Date }>;

  constructor(name, username, email, password, age, profileImg, purchases, correspondence) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.age = age;
    this.profileImg = profileImg;
    this.purchases = purchases;
    this.correspondence = correspondence;
  }
}
