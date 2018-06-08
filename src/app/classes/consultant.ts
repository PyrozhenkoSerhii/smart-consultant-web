export class Consultant {
  _id: string;
  name: String;
  username: String;
  email: String;
  password: String;
  age: String;
  phone: String;
  languages: String;
  card: String;
  category: String;
  certificate: String;
  available: Boolean;
  availableTime: String;
  rate: String;
  profileImg: Object;
  workingConditions: String;
  company: String;
  disposals: Array<{ product: String, customer: String, date: Date }>;
  correspondence: Array<{ user: String, message: String, date: Date }>;

  constructor(name, username, email, password, age, phone, languages, card, category, certificate, available,
              availableTime, rate, profileImg, workingConditions, company, disposals, correspondence) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.age = age;
    this.phone = phone;
    this.languages = languages;
    this.card = card;
    this.category = category;
    this.certificate = certificate;
    this.available = available;
    this.availableTime = availableTime;
    this.rate = rate;
    this.profileImg = profileImg;
    this.workingConditions = workingConditions;
    this.company = company;
    this.disposals = disposals;
    this.correspondence = correspondence;
  }
}
