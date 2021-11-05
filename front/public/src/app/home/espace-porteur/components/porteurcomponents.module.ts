import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import {
  DashboardComponent,
} from './main/accueil/dashboard/dashboard.component';
import {
  AfficherContributionComponent,
} from './main/activite/contibution/afficher-contribution/afficher-contribution.component';
import {
  AfficherContributeurComponent,
} from './main/activite/contributeur/afficher-contributeur/afficher-contributeur.component';
import {
  EcrireContributeurComponent,
} from './main/activite/contributeur/ecrire-contributeur/ecrire-contributeur.component';
import {
  AfficherProjetComponent,
} from './main/activite/projet/afficher-projet/afficher-projet.component';
import {
  ProposerProjetComponent,
} from './main/activite/projet/proposer_projet/proposer-projet.component';
import {
  ConfiguerNotificationComponent,
} from './main/contact/configuer-notification/configuer-notification.component';
import {
  AfficherListeDiffusionComponent,
} from './main/contact/liste-diffusion/afficher-liste-diffusion/afficher-liste-diffusion.component';
import {
  CreerListeDiffusionComponent,
} from './main/contact/liste-diffusion/creer-liste-diffusion/creer-liste-diffusion.component';
import {
  AfficherListeMessageComponent,
} from './main/contact/liste-message/afficher-liste-message/afficher-liste-message.component';
import {
  MessageWazindoComponent,
} from './main/contact/message-wazindo/message-wazindo.component';
import {
  PartageMessagerieComponent,
} from './main/contact/partage-message/partage-message.component';
import {
  ModifierProfilComponent,
} from './main/securite/modifier-profil/modifier-profil.component';
import {
  SupprimerCompteComponent,
} from './main/securite/supprimer-compte/supprimer-compte.component';
import {
  StatistiquesProjetComponent,
} from './main/statistique/statistiques-projet/statistiques-projet.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule, FormsModule,
    SharedModule,
  ],
  declarations: [
   
    ConfiguerNotificationComponent,PartageMessagerieComponent,
    AfficherListeDiffusionComponent,AfficherListeMessageComponent,
    CreerListeDiffusionComponent,
    MessageWazindoComponent,
    ModifierProfilComponent,
    AfficherProjetComponent,
    AfficherContributeurComponent,
    AfficherContributionComponent,
    EcrireContributeurComponent,
    StatistiquesProjetComponent,
    SupprimerCompteComponent,
    DashboardComponent,
    ProposerProjetComponent
  ],
  exports: [
  
  ]
 
})
export class PorteurComponentsModule { }
