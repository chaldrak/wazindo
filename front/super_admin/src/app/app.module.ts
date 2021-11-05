import {
  HashLocationStrategy,
  LocationStrategy,
} from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ChartsModule } from "ng2-charts";
// Import 3rd party components
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { TabsModule } from "ngx-bootstrap/tabs";
import { EmbedVideoService } from "ngx-embed-video";
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from "ngx-perfect-scrollbar";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppFooterModule,
  AppHeaderModule,
  AppSidebarModule,
} from "@coreui/angular";
import {
  IconModule,
  IconSetModule,
  IconSetService,
} from "@coreui/icons-angular";
import {
  NgbModal,
  NgbModule,
} from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
// Import routing module
import { AppRoutingModule } from "./app.routing";
// Import containers
import { DefaultLayoutComponent } from "./containers";
import { SharedModule } from "./shared/modules/shared.module";
import { AdminService } from "./shared/services/adminservice/admin.service";
import { AppService } from "./shared/services/app/app.service";
import {
  LocalStorageService,
} from "./shared/services/app/localstorage.service";
import {
  CreateCategorieComponent,
} from "./views/configuration/categories/create-categorie/create-categorie.component";
import {
  EditCategorieComponent,
} from "./views/configuration/categories/edit-categorie/edit-categorie.component";
//configuration
import {
  ListCategorieComponent,
} from "./views/configuration/categories/list-categorie/list-categorie.component";
import {
  EditCommissionComponent,
} from "./views/configuration/commissions/edit-commission/edit-commission.component";
import {
  ListCommissionComponent,
} from "./views/configuration/commissions/list-commission/list-commission.component";
import {
  CreateModesPaiementComponent,
} from "./views/configuration/modespaiement/create-modespaiement/create-modespaiement.component";
import {
  EditModesPaiementComponent,
} from "./views/configuration/modespaiement/edit-modespaiement/edit-modespaiement.component";
import {
  ListModePaiementComponent,
} from "./views/configuration/modespaiement/list-modepaiement/list-modepaiement.component";
import {
  ListNotificationComponent,
} from "./views/configuration/notifications/list-notification/list-notification.component";
import {
  ListSliderComponent,
} from "./views/configuration/sliders/list-slider/list-slider.component";
import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import {
  ListCampagneComponent,
} from "./views/gestion/campagnes/list-campagne/list-campagne.component";
import {
  CreateFinancementSponsorComponent,
} from "./views/Gestion/financementsponsor/create-financementsponsor/create-financementsponsor.component";
import {
  EditFinancementSponsorComponent,
} from "./views/Gestion/financementsponsor/edit-financementsponsor/edit-financementsponsor.component";
import {
  ListFinancementSponsorComponent,
} from "./views/Gestion/financementsponsor/list-financementsponsor/list-financementsponsor.component";
import {
  ListPorteurComponent,
} from "./views/gestion/porteurs/list-porteur/list-porteur.component";
//gestion
import {
  ListProjetComponent,
} from "./views/gestion/projets/list-projet/list-projet.component";
import {
  CreatePubSolidaireComponent,
} from "./views/Gestion/publicitesolidaires/create-pubsolidaire/create-pubsolidaire.component";
import {
  EditPubSolidaireComponent,
} from "./views/Gestion/publicitesolidaires/edit-pubsolidaire/edit-pubsolidaire.component";
import {
  ListPubSolidaireComponent,
} from "./views/gestion/publicitesolidaires/list-pubsolidaire/list-pubsolidaire.component";
import {
  ListSoutienSolidaireComponent,
} from "./views/Gestion/soutiensolidaire/list-soutiensolidaire/list-soutiensolidaire.component";
import {
  CreateSponsorComponent,
} from "./views/Gestion/sponsor/create-sponsor/create-sponsor.component";
import {
  EditSponsorComponent,
} from "./views/Gestion/sponsor/edit-sponsor/edit-sponsor.component";
import {
  ListSponsorComponent,
} from "./views/Gestion/sponsor/list-sponsor/list-sponsor.component";
import { LoginComponent } from "./views/login/login.component";
//plus
import {
  ListAgendaComponent,
} from "./views/plus/agenda/list-agenda/list-agenda.component";
import {
  ModifierProjetComponent,
} from "./views/projet/modifier-projet/modifier-projet.component";
import { RegisterComponent } from "./views/register/register.component";
import {
  CommissionRecolteComponent,
} from "./views/statistiques/commission-recolte/commission-recolte.component";
//statistiques
import {
  StatistiqueGeneraleComponent,
} from "./views/statistiques/statistique-generale/statistique-generale.component";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

@NgModule({
  imports: [
    BrowserModule, SharedModule, PaginationModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule, HttpClientModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule, FormsModule,
    IconModule,
    IconSetModule.forRoot(),
    NgbModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,

    //gestion
    ListProjetComponent, ListCampagneComponent, ListPorteurComponent, ListPubSolidaireComponent,
     EditPubSolidaireComponent, CreatePubSolidaireComponent,

    //statistiques
    StatistiqueGeneraleComponent, CommissionRecolteComponent, CreateCategorieComponent, EditCategorieComponent,

    //parameters
    ListCategorieComponent, ListSliderComponent, ListModePaiementComponent, ListCommissionComponent, ListNotificationComponent,

    //plus
    ListAgendaComponent, EditCommissionComponent, EditModesPaiementComponent, CreateModesPaiementComponent,

    ModifierProjetComponent, ListFinancementSponsorComponent, EditFinancementSponsorComponent, CreateFinancementSponsorComponent,
    CreateSponsorComponent, EditSponsorComponent, ListSponsorComponent,ListSoutienSolidaireComponent

  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    IconSetService, AdminService, AppService, LocalStorageService, EmbedVideoService, NgbModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
