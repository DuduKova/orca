﻿export interface User {
  _id: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  tokens: [{
    access: {

  },
    token: {

    }
  }];
}
