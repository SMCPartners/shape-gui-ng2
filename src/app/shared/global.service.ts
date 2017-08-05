import {Injectable} from '@angular/core';
import {User} from "./user";

@Injectable()
export class GlobalService {

  user: User;

  constructor() {
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser() : User {
    return this.user;
  }
}
