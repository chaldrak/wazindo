import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMoney',
})
export class FormatMoneyPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  // transform(value: string, args: any) {
  transform(value: any) {

    // if(!isNaN(value)){
    //    value = value.toString();
    // }
    value = value+"";

    //console.log(value);
   
    var moneyFormatted = ""; var moneyLength = 0;

    //controle de al avleur entrée
    if (value === null || value == undefined) return value;

    //remove .00
    let pIndex: number = value.indexOf('.');
    if(pIndex >= 0){
      value = value.slice(0, pIndex);
    }

    //sa longueur
    moneyLength = value.length;

    //inverser la chaine de caractere
    var copiedInput = new String(value);
    var inversedInput = copiedInput.split('').reverse().join('');

    //diviser en groupes de 3
    for (var i =0; i<(inversedInput.length/3); i++){
      moneyFormatted += " " + inversedInput.substring(i*3, i*3+3);
    }

    //reinverse 
    var copiedFormated = new String(moneyFormatted);
    var inversedFormated = copiedFormated.split('').reverse().join('');

    return inversedFormated.trim();
  }
}
