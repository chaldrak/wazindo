import {
  HttpClient,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";

//  import { ConfigureService } from 'ng4-configure/ng4-configure';
import {
  Observable,
  of,
} from "rxjs";

// import {ToastrService} from "ngx-toastr";
import { environment } from "../../../../environments/environment";

@Injectable()
export class AppService {

  private IDLE_DURATION = 1800; private TIME_OUT = 3600; private KEEP_ALIVE = 1800;


  private apiUrl = environment.apiUrl;





  // private ressourceUrl = environment.ressourceUrl; 




  //private headers = new Headers({'Content-Type': 'application/json'});
  private fileUrl = "http://localhost:3000/it/files/";
  private uploadLogoUrl = "http://localhost:3000/it/files/";

  public httpOptions: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  public pdfOptions: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/pdf'} )  } ;


  constructor(private http: HttpClient
  ) {
  }

  getBaseUrl() : string{
    return this.apiUrl;
  }// fin getBaseUrl

  // getHeaders() : Headers{
  //   return this.headers;
  // }//fin getHeaders


  // getFileUrl() : string{
  //   return this.ressourceUrl +"compagnies/";
  // }//fin getResourceUrl

  getLogoUploadUrl() : string{
    return this.apiUrl + "resource/uploadlogo";
  }//fin getLogoUploadUrl

  getPhotoUploadUrl() : string{
    return this.apiUrl + "resource/uploadphoto";
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


}

