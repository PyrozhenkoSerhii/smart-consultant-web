import {Component, OnInit} from '@angular/core';
import * as SocketIO from 'socket.io-client';
import {Consultant} from '../../../classes/consultant';
import {Product} from '../../../classes/product';
import {Chat} from '../../../classes/chat';
import {Customer} from '../../../classes/customer';
import {FlashMessagesService} from 'ngx-flash-messages';
import {ProfileService} from '../../../services/profile.service';
import {Router} from '@angular/router';
import {ChatRateModalComponent} from '../../modals/ChatRateModal';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  socket: any;
  user: any;
  room: String;

  customer: Customer;
  consultant: Consultant;
  product: Product;
  productURL: String;

  message: String;
  chatData: Chat[];

  userType: String;
  disabledBtn: Boolean = false;

  connectedTime: Date;

  constructor(private flashMessagesService: FlashMessagesService, private profileService: ProfileService, private router: Router) {
  }


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userType = localStorage.getItem('type');

    if (this.userType === 'consultant') {
      this.room = this.user._id;
      this.profileService.changeAvailability(this.user);
    } else {
      this.consultant = JSON.parse(localStorage.getItem('currentConsultant'));
      this.room = this.consultant._id;
      this.product = JSON.parse(localStorage.getItem('product'));
      this.productURL = localStorage.getItem('productUrl');
      this.connectedTime = new Date(Date.now());
    }

    // this.socket = SocketIO('http://localhost:8000');
    this.socket = SocketIO.connect();
    if (this.socket === undefined) {
      console.log('socket connection error');
    } else {
      console.log('socket connected');

      this.socket.emit('room', {
        data: {
          room: this.room,
          type: this.userType,
          user: this.user.username,
          time: this.connectedTime,
          product: this.product === undefined ? null : this.product
        }
      });

      this.socket.on('output', (data) => {
        if (this.userType === 'consultant') {
          this.chatData = data;
          if (this.chatData.length > 4) {
            this.chatData = this.chatData.slice(this.chatData.length - 4, this.chatData.length);
          }
        }
      });

      this.socket.on('customerOutput', (data) => {
        if (this.userType === 'customer') {
          this.chatData = data;
          if (this.chatData.length > 4) {
            this.chatData = this.chatData.slice(this.chatData.length - 4, this.chatData.length);
          }
        }
      });

      this.socket.on('customerConnected', (time) => {
        const tempConsultant = this.user;
        tempConsultant.available = false;
        this.disabledBtn = true;
        this.profileService.changeAvailability(this.user).subscribe(data => {
          if (!data.success) {
            this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
          }
        });
        this.connectedTime = time;
      });

      this.socket.on('currentProduct', (product) => {
        if (this.userType === 'consultant') {
          this.product = product;
        }
      });

      this.socket.on('customerDisconnected', () => {
        const tempConsultant = this.user;
        tempConsultant.available = true;
        this.disabledBtn = false;
        this.profileService.changeAvailability(tempConsultant).subscribe(data => {
          if (!data.success) {
            this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
          }
        });
        if (this.userType === 'consultant') {
          this.product = undefined;
        }
      });
    }
  }

  SendMessage() {
    this.socket.emit('input', {
      chat: new Chat(
        this.user.username,
        this.message,
        this.room,
        this.user.profileImg,
        'private',
        Date.now(),
        false
      ),
      time: this.connectedTime === undefined ? null : this.connectedTime,
    });
    this.message = '';
  }

  ChangeAvailability(availability) {
    this.user.available = availability;
    this.profileService.changeAvailability(this.user).subscribe(data => {
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {classes: ['alert', 'alert-danger'], timeout: 2000});
      }
      localStorage.setItem('user', JSON.stringify(this.user));
      const locale = localStorage.getItem('locale');
      if (this.user.available) {
        if (locale === 'ru-RU') {
          this.flashMessagesService.show('Вы теперь онлайн', {classes: ['alert', 'alert-success'], timeout: 2000});
        }
        if (locale === 'uk-UK') {
          this.flashMessagesService.show('Ви тепер онлайн', {classes: ['alert', 'alert-success'], timeout: 2000});
        }
        if (!locale) {
          this.flashMessagesService.show('You are online now', {classes: ['alert', 'alert-success'], timeout: 2000});
        }
      } else {
        if (locale === 'ru-RU') {
          this.flashMessagesService.show('Вы теперь офлайн', {classes: ['alert', 'alert-success'], timeout: 2000});
        }
        if (locale === 'uk-UK') {
          this.flashMessagesService.show('Ви тепер офлайн', {classes: ['alert', 'alert-success'], timeout: 2000});
        }
        if (!locale) {
          this.flashMessagesService.show('You are offline now', {classes: ['alert', 'alert-success'], timeout: 2000});
        }
      }
    });
  }

  EndConsultation() {
    this.socket.emit('disconnectedMessage', {user: this.user.username, room: this.room});
    this.socket.close({user: this.user.username});
    this.router.navigate(['order', this.product._id]);
  }
}
