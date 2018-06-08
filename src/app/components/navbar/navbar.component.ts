import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {tokenNotExpired} from 'angular2-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  user: any;
  username: string;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.username = this.user.username === undefined ? this.user.title : this.user.username;
    }
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  loggedIn() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.username = this.user.username === undefined ? this.user.title : this.user.username;
    }
    return tokenNotExpired('user_token');
  }

  isBaseLocale() {
    if (localStorage.getItem('locale')) {
      return false;
    }
    return true;
  }

  isRussian() {
    if (localStorage.getItem('locale') === 'ru-RU') {
      return true;
    }
    return false;
  }

  isUkrainian() {
    if (localStorage.getItem('locale') === 'uk-UK') {
      return true;
    }
    return false;
  }

  changeToEnglish() {
    localStorage.removeItem('locale');
    location.reload();
  }

  changeToRussian() {
    localStorage.setItem('locale', 'ru-RU');
    location.reload();
  }

  changeToUkrainian() {
    localStorage.setItem('locale', 'uk-UK');
    location.reload();
  }
}
