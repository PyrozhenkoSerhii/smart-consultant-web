import {Consultant} from './consultant';

export class WorkRequest {
  message: string;
  consultant: Consultant;

  constructor(message, consultant) {
    this.message = message;
    this.consultant = consultant;
  }
}
