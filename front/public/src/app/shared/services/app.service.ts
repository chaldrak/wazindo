import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

//  import { ConfigureService } from 'ng4-configure/ng4-configure';
import {
  from,
  Observable,
  of,
} from 'rxjs';
import { map } from 'rxjs/operators';

// import {ToastrService} from "ngx-toastr";
import { environment } from '../../../environments/environment';

@Injectable()
export class AppService {

  private IDLE_DURATION = 1800; private TIME_OUT = 3600; private KEEP_ALIVE = 1800;


  private apiUrl = environment.apiUrl;
  private wazindoUrl = environment.wazindoUrl;





  // private ressourceUrl = environment.ressourceUrl; 




  //private headers = new Headers({'Content-Type': 'application/json'});
  private fileUrl = 'http://localhost:3000/it/files/';
  private uploadLogoUrl = 'http://localhost:3000/it/files/';

  public httpOptionsAuth: any = {
    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Accept': 'application/json, text/plain'};
 
  public httpOptions: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  public pdfOptions: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/pdf'} )  } ;

  headers: any = {};
  constructor(private http: HttpClient
  ) {
  }

  getBaseUrl() : string{
    return this.apiUrl;
  }// fin getBaseUrl

  // getHeaders() : Headers{
  //   return this.headers;
  // }//fin getHeaders


  getPaiementUrl() : string{
    return this.wazindoUrl +'home/contribution-validation';
  }//fin getPaiementUrl

  getLogoUploadUrl() : string{
    return this.apiUrl + 'resource/uploadlogo';
  }//fin getLogoUploadUrl

  getPhotoUploadUrl() : string{
    return this.apiUrl + 'resource/uploadphoto';
  }//fin getPhotoUploadUrl

    getIdleDuration() : number{
    return this.IDLE_DURATION;
  }//fin getIdleDuration

    getTimeOut() : number{
    return this.TIME_OUT;
  }//fin getTimeOut

    getKeepAlive() : number{
    return this.KEEP_ALIVE;
  }//fin getKeepAlive


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure or something like that
      //console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //console.log(`${operation} failed: ${error.message}`);

      //show error
      //let errorMsg: string = "Une erreur est survenue lors de cette opération. Veuillez vérifier votre connexion et réessayer";
      //this.toastr.error(errorMsg, "Erreur", {positionClass: 'toast-top-center'});

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //creation d'un token
token(data: any): Observable<any> {
  this.headers = { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' };
  const params = new HttpParams({ fromObject: data });
  return from(this.http.post(`${this.apiUrl}OAuth`, params.toString(), this.headers ))
      .pipe(map((data) => { return data }, this)); //.json()
}//fin token


}

