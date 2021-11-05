import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppService } from './app.service';

@Injectable()
export class PublicService {

  constructor(private http: HttpClient, private appService: AppService) {
  }

//get statistique liste
getListStatistiques() : Observable<any> {
  return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/stats/global`)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}//fin getListStatistiques

//get statistique liste
getListCategorieProjet() : Observable<any> {
  return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/categorieprojetlist`)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}//fin getListCategorieProjet

 //get liste project published
 getListProjetpublished(item: any) : Observable<any> {
  return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/projects/published`, item, this.appService.httpOptions)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}//fin getListProjetpublished

 //get delete ligne finance
 getListPubSolidaire(): Observable<any> {
  return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/pubsolidaire/listpubsolidaire`)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}//fin getListPubSolidaire

//get statistique liste
getListOrganisationProjet() : Observable<any> {
  return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/oganisationprojetlist`)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}//fin getListOrganisationProjet

//get statistique liste
getListPays() : Observable<any> {
  return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/payslist`)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}//fin getListPays

//get statistique liste
getListDepartementByPays() : Observable<any> {
  return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/listdepartementbypays`)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}//fin getListDepartementByPays

//get statistique liste
getListCommuneByDepartement(item : string) : Observable<any> {
  return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/listcommunebydepartement/`+item)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}//fin getListCommuneByDepartement


   //save Proposition Projet
   savePropositionProjet(fileToUpload : any,item: any) : Observable<any> {
    const input: FormData = new FormData();
    if(fileToUpload !== null && fileToUpload !== undefined){
      input.append("file", fileToUpload);
    }
    input.append("data", JSON.stringify(item));

    let localHeaders: any = new HttpHeaders({
      Accept: 'application/json'
    });
      return this.http.post<any[]>(`${this.appService.getBaseUrl()}operation/savepropositionprojet`, input, {headers: localHeaders})
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
  }//fin savePropositionProjet


   //update profil
   sendMailProjet(fileToUpload : any,item: any) : Observable<any> {
    const input: FormData = new FormData();
    if(fileToUpload !== null && fileToUpload !== undefined){
      input.append("file", fileToUpload);
    }
    input.append("data", JSON.stringify(item));

    let localHeaders: any = new HttpHeaders({
      Accept: 'application/json'
    });
      return this.http.post<any[]>(`${this.appService.getBaseUrl()}operation/sendmailprojet`, input, {headers: localHeaders})
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
  }//fin updateProfil

 //create profil
 createCommentaire(item: any) : Observable<any> {
  return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/commentaire/create`, item, this.appService.httpOptions)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}//fin createCommentaire

 //create profil
 sendMessageContact(item: any) : Observable<any> {
  return this.http.post<any[]>(`${this.appService.getBaseUrl()}params/contact/messagecontact`, item, this.appService.httpOptions)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}//fin sendMessageContact

//get projet par categories liste
getListProjetByCategory() : Observable<any> {
  return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/projectsbycategories`)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}//fin getListProjetByCategory

//get pub solidaire liste
getLastPubSolidaire() : Observable<any> {
  return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/pub/latest`)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}//fin getLastPubSolidaire

// //get pub solidaire liste
// getListPubSolidaire() : Observable<any> {
//   return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/pub/list`)
//     .pipe(
//       catchError(this.appService.handleError<any[]>(``))
//     )
// }//fin getLastPubSolidaire

//get pub solidaire liste
getListProjet() : Observable<any> {
  return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/category/{id}/projects`)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}//fin getLastPubSolidaire

// get Projects Categories
getProjectsCategories() : Observable<any> {
  return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/projects/categories`)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}//fin getProjectsCategories

// get Projects Categories
getListActualiteByProject(item: string) : Observable<any> {
  return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/projects/actualite/`+item)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}//fin getListActualiteByProject

// get Projects Categories
getListCommenatireByProject(item: string) : Observable<any> {
  return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/projects/comments/`+item)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}//fin getProjectsCategories

// get Projects Categories
getListInfoDetailProject(reference: string) : Observable<any> {
  return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/projects/${reference}/details`)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}//fin getProjectsCategories

// get Projects Categories
getListLastCommenatireByProject(item: string) : Observable<any> {
  return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/projects/commentslast/`+item)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}//fin getProjectsCategories

// get Projects Categories
getProjectsPublishedCategories() : Observable<any> {
  return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/categories/stats/projectspublished`)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}//fin getProjectsCategories

//get Last Projects
getLatestProjects() : Observable<any> {
  return this.http.get<any[]>(`${this.appService.getBaseUrl()}operations/projects/latest`)
    .pipe(
      catchError(this.appService.handleError<any[]>(``))
    )
}
//fin getLatestProjects


   //pay contribution
   payContribution(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/projects/support`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin payContribution 


   //pay contribution
   updatePartagePubSolidaire(item: any): Observable<any> {
    return this.http.post<any[]>(`${this.appService.getBaseUrl()}operations/pubsolidaire/updateaftervisualisation`, item, this.appService.httpOptions)
      .pipe(
        catchError(this.appService.handleError<any[]>(``))
      )
  }//fin updatePartagePubSolidaire 

}
