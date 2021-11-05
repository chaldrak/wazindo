// import { Injectable } from '@angular/core';
// import { AlertController } from '@ionic/angular';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Storage } from '@ionic/storage';

// import { Observable } from 'rxjs';
// import 'rxjs/add/observable/fromPromise';
// import 'rxjs/add/operator/mergeMap';
// import { throwError } from 'rxjs/internal/observable/throwError';
// import { catchError, mergeMap } from 'rxjs/operators';
// import { title } from 'process';
// import { StorageService } from 'src/app/services/storage/storage.service';
// import { ApiService } from 'src/app/services/api/api.service';
// import { JwtHelperService } from 'src/app/services/jwt-helper/jwt-helper.service';
// import { UtilsService } from '../utils/utils.service';
// import { Token } from '../../models/token/token';


// @Injectable({
//   providedIn: 'root'
// })
// export class ProvidersService {

//     constructor(private storage: Storage, private alertCtrl: AlertController, private storageService: StorageService, 
// 		private apiService: ApiService, private jwtHelper: JwtHelperService, private utilsService: UtilsService,) { 

//     }

//     // Intercepts all HTTP requests!
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		
		
// 		console.log(next);
		
// 		let promise = this.storageService.getApiToken();
//         return Observable.fromPromise(promise)
//             .mergeMap( (token: Token) => {
				
// 				//continue operation
//                 let clonedReq = this.addToken(request, token);
				
// 				console.log(next);
				
//                 return next.handle(clonedReq).pipe(  catchError(error => {
//                         let msg = error.message;  let title = error.name; // Perhaps display an error for specific status codes here already?
// 						if(error.status === 401){ //if request denied, issuenew token
// 							//refresh login
// 							let tokenRequestParam = { 'grant_type': 'password',	'username': 'Boa_Login1',	'password': 'Boa_Login_pwd1'	}; //start refresh token
// 							this.apiService.token(tokenRequestParam).subscribe(  result => {
// 									let token: Token = this.utilsService.createTokenCopy(result);	this.storageService.saveApiToken(token);	},	(err: any) => {	console.log(err);});
// 							//end refresh token
// 						}
//                         return throwError(error); // Pass the error to the caller of the function
//                     }) );
//             });
//     }//end intercept




//     // Adds the token to your headers if it exists
//     private addToken(request: HttpRequest<any>, token: any) {
		
// 				let shouldRefresh: boolean = false;
// 				//if first time and no token yet
// 				if(token === undefined || token === null){  shouldRefresh = true; }else{
// 					//check the field expires, and if time has already expired, ask for new token, with await, before continue
// 					let currentDate: Date = new Date(); 	if(currentDate.getTime()  > token.date_expiration.getTime()){	shouldRefresh = true;	}
// 				}
				
// 				//check and refresh 
// 				if(shouldRefresh === true){
// 							//start refresh token
// 							let tokenRequestParam = { 'grant_type': 'password',	'username': 'Boa_Login1',	'password': 'Boa_Login_pwd1'	};
// 							this.apiService.token(tokenRequestParam).subscribe(  (result: any) => {	
// 								//get the token and save it
// 								let token: Token = this.utilsService.createTokenCopy(result);	this.storageService.saveApiToken(token);
								
// 								//now, use the token
// 								let accesToken: any = token.access_key;
// 								if (accesToken) {
// 									let clone: HttpRequest<any>;    clone = request.clone({   setHeaders: {   Accept: `application/json`,  'Content-Type': `application/json`,  Authorization: `Bearer ${ accesToken }`   }   });
// 									return clone;
// 								}
// 								return request;
// 							},	(err: any) => {	console.log(err);});
// 							//end refresh token
// 				}else{
// 								return request;
// 				}
//     }//end addToken
	
	
	
	
	
// 	  //method to be removed
//   /*async getTokenValue() {
// 		let tokenRequestParam = {	'grant_type': 'password',  'username': 'Boa_Login1',  'password': 'Boa_Login_pwd1'	};
				
// 		//let loader = await this.utilsService.presentLoader('Veuillez patienter...');
// 		this.apiService.token(tokenRequestParam).subscribe(
// 			result => {
// 				let token: Token = this.utilsService.createTokenCopy(result);
// 				this.storageService.saveApiToken(token);
// 			},	(err: any) => {	console.log(err);	}
// 		);
// 	}*/ //end getTokenValue
	
// }


