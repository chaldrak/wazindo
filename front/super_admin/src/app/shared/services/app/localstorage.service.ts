/**
 * Created by utilisateur on 31/03/2017.
 */

/**
 * Created by utilisateur on 29/03/2017.
 */


import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";




@Injectable()
export class LocalStorageService {



  constructor(private http: HttpClient) {}

    //enregistre un utilisateur connecte
    public saveDataProjet (obj: any): void{
      this.saveToSession("WAZINDO_DETAIL_PROJET", obj);
    };
      //retourne un user
      public getDataProjet (): any {
      return this.readFromSession("WAZINDO_DETAIL_PROJET");
    };
    
  private saveToSession (key: string, value: any): void{

    var stringified = unescape(encodeURIComponent(JSON.stringify(value))); //unescape(encodeURIComponent(str)
    var jsonValue = btoa(stringified);
    localStorage.setItem(key, jsonValue);

    // var stringified = JSON.stringify(value);
    // var jsonValue = btoa(stringified);
    // localStorage.setItem(key, jsonValue);
  };

  private readFromSession (key: any): any{

    var result = null;
    try{
      var json = localStorage.getItem(key);

      //decodeURIComponent(escape(window.atob(b64)));

      var result = JSON.parse(decodeURIComponent(escape(atob(json))));
    }catch(e){
      result = null;
    }
    return result;
    
    // var result = null;
    // try{
    //   var json = localStorage.getItem(key);
    //   var result = JSON.parse(atob(json));
    // }catch(e){
    //   result = null;
    // }
    // return result;
  };

}

