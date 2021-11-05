import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  // {
  //   name: 'Wazindo',
  //   url: '/dashboard',
  //   icon: 'icon-speedometer',
  //   badge: {
  //     variant: 'info',
  //     text: 'Admin'
  //   }
  // },
  {
    name: 'Accueil',
    url: '/dashboard',
    icon: 'icon-home',
  },
  {
    name: 'Projet',
    url: '/base',
    icon: '',
    children: [
      {
        name: 'Creer un prjet',
        url: '/list-projet',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Les projets en cours',
        url: '/list-porteur',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Les projets finis',
        url: '/list-sponsor',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Les projets en attente',
        url: '/list-pubsolidaire',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Les projets bloqués',
        url: '/list-financementsponsor',
        icon: 'icon-arrow-right'
      },
        ]
  },
  {
    name: 'Gestion',
    url: '/base',
    icon: '',
    children: [
      {
        name: 'Projets',
        url: '/list-projet',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Porteurs',
        url: '/list-porteur',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Sponsor',
        url: '/list-sponsor',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Publicité solidaire',
        url: '/list-pubsolidaire',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Financement sponsor',
        url: '/list-financementsponsor',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Soutien solidaire',
        url: '/list-soutiensolidaire',
        icon: 'icon-arrow-right'
      }
    ]
  },
  {
    name: 'Boite a message',
    url: '/base',
    icon: '',
    children: [
      {
        name: 'Ecrire un message',
        url: '/list-projet',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Lire mes messages',
        url: '/list-porteur',
        icon: 'icon-arrow-right'
      },
      
    ]
  },
  {
    name: 'Gestion du Newsletter',
    url: '/base',
    icon: '',
    children: [
      {
        name: 'Gestion des abonné',
        url: '/list-projet',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Envoyer un courrier',
        url: '/list-porteur',
        icon: 'icon-arrow-right'
      },
      
    ]
  },
  {
    name: 'Pages',
    url: '/base',
    icon: '',
    children: [
      {
        name: 'Creer une page',
        url: '/list-projet',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Modifier une page',
        url: '/list-porteur',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Afficher les pages',
        url: '/list-porteur',
        icon: 'icon-arrow-right'
      },
      
    ]
  },
  {
    name: 'Menu',
    url: '/base',
    icon: '',
    children: [
      {
        name: 'Creer un menu',
        url: '/list-projet',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Modifier un menu',
        url: '/list-porteur',
        icon: 'icon-arrow-right'
      },
      
    ]
  },
  {
    name: 'Gerer les membres',
    url: '/base',
    icon: '',
    children: [
      {
        name: 'Ajouter un membre',
        url: '/list-projet',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Tous les membres',
        url: '/list-porteur',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Gerer les campagnes',
        url: '/base',
        icon: '',
        children: [
          {
            name: 'Ajouter des campagnes',
            url: '/list-projet',
            icon: 'icon-arrow-right'
          },
          {
            name: 'Modifier des campagnes',
            url: '/list-porteur',
            icon: 'icon-arrow-right'
          },
          
        ]
      },
    ]
  },
  {
    name: 'Gestion des retraits',
    url: '/base',
    icon: '',
    children: [
      {
        name: 'Demande de retrait',
        url: '/list-projet',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Envoyer un retrait',
        url: '/list-porteur',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Journal des retraits',
        url: '/list-porteur',
        icon: 'icon-arrow-right'
  
      },
    ]
  },
      {
        name: 'Gestion des administrateurs',
        url: '/base',
        icon: '',
        children: [
          {
            name: 'Tous les administrateurs',
            url: '/list-projet',
            icon: 'icon-arrow-right'
          },
          {
            name: 'Ajouter un administrateur',
            url: '/list-porteur',
            icon: 'icon-arrow-right'
          },
      
    ]
  },
  {
    name: 'Statistiques',
    url: '/base',
    icon: '',
    children: [
      {
        name: 'Statistiques générales',
        url: '/statistique-generale',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Commissions recoltées',
        url: '/commission-recolte',
        icon: 'icon-arrow-right'
      },
    ]
  },
  {
    name: 'Configuration',
    url: '/base',
    icon: '',
    children: [
      {
        name: 'Catégories',
        url: '/list-categorie',
        icon: 'icon-arrow-right'
      },
      // {
      //   name: 'Sliders',
      //   url: '/list-slider',
      //   icon: 'icon-arrow-right'
      // },
      {
        name: 'Modes de paiement',
        url: '/list-modepaiement',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Commisions',
        url: '/list-commission',
        icon: 'icon-arrow-right'
      },
      {
        name: 'Notifications',
        url: '/list-notification',
        icon: 'icon-arrow-right'
      },
    ]
  },

  // {
  //   name: 'Plus',
  //   url: '/base',
  //   icon: '',
  //   children: [
  //     {
  //       name: 'Agenda',
  //       url: '/list-agenda',
  //       icon: 'icon-arrow-right'
  //     },
  //   ]
  // }
];
