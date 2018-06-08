export class ValidationMessage {
  static getRequiredMessage() {
    const locale = localStorage.getItem('locale');
    if (locale === 'ru-RU') {
      return ' должно быть заполнено';
    } else if (locale === 'uk-UK') {
      return ' повинно бути заповненим';
    } else {
      return ' field is required';
    }
  }

  static getLengthMessage(length) {
    const locale = localStorage.getItem('locale');
    if (locale === 'ru-RU') {
      return ' должно быть не менее ' + length + ' символов длинной';
    } else if (locale === 'uk-UK') {
      return ' повинно бути не менш за ' + length + ' символів довжиною';
    } else {
      return ' must be at least ' + length + ' symbols';
    }
  }

  static getValidEmailMessage() {
    const locale = localStorage.getItem('locale');
    if (locale === 'ru-RU') {
      return 'Введите корректную почту';
    } else if (locale === 'uk-UK') {
      return 'Введіть коректну пошту';
    } else {
      return 'Enter a valid email';
    }
  }

  static getNameField() {
    const locale = localStorage.getItem('locale');
    if (locale === 'ru-RU') {
      return 'Имя';
    } else if (locale === 'uk-UK') {
      return 'Ім\'я';
    } else {
      return 'Name';
    }
  }

  static getUsernameField() {
    const locale = localStorage.getItem('locale');
    if (locale === 'ru-RU') {
      return 'Имя пользователя';
    } else if (locale === 'uk-UK') {
      return 'Ім\'я користувача';
    } else {
      return 'Username';
    }
  }

  static getEmailField() {
    const locale = localStorage.getItem('locale');
    if (locale === 'ru-RU') {
      return 'Поле Почта';
    } else if (locale === 'uk-UK') {
      return 'Поле Пошта';
    } else {
      return 'Email';
    }
  }

  static getAgeField() {
    const locale = localStorage.getItem('locale');
    if (locale === 'ru-RU') {
      return 'Поле позраст';
    } else if (locale === 'uk-UK') {
      return 'Поле Вік';
    } else {
      return 'Age';
    }
  }

  static getTitleField() {
    const locale = localStorage.getItem('locale');
    if (locale === 'ru-RU') {
      return 'Название';
    } else if (locale === 'uk-UK') {
      return 'Поле Назва';
    } else {
      return 'Title';
    }
  }

  static getPasswordField() {
    const locale = localStorage.getItem('locale');
    if (locale === 'ru-RU') {
      return 'Поле Пароль';
    } else if (locale === 'uk-UK') {
      return 'Поле пароль';
    } else {
      return 'Password';
    }
  }

  static getKeyField() {
    const locale = localStorage.getItem('locale');
    if (locale === 'ru-RU') {
      return 'Поле Ключ';
    } else if (locale === 'uk-UK') {
      return 'Поле Ключ';
    } else {
      return 'Key';
    }
  }

  static getPhoneField() {
    const locale = localStorage.getItem('locale');
    if (locale === 'ru-RU') {
      return 'Поле Телефон';
    } else if (locale === 'uk-UK') {
      return 'Поле Телефон';
    } else {
      return 'Phone';
    }
  }

  static getRequirementsField() {
    const locale = localStorage.getItem('locale');
    if (locale === 'ru-RU') {
      return 'Поле требований';
    } else if (locale === 'uk-UK') {
      return 'Поле вимог';
    } else {
      return 'Requirements';
    }
  }

  static getLanguagesField() {
    const locale = localStorage.getItem('locale');
    if (locale === 'ru-RU') {
      return 'Поле Языков';
    } else if (locale === 'uk-UK') {
      return 'Поле Мов';
    } else {
      return 'Languages';
    }
  }

  static getCertificatesField() {
    const locale = localStorage.getItem('locale');
    if (locale === 'ru-RU') {
      return 'Поле сертификатов';
    } else if (locale === 'uk-UK') {
      return 'Поле сертифікатів';
    } else {
      return 'Certificates';
    }
  }

  static getCategoriesField() {
    const locale = localStorage.getItem('locale');
    if (locale === 'ru-RU') {
      return 'Поле Категория';
    } else if (locale === 'uk-UK') {
      return 'Поле Категорія';
    } else {
      return 'Categories';
    }
  }

}
