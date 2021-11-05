


import { Injectable } from '@angular/core';
// import * as EmailValidator from 'email-validator';


@Injectable()
export class LibraryService {


  private limitTable: number[] = [5, 10, 20, 30];
  private pageLimit: number = 5;

  constructor() {}



  //is valid date
  isValidDate(dateAny: any) {
    return dateAny instanceof Date && !isNaN(dateAny.getTime());
  }//end isValidDate


  //get service error text
  getServiceErrorText(error: any) : string{
    let errorText: string = "";
    switch(error.status){
      case 400: errorText = error._body; break;
      //case 400: errorText = error._body; break;
      default: errorText = "Une erreur est survenue. Veuillez réessayer"; break;
    }
    return errorText;
  }//fin getServiceErrorText

  //get list of possible limit on paginators
  getPaginatorLimitList() : number[]{
    return this.limitTable;
  }//fin getPaginatorLimitList

  //get list of possible limit on paginators
  getPaginatorDefaultLimit() : number{
    return this.pageLimit;
  }//fin getPaginatorDefaultLimit

  copy(obj: any) : any{
    return (JSON.parse(JSON.stringify(obj)));
  }//fin copy

  showMessage(content: string) : void{
    return alert(content);
  }//fin showMessage

  //check valid number
  isValidNumber(value: any): boolean{
    let content: string = "" + value;
      var regexQty = /^[0-9]{1,10}$/;   //  -?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?  from dom_renderer.ts
      if (!regexQty.test(content)){
        return false;
    }else return true;
  }//fin isValidNumber

  //pad a string
  padString (pad: string, user_str: string, pad_pos: string): string{
  if (typeof user_str === 'undefined')
    return pad;
  if (pad_pos == 'l')
  {
    return (pad + user_str).slice(-pad.length);
  }
  else
  {
    return (user_str + pad).substring(0, pad.length);
  }
}//fin padString

  //convertit une date en chaine de caracteres
  convertDateToStringShort (date: Date): string{

  if (date === null || date === undefined) return null;

  let theYear: any  = date.getFullYear();
    let theMonth: any = date.getMonth()+1;
  theMonth = this.padString("00", theMonth, "l");
    let theDay: any = date.getDate();
  theDay = this.padString("00", theDay, "l");

    let theHour: any = date.getHours();
  theHour = this.padString("00", theHour, "l");
    let theMinute: any = date.getMinutes();
  theMinute = this.padString("00", theMinute, "l");

  //var momDate = moment(date).format();
  var result = theDay + "/" + theMonth + "/" + theYear + " " ;    //+ + theHour +  ":" + theMinute //momDate.substr(8, 2) + "/" + momDate.substr(5, 2) + "/" + momDate.substr(0, 4);
  return result;
}//fin convertDateToStringShort

  //convert 2017-05-27T00:00:00 date to Mon May 22 2017 10:10:10 GMT+0100 (Afr. centrale Ouest) javascript
  convertStrDateToJsDate (dateStr: any): Date{
    if(dateStr === undefined) return new Date();

    dateStr = new String(dateStr);
    //day
    let theYear: number = parseInt(dateStr.substr(0, 4)) ;
    //month
    let theMonth: number = parseInt(dateStr.substr(5, 2))-1 ;
    //day
    let theDay: number = parseInt(dateStr.substr(8, 2)) ;

    let theDate: Date;
    theDate = new Date();
    theDate.setFullYear(theYear, theMonth, theDay);

    return theDate;
  }//fin convertDateToStringShort

  // // check valid email
  // isValidEmail(value: any): boolean{
  //   let regexp: any = new RegExp('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/');
  //   let result: boolean = regexp.test(value);
  //   return result;
  // }// fin isValidEmail

  //  isValidEmail(email:string){
  //   if ( EmailValidator.validate(email) ){

  //       //if valid
  //       return true;
  //       }else{

  //         //else
  //         return false;
  //       }

  //   }//end checkValidEmail

  //get browser offset
  getBrowserOffset(): number {
    let offset: number = new Date().getTimezoneOffset();
    return (-1) * offset / 60;
  }//end getBrowserOffset

}

