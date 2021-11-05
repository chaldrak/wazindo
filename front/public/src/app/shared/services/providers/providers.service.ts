import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';

import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';

import { Token } from '../../models/token/token';
import { AppService } from '../app.service';
import { JwtHelperService } from '../jwt-helper/jwt-helper.service';
import { LocalStorageService } from '../localstorage.service';
import { UtilsService } from '../utils/utils.service';

@Injectable({
	providedIn: 'root'
})
export class ProvidersService {

	// tslint:disable-next-line:max-line-length
	constructor(private localStorageService: LocalStorageService,private router: Router, private appService: AppService, private jwtHelper: JwtHelperService, private utilsService: UtilsService) {

	}

	// Intercepts all HTTP requests!
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		let promise = this.localStorageService.getApiToken();

		let clonedReq = request;
		if(request.url !== 'http://localhost:8000/api/v1/live/operations/payslist'){
						//continue operation
				//clonedReq = this.addToken(request, token);

				//test 

				
		}


		return next.handle(clonedReq).pipe(
			catchError(error => {
				// Perhaps display an error for specific status codes here already?
				let msg = error.message;
				let title = error.name;


				//if request denied, issuenew token
				if (error.status === 401) {
					//refresh login
					this.router.navigate(['/porteur/auth']);
				}

				// Pass the error to the caller of the function
				return throwError(error);
			})
		);

		
	}



	// Adds the token to your headers if it exists
	private addToken(request: HttpRequest<any>, token: any) {

		if (token === undefined || token === null) {
			//this.getTokenValue();
			//return request;
		}

		let accesToken: any = `87659a66af4f48558ffa1e290b793220`; // token.access_key;

		if (accesToken) {
			let clone: HttpRequest<any>;
			clone = request.clone({
				setHeaders: {
					Accept: `application/json`,
					'Content-Type': `application/json`,
					//Authorization: `GfastSK ${ accesToken }`,
					'WazindoSK': `${accesToken}`,
				}
			});
			return clone;
		}

		return request;
	}//end addToken





	//method to be removed
	async getTokenValue() {
		let tokenRequestParam = {
			'grant_type': 'password',
			'username': 'test',
			'password': 'ok'
		};

		//let loader = await this.utilsService.presentLoader('Veuillez patienter...');
		this.appService.token(tokenRequestParam).subscribe(
			result => {

				let token: Token = this.utilsService.createTokenCopy(result);

				this.localStorageService.saveApiToken(token);

			},
			(err: any) => {
				//loader.dismiss();

				//this.utilsService.presentAlert('Une erreur est survenue', 'Echec');
			}
		);
	} //end getTokenValue
}


