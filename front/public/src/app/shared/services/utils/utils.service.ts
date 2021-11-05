import { Injectable } from '@angular/core';

import { Token } from '../../models/token/token';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private configObject: any;

  constructor() {
    this.configObject = {};
  }


  //create local token object 
  createTokenCopy(obj: any): Token {
    let token: Token = new Token();
    token.date_got = new Date(); token.date_expiration = new Date();
    token.date_expiration.setSeconds(token.date_got.getSeconds() + obj.expires_in - 10);
    token.access_key = obj.access_token;
    return token;
  }//end createTokenCopy






}
