export class Chat {
  _id: string;
  user: String;
  message: String;
  room: String;
  profileImg: String;
  date: Date;
  type: String;
  isSystemMessage: Boolean;

  constructor(user, message, room, profileImg, type, date, isSystemMessage) {
    this.user = user;
    this.message = message;
    this.room = room;
    this.profileImg = profileImg;
    this.type = type;
    this.date = date;
    this.isSystemMessage = isSystemMessage;
  }
}
