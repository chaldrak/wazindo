import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UrlSerializer } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';
//import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import {
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElementsComponent } from './elements/elements.component';
import { PagesComponent } from './pages/pages.component';
import { AdminService } from './shared/services/admin.service';
import { AppService } from './shared/services/app.service';
import { CustomUrlSerializer } from './shared/services/custom-url-serializer';
import { LocalStorageService } from './shared/services/localstorage.service';
import {
  PorteurService,
} from './shared/services/porteur-service/porteur.service';
import {
  ProvidersService,
} from './shared/services/providers/providers.service';
import { PublicService } from './shared/services/public.service';
import { SharedModule } from './shared/shared.module';
import { ShopComponent } from './shop/shop.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    PagesComponent,
    ElementsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,ReactiveFormsModule,
    HttpClientModule, ModalModule.forRoot(),
    NgbModule,
    //NgxSpinnerModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: false,
      enableHtml: true,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    //NgImageSliderModule,
    SharedModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [AdminService, AppService, LocalStorageService, PublicService, PorteurService,
    { provide: UrlSerializer, useClass: CustomUrlSerializer },
    { provide: HTTP_INTERCEPTORS, useClass: ProvidersService, multi: true }


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
