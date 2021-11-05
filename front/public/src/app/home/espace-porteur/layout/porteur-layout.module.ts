import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import {PaginatorModule} from 'primeng/paginator';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';

import {
  DashboardComponent,
} from '../components/main/accueil/dashboard/dashboard.component';
import {
  AfficherContributionComponent,
} from '../components/main/activite/contibution/afficher-contribution/afficher-contribution.component';
import {
  AfficherContributeurComponent,
} from '../components/main/activite/contributeur/afficher-contributeur/afficher-contributeur.component';
import {
  EcrireContributeurComponent,
} from '../components/main/activite/contributeur/ecrire-contributeur/ecrire-contributeur.component';
import {
  AfficherProjetComponent,
} from '../components/main/activite/projet/afficher-projet/afficher-projet.component';
import {
  DetailProjetComponent,
} from '../components/main/activite/projet/detail-projet/detail-projet.component';
import {
  ProposerProjetComponent,
} from '../components/main/activite/projet/proposer_projet/proposer-projet.component';
import {
  AuthComponent,
} from '../components/main/auth/connexion/auth.component';
import {
  CreationCompteComponent,
} from '../components/main/auth/creation-compte/creation-compte.component';
import {
  ConfiguerNotificationComponent,
} from '../components/main/contact/configuer-notification/configuer-notification.component';
import {
  AfficherListeDiffusionComponent,
} from '../components/main/contact/liste-diffusion/afficher-liste-diffusion/afficher-liste-diffusion.component';
import {
  CreerListeDiffusionComponent,
} from '../components/main/contact/liste-diffusion/creer-liste-diffusion/creer-liste-diffusion.component';
import {
  AfficherListeMessageComponent,
} from '../components/main/contact/liste-message/afficher-liste-message/afficher-liste-message.component';
import {
  MessageWazindoComponent,
} from '../components/main/contact/message-wazindo/message-wazindo.component';
import {
  PartageMessagerieComponent,
} from '../components/main/contact/partage-message/partage-message.component';
import {
  ModifierProfilComponent,
} from '../components/main/securite/modifier-profil/modifier-profil.component';
import {
  SupprimerCompteComponent,
} from '../components/main/securite/supprimer-compte/supprimer-compte.component';
import {
  StatistiquesProjetComponent,
} from '../components/main/statistique/statistiques-projet/statistiques-projet.component';
import { ConfirmDialogModule } from '../../../shared/services/confirm-dialog/confirm-dialog.module';
// import {OverlayPanelModule} from 'primeng/overlaypanel';
// import { TabViewModule } from "primeng/tabview";
// import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { CarouselModule } from 'primeng/carousel';
// import {ButtonModule} from 'primeng/button';
// import {ToastModule} from 'primeng/toast';
// import { NgxSpinnerModule } from 'ngx-spinner';
// import { SharedModule } from '../shared/modules/shared.module';
import { PorteurLayoutRoutes } from './porteur-layout.routing';
import { RecuperationComponent } from '../components/main/auth/mdp-oublie/recuperation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ConfirmDialogModule,
    RouterModule.forChild(PorteurLayoutRoutes)
  ],
  declarations: [

    DashboardComponent, AfficherContributeurComponent, AfficherContributionComponent, AuthComponent, RecuperationComponent,
    AfficherProjetComponent, ConfiguerNotificationComponent, EcrireContributeurComponent, PartageMessagerieComponent,
    AfficherListeDiffusionComponent, CreerListeDiffusionComponent, MessageWazindoComponent, AfficherListeMessageComponent,
    ModifierProfilComponent, StatistiquesProjetComponent, SupprimerCompteComponent, DetailProjetComponent,
    ProposerProjetComponent, CreationCompteComponent

  ]

})
export class PorteurLayoutModule { }
