import { NgModule } from "@angular/core";
import {
  RouterModule,
  Routes,
} from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";
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

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Accueil'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },



      //menu gestion

      //sous menus campagnes
      {
        path: 'list-campagne',
        component: ListCampagneComponent,
        data: {
          title: 'Liste Campagnes'
        }
      },
      {
        path: 'modifier-campagne',
        component: ModifierProjetComponent,
        data: {
          title: 'Modifier Campagne'
        }
      },

      //sous menus projet
      {
        path: 'list-projet',
        component: ListProjetComponent,
        data: {
          title: 'Liste Projet'
        }
      },
      {
        path: 'modifier-projet',
        component: ModifierProjetComponent,
        data: {
          title: 'Modifier Projet'
        }
      },

      //sous menu porteurs
      {
        path: 'list-porteur',
        component: ListPorteurComponent,
        data: {
          title: 'Liste Porteurs'
        }
      },

      //sous menus pub solidaire
      {
        path: 'list-pubsolidaire',
        component: ListPubSolidaireComponent,
        data: {
          title: 'Liste Publicités Solidaires'
        }
      },

      //sous menus pub solidaire
      {
        path: 'edit-pubsolidaire',
        component: EditPubSolidaireComponent,
        data: {
          title: 'Modifier Publicité Solidaire'
        }
      },

      //sous menus pub solidaire
      {
        path: 'creer-pubsolidaire',
        component: CreatePubSolidaireComponent,
        data: {
          title: 'Créer Publicité Solidaire'
        }
      },

      //menu statistiques
      {
        path: 'statistique-generale',
        component: StatistiqueGeneraleComponent,
        data: {
          title: 'Statistiques Générales'
        }
      },

      //menu statistiques
      {
        path: 'commission-recolte',
        component: CommissionRecolteComponent,
        data: {
          title: 'Commissions recoltées'
        }
      },

      //menu statistiques
      {
        path: 'creer-categorie',
        component: CreateCategorieComponent,
        data: {
          title: 'Créer Catégorie'
        }
      },

      //menu financement sponsor
      {
        path: 'list-sponsor',
        component: ListSponsorComponent,
        data: {
          title: 'Liste Sponsor'
        }
      },
      {
        path: 'edit-sponsor',
        component: EditSponsorComponent,
        data: {
          title: 'Modifier Sponsor'
        }
      },
      {
        path: 'creer-sponsor',
        component: CreateSponsorComponent,
        data: {
          title: 'Créer Sponsor'
        }
      },

      //menu financement sponsor
      {
        path: 'list-financementsponsor',
        component: ListFinancementSponsorComponent,
        data: {
          title: 'Liste Financement Sponsor'
        }
      },
      {
        path: 'edit-financementsponsor',
        component: EditFinancementSponsorComponent,
        data: {
          title: 'Modifier Financement Sponsor'
        }
      },
      {
        path: 'creer-financementsponsor',
        component: CreateFinancementSponsorComponent,
        data: {
          title: 'Créer Financement Sponsor'
        }
      },

      //menu soutien solidaire
      {
        path: 'list-soutiensolidaire',
        component: ListSoutienSolidaireComponent,
        data: {
          title: 'Créer Soutien Solidaire'
        }
      },


      //menu statistiques
      {
        path: 'edit-categorie',
        component: EditCategorieComponent,
        data: {
          title: 'Edition Catégorie'
        }
      },


      //configurations

      //sous menus categories
      {
        path: 'list-categorie',
        component: ListCategorieComponent,
        data: {
          title: 'Catégories'
        }
      },
      //sous sliders
      {
        path: 'list-slider',
        component: ListSliderComponent,
        data: {
          title: 'Sliders'
        }
      },
      //modes de paiement
      {
        path: 'list-modepaiement',
        component: ListModePaiementComponent,
        data: {
          title: 'Paiements'
        }
      },

      //modes de paiement
      {
        path: 'edit-modepaiement',
        component: EditModesPaiementComponent,
        data: {
          title: 'Edition Mode Paiements'
        }
      },

      //modes de paiement
      {
        path: 'creer-modepaiement',
        component: CreateModesPaiementComponent,
        data: {
          title: 'Edition Mode Paiements'
        }
      },
      //commission
      {
        path: 'list-commission',
        component: ListCommissionComponent,
        data: {
          title: 'Commissions'
        }
      },

      //commission
      {
        path: 'edit-commission',
        component: EditCommissionComponent,
        data: {
          title: 'Editer Commission'
        }
      },
      //notifications
      {
        path: 'list-notification',
        component: ListNotificationComponent,
        data: {
          title: 'Notifications'
        }
      },

      //plus

      //sous menus agenda
      {
        path: 'list-agenda',
        component: ListAgendaComponent,
        data: {
          title: 'Agenda'
        }
      },




      ///ffor docs
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      // {
      //   path: 'notifications',
      //   loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      // },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
