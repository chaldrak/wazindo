/**
 * Created by utilisateur on 31/03/2017.
 */

/**
 * Created by utilisateur on 29/03/2017.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {



  constructor() { }



  //enregistre le lien pour les intensions de l'utilisateur
  public saveUrl(obj: string): void {
    this.saveToSession("WAZINDO_URL", obj);
  };
  //retourne le lien
  public getUrl(): string {
    return this.readFromSession("WAZINDO_URL");
  };


  //enregistre le lien pour les intensions de l'utilisateur
  public saveParamsUrl(obj: string): void {
    this.saveToSession("WAZINDO_URL_PARAMS", obj);
  };
  //retourne le lien
  public getParamsUrl(): string {
    return this.readFromSession("WAZINDO_URL_PARAMS");
  };

  //enregistre le lien pour les intensions de l'utilisateur
  public saveMontantContibution(obj: any): void {
    this.saveToSession("WAZINDO_MONTANT_PAIEMENT", obj);
  };
  //retourne le lien
  public getMontantContibution(): any {
    return this.readFromSession("WAZINDO_MONTANT_PAIEMENT");
  };

  //enregistre le lien pour les intensions de l'utilisateur
  public saveDataPubSolidaire(obj: any): void {
    this.saveToSession("WAZINDO_PUB_SOLIDAIRE", obj);
  };
  
  //retourne le lien
  public getDataPubSolidaire(): any {
    return this.readFromSession("WAZINDO_PUB_SOLIDAIRE");
  };

  //settoken
  saveApiToken(token: any): void {
    this.saveToSession('WAZINDO_TOKEN', token);
  }//end saveApiToken

  //get token
  getApiToken(): any {
    return this.readFromSession('WAZINDO_TOKEN');
  }//end getApiToken


  //enregistre un utilisateur connecte
  public saveDataContrepartie(obj: any): void {
    this.saveToSession("WAZINDO_CONTREPARTIE", obj);
  };
  //retourne un user
  public getDataContrepartie(): any {
    return this.readFromSession("WAZINDO_CONTREPARTIE");
  };


  //enregistre un utilisateur connecte
  public saveDataProjet(obj: any): void {
    this.saveToSession("WAZINDO_DETAIL_PROJET", obj);
  };
  //retourne un user
  public getDataProjet(): any {
    return this.readFromSession("WAZINDO_DETAIL_PROJET");
  };




  //enregistre les données du produit
  public saveDataProduct(obj: any): void {
    this.saveToSession("ECOLIS_PROJET", obj);
  };
  //retourne les données du produit
  public getDataProduct(): any {
    return this.readFromSession("ECOLIS_PROJET");
  };


  //enregistre les données saisies pour le filtre
  public saveDataFilter(obj: any): void {
    this.saveToSession("ECOLIS_PROJET", obj);
  };
  //retourne les données de filtre
  public getDataFilter(): any {
    return this.readFromSession("ECOLIS_PROJET");
  };


  //enregistre les données saisies pour le filtre
  public saveDataProductCategorie(obj: any): void {
    this.saveToSession("WAZINDO_PRODUCT_CATEGORIE", obj);
  };
  //retourne les données de filtre
  public getDataProductCategorie(): any {
    return this.readFromSession("WAZINDO_PRODUCT_CATEGORIE");
  };

  //enregistre les données saisies pour le filtre
  public saveDataLigne(obj: any): void {
    this.saveToSession("ECOLIS_PROJET", obj);
  };
  //retourne les données de filtre
  public getDataLigne(): any {
    return this.readFromSession("ECOLIS_PROJET");
  };



  //enregistre un utilisateur connecte
  public saveUser(obj: any): void {
    this.saveToSession("WAZINDO_USER", obj);
  };
  //retourne un user
  public getUser(): any {
    return this.readFromSession("WAZINDO_USER");
  };



  private saveToSession(key: string, value: any): void {
    // var stringified = JSON.stringify(value);
    // var jsonValue = btoa(stringified);
    // localStorage.setItem(key, jsonValue);

    var stringified = unescape(encodeURIComponent(JSON.stringify(value))); //unescape(encodeURIComponent(str)
    var jsonValue = btoa(stringified);
    localStorage.setItem(key, jsonValue);
  };

  private readFromSession(key: any): any {

    var result = null;
    try {
      var json = localStorage.getItem(key);

      //decodeURIComponent(escape(window.atob(b64)));

      var result = JSON.parse(decodeURIComponent(escape(atob(json))));
    } catch (e) {
      result = null;
    }
    return result;


    // var result = null;
    // try {
    //   var json = localStorage.getItem(key);
    //   var result = JSON.parse(atob(json));
    // } catch (e) {
    //   result = null;
    // }
    // return result;
  };

}

