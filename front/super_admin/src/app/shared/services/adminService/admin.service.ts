import {
  HttpClient,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";

//  import { ConfigureService } from 'ng4-configure/ng4-configure';
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { AppService } from "../app/app.service";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private appService: AppService) {
  }

  //profil connect
  getConnexion(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}auth/login`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getConnexion

  //commission update
  updateCommission(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}config/commissionupdate`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin updateCommission


  //send list projet 
  getListProjetByUser(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/listproject`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListProjetByUser 

  //save update status projet 
  saveUpdateStatusProjet(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/updatestatusprojet`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin saveUpdateStatusProjet 

  //save rejet projet 
  saveRejetProjet(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/rejetprojet`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin saveRejetProjet 

  //liste campagnes
  getListCampagnes(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}parameters/campagnes`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListCampagnes 

  //liste porteur
  getListPorteurs(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}parameters/porteurs`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListporteurs

  //liste projets
  getListProjets(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}parameters/projets`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListProjets 

  //liste publicitesolidaires
  getListPubliciteSolidaires(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}parameters/publicitesolidaires`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListPubliciteSolidaires 





  ////////////////////////////////////////////////////////statistiques services////////////////////////////////////////////


  //liste statistiqueGenerale
  getListStatistiqueGenerales(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}stats/statistiquesgenerales`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListStatistiqueGenerales 


  ////////////////////////////////////////////////////////config services////////////////////////////////////////////

  //liste categories
  getListCategories(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}parameters/categories`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListCategories 

  //liste commissions
  getListCommissions(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}parameters/commissions`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListCommissions

  //liste modepaiements
  getListModepaiements(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}parameters/modepaiements`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListModepaiements

  //liste notifications
  getListNotifications(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}parameters/notifications`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListNotifications 

  //liste sliders
  getListSliders(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}parameters/sliders`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListsliders  	

  ///////////////////////////////////////////////////////plus services////////////////////////////////////////////
  //liste agenda
  getListAgenda(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}parameters/agenda`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListAgenda 



  //update project
  updateProject(item: any): Observable<any> {
    return this.http.put<any[]>(`${this.appService.getBaseUrl()}operations/project`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin updateProject



  //update status
  validateProject(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/projet/updatestatus`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin validateProject


  //save liste finance
  saveLigneFinance(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/lignefinancer/create`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin saveListFinance

  //save mode paiement
  modePaiementCreate(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/modepaiementcreate`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin modePaiementCreate

  //edit mode paiement
  modePaiementEdit(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/modepaiementedit`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin modePaiementEdit

  //edit categorie
  categorieDelete(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/categoriedelete`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin categorieEdit

  //edit categorie
  categorieEdit(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/categorieedit`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin categorieEdit

  //delete mode paiement
  modePaiementDelete(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/modepaiementdelete`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin modePaiementDelete


  //save Proposition Projet
  saveContrepartie(fileToUpload: any, item: any): Observable<any> {
    const input: FormData = new FormData();
    if (fileToUpload !== null && fileToUpload !== undefined) {
      input.append("file", fileToUpload);
    }
    input.append("data", JSON.stringify(item));

    let localHeaders: any = new HttpHeaders({
      Accept: 'application/json'
    });
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/contrepartie/create`, input, { headers: localHeaders })
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin saveContrepartie

  //save categorie
  saveCategorie(fileToUpload: any, item: any): Observable<any> {
    const input: FormData = new FormData();
    if (fileToUpload !== null && fileToUpload !== undefined) {
      input.append("file", fileToUpload);
    }
    input.append("data", JSON.stringify(item));

    let localHeaders: any = new HttpHeaders({
      Accept: 'application/json'
    });
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/categoriecreate`, input, { headers: localHeaders })
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin saveCategorie

  //get liste ligne finance
  getListCategorie(): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/categorielist`)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListCategorie

  //get liste ligne finance
  getListPorteurProjet(): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/porteurprojet`)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListCategorie

  //get liste ligne finance
  getListLigneFinance(item: string): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/lignefinancer/list/` + item)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListLigneFinance

  //get liste mode paiement
  getListModePaiement(): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/modepaiementlist`)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListModePaiement

  //get liste stat general
  getListProjetStat(): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/stats/projetlist`)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListProjetStat

  //get liste stat general
  getListProjet(): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/projetlist`)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListProjetStat

  //delete mode paiement
  getListProjetStatCommission(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/stats/projetlist/commission`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListProjetStatCommission


  //save Document
  saveDocument(fileToUpload: any, item: any): Observable<any> {
    const input: FormData = new FormData();
    if (fileToUpload !== null && fileToUpload !== undefined) {
      input.append("file", fileToUpload);
    }
    input.append("data", JSON.stringify(item));

    let localHeaders: any = new HttpHeaders({
      Accept: 'application/json'
    });
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/document/create`, input, { headers: localHeaders })
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin saveDocument


  //get liste ligne finance
  getListContrepartie(item: string): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/contrepartie/list/` + item)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListLigneFinance

  //get delete ligne finance
  deleteLigneFinance(item: string): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/lignefinancer/delete/` + item)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin deleteLigneFinance

  //get delete ligne finance
  deleteContrepartie(item: string): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/contrepartie/delete/` + item)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin deleteLigneFinance

  //get delete ligne finance
  getListCommission(): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}config/commissionlist`)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListCommission


  // Sponsor ////

  //get delete ligne finance
  sponsorDelete(item: string): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/sponsor/deletesponsor/` + item)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin deleteLigneFinance

  //get delete ligne finance
  getListSponsor(): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/sponsor/listsponsor`)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListCommission

  //delete mode paiement
  createSponsor(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/sponsor/createsponsor`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin createSponsor

  //delete mode paiement
  editSponsor(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/sponsor/editsponsor`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin editSponsor

  //// End sponsor /////////////

  //get delete ligne finance
  getListSoutienSolidaire(): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/soutiensolidaire/listsoutiensolidaire`)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListSoutienSolidaire

  //get delete ligne finance
  getListFinancementSponsor(): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/financementsponsor/listfinancementsponsor`)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListFinancementSponsor


  //delete mode paiement
  createFinancementSponsor(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/financementsponsor/createfinancementsponsor`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin createFinancementSponsor

  //delete mode paiement
  editFinancementSponsor(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/financementsponsor/editfinancementsponsor`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin editFinancementSponsor

  //get delete ligne finance
  FinancementSponsorDelete(item: string): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/financementsponsor/deletefinancementsponsor/` + item)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin FinancementSponsorDelete

  //// End sponsor /////////////

  //get delete ligne finance
  getListPubSolidaire(): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/pubsolidaire/listpubsolidaire`)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListPubSolidaire

  //save Document
  createPubSolidaire(fileToUpload: any, item: any): Observable<any> {
    const input: FormData = new FormData();
    if (fileToUpload !== null && fileToUpload !== undefined) {
      input.append("file", fileToUpload);
    }
    input.append("data", JSON.stringify(item));

    let localHeaders: any = new HttpHeaders({
      Accept: 'application/json'
    });
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/pubsolidaire/createpubsolidaire`, input, { headers: localHeaders })
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin createPubSolidaire


  //delete mode paiement
  editPubSolidaire(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/pubsolidaire/editpubsolidaire`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin editPubSolidaire

  //get delete ligne finance
  PubSolidaireDelete(item: string): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/pubsolidaire/deletepubsolidaire/` + item)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin PubSolidaireDelete

}
