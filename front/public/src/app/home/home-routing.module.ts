import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  UrlSerializer,
} from '@angular/router';

import {
  UrlSerializerService,
} from '../shared/services/url-serializer.service';
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

const routes: Routes = [
  {
    path: 'accueil',
    component: WazindoComponent, // AccueilVoitureComponent
  },

  {
    path: 'soumettre-projet',
    component: SoumettreProjetComponent
  },

  {
    path: 'projets',
    component: NosProjetsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent
  },

  {
    path: 'pub-solidaire',
    component: PubSolidaireComponent
  },

  {
    path: 'detail-projet/:slug',
    component: DetailProjetComponent
  },

  {
    path: 'contribution-projet/:slug',
    component: ContributionProjetComponent

  },
  {
    path: 'contribution-paiement/:slug',
    component: ContributionPaiementComponent
  },
  {
    path: 'contribution-validation/transaction_id/:slug',
    component: ContributionValidationComponent
  },
  {
    path: 'test/transaction_id/:slug',
    component: ContributionValidationComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: UrlSerializer,
      useClass: UrlSerializerService
    }
  ]
})
export class HomeRoutingModule { }
