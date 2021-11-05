import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

//  import { ConfigureService } from 'ng4-configure/ng4-configure';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppService } from 'src/app/shared/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class PorteurService {

  constructor(private http: HttpClient, private appService: AppService) {
  }

  //profil connect
  getConnexion(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}auth/login`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getConnexion


  //profil connect
  getResetCompte(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}auth/resetpassword`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getConnexion

  //create profil
  createProfil(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}auth/register`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin createProfil


  //update profil
  deleteProfil(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}auth/deleteProfil`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin updateProfil

  //update profil
  updateProfil(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}auth/updateProfil`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin updateProfil

  //send list projet 
  getListProjetByUser(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/projectsbyuser`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListProjetByUser



  //send message wazindo
  sendMessageWazindo(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}params/contact/sendmessage`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin sendMessageWazindo

  //get profil list
  getListContributeurByProjet(item: string): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/contributeurbyprojet/` + item)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListContributeurByProjet

  //get contributions list
  getListContributionByProjet(item: string): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/contributionbyprojet/` + item)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListContributionByProjet

  //get contributions list
  getListContributionByProfil(item: string): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/contributionbyprofil/` + item)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListContributionByProjet

  //get diffusion list
  getListDiffusionByProfil(item: string): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/diffusion/list/` + item)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListDiffusionByProfil

  //send message wazindo
  getlistMessageByProfil(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/message/list`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getlistMessageByProfil

  //get delete diffusion
  deleteDiffusionByProfil(item: string): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}diffusion/delete` + item)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin deleteDiffusionByProfil


  //update project
  updateProject(item: any): Observable<any> {
    return this.http.put<any[]>(`${this.appService.getBaseUrl()}operations/project`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin updateProject



  //update status
  updateBibliographie(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/projet/updatebibliographie`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin updateBibliographie


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

  //save liste finance
  saveDiffusion(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/listediffusion/create`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin saveListFinance

  //save liste finance
  saveActualite(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/actualite/create`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin saveListFinance


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

  //get liste ligne finance
  getListLigneFinance(item: string): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/lignefinancer/list/` + item)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListLigneFinance

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
  getListStatistiques(item: string): Observable<any> {
    return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/stats/projet/` + item)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin getListStatistiques

}
