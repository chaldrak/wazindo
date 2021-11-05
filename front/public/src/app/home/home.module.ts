import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { WazindoComponent } from './wazindo/accueil/accueilwazindo.component';
import { ContactComponent } from './wazindo/contact/contact.component';
import {
  ContributionPaiementComponent,
} from './wazindo/contributions/contribution-paiement/contribution-paiement.component';
import {
  ContributionProjetComponent,
} from './wazindo/contributions/contribution-projet/contribution-projet.component';
import {
  ContributionValidationComponent,
} from './wazindo/contributions/contribution-validation/contribution-validation.component';
import {
  DetailProjetComponent,
} from './wazindo/detail-projet/detail-projet.component';
import {
  NosProjetsComponent,
} from './wazindo/nos-projets/nos-projets.component';
import {
  PubSolidaireComponent,
} from './wazindo/pub-solidaire/pub-solidaire.component';
import {
  SoumettreProjetComponent,
} from './wazindo/soumettre-projet/soumettre-projet.component';
import { BlogComponent } from './widgets/blog/blog.component';
import { CollectionComponent } from './widgets/collection/collection.component';
import { InstagramComponent } from './widgets/instagram/instagram.component';
import { LogoComponent } from './widgets/logo/logo.component';
import { ProjectComponent } from './widgets/project/project.component';
import { ServicesComponent } from './widgets/services/services.component';
// Widgest Components
import { SliderComponent } from './widgets/slider/slider.component';

@NgModule({
  declarations: [
    SoumettreProjetComponent,
    ContactComponent,
    WazindoComponent,
    PubSolidaireComponent,

    // Widgest Components
    SliderComponent,
    BlogComponent,
    ProjectComponent,
    LogoComponent,
    InstagramComponent,
    ServicesComponent,
    CollectionComponent,
    DetailProjetComponent, NosProjetsComponent,
    ContributionProjetComponent,
    ContributionPaiementComponent,
    ContributionValidationComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ], providers: [


  ],
})
export class HomeModule { }
