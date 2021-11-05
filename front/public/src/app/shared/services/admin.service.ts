import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//  import { ConfigureService } from 'ng4-configure/ng4-configure';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import {environment} from "../../../../environments/environment.prod";
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private appService: AppService) {
  }

  //authenticate
  authenticate(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}auth/login`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin authenticate


  ///////////////////////////////////////////////////////clients////////////////////////////////////////////

  //liste clients
  getListClients(): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/customers`)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListClients 

  //create client
  createClient(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/customer`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin createClient 

  //delete client
  deleteClient(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/customer/remove`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin deleteClient 


  ///////////////////////////////////////////////////////Lignes////////////////////////////////////////////
  //liste ligne
  getListLigne(): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/lignelist`)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListLigne 


  ///////////////////////////////////////////////////////produits////////////////////////////////////////////

  //send list projet 
  getListProjetByUser(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/listproject`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListProjetByUser 

  //liste produits
  getListProduits(): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/products`)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListProduits 

  //create product
  createProduit(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/product`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin createProduit 

  //delete produit
  deleteProduit(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/product/remove`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin deleteProduit 



  ///////////////////////////////////////////////////////commandes////////////////////////////////////////////


  //liste commandes
  getListCommandes(): Observable<any> {

    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/command`)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListCommandes 

  //create commande
  createCommande(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/command`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin createCommande 

  //delete commande
  deleteCommande(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/command/remove`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin deleteCommande 

  //send commentaire
  sendCommentaire(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/saveCommande`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin sendCommentaire 

  //send commentaire
  sendMailContact(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/contact/sendmessage`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin sendCommentaire 


  //suivi commandes
  getSuiviCommandes(codeSuivi: string): Observable<any> {

    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/command/suivi/${codeSuivi}`)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getSuiviCommandes 


 



}
