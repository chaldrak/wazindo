import { Routes } from '@angular/router';

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
import { RecuperationComponent } from '../components/main/auth/mdp-oublie/recuperation.component';
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

export const PorteurLayoutRoutes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'afficher_contributeurs', component: AfficherContributeurComponent },
  { path: 'afficher_contributions', component: AfficherContributionComponent },
  { path: 'afficher_projets', component: AfficherProjetComponent },
  { path: 'configurer_notification', component: ConfiguerNotificationComponent },
  { path: 'ecrire_contributeurs', component: EcrireContributeurComponent },
  { path: 'afficher_liste_diffusion', component: AfficherListeDiffusionComponent },
  { path: 'afficher_liste_message', component: AfficherListeMessageComponent },
  { path: 'partage_message', component: PartageMessagerieComponent },
  { path: 'creer_liste_diffusion', component: CreerListeDiffusionComponent },
  { path: 'ecrire_wazindo', component: MessageWazindoComponent },
  { path: 'modifier_profil', component: ModifierProfilComponent },
  { path: 'statistiques_projets', component: StatistiquesProjetComponent },
  { path: 'detail_projets', component: DetailProjetComponent },
  { path: 'supprimer_compte', component: SupprimerCompteComponent },
  { path: 'proposer_projet', component: ProposerProjetComponent },
  { path: 'creer-compte', component: CreationCompteComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'recuperation-compte', component: RecuperationComponent },


];
