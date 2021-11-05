import {
  HostListener,
  Injectable,
} from '@angular/core';

import { BehaviorSubject } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	type?: string;
	megaMenu?: boolean;
	image?: string;
	active?: boolean;
	badge?: boolean;
	badgeText?: string;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	constructor() { }

	public screenWidth: any;
	public leftMenuToggle: boolean = false;
	public mainMenuToggle: boolean = false;

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			path: '/accueil', title: 'Accueil', type: 'link', active: false,

			/*children: [
				{
					title: 'clothing', type: 'sub', active: false, children: [
						{ path: '/home/fashion', title: 'fashion-01', type: 'link' },
						{ path: '/home/fashion-2', title: 'fashion-02', type: 'link' },
						{ path: '/home/fashion-3', title: 'fashion-03', type: 'link' }
					]
				},
				{ path: '/home/vegetable', title: 'vegetable', type: 'link' },
				{ path: '/home/watch', title: 'watch', type: 'link' },
				{ path: '/home/furniture', title: 'furniture', type: 'link' },
				{ path: '/home/flower', title: 'flower', type: 'link' },
				{ path: '/home/beauty', title: 'beauty', type: 'link' },
				{ path: '/home/electronics', title: 'electronics', type: 'link' },
				{ path: '/home/pets', title: 'pets', type: 'link' },
				{ path: '/home/gym', title: 'gym', type: 'link' },
				{ path: '/home/tools', title: 'tools', type: 'link' },
				{ path: '/home/shoes', title: 'shoes', type: 'link' },
				{ path: '/home/bags', title: 'bags', type: 'link' },
				{ path: '/home/marijuana', title: 'marijuana', type: 'link' }
			]*/
		},

		{
			path: '/home/soumettre-projet', title: 'Soumettre un projet', type: 'link', active: false,
		},

		{
			path: '/home/projets', title: 'Projets', type: 'link', active: false,
			/*children: [
				{ path: '/boutique/collection/left/sidebar', title: 'left-sidebar', type: 'link' },
				{ path: '/boutique/collection/right/sidebar', title: 'right-sidebar', type: 'link' },
				{ path: '/boutique/collection/no/sidebar', title: 'no-sidebar', type: 'link' },
				{ path: '/boutique/collection/infinitescroll', title: 'Infinite Scroll', type: 'link' }
			]*/
		},

		{
			path: '/home/pub-solidaire', title: 'Pub solidaires', type: 'link', active: false,
		},

	

		// {
		// 	path: '/home/suivi-commandes',  title: 'Suivi Commandes', type: 'link', active: false,

		// },

		{
			path: '/home/contact', title: 'Contacts', type: 'link', megaMenu: true, badge: false, active: false, //badgeText: 'new',
			/* children: [
				{
					title: 'portfolio', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'portfolio-grid-2', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'portfolio-grid-3', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'portfolio-grid-4', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'mesonary-grid-2', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'mesonary-grid-3', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'mesonary-grid-4', type: 'link' },
						{ path: '/pages/portfolio/masonry/full-width', title: 'mesonary-Full-Width', type: 'link' }
					]
				},
				{
					title: 'add-to-cart', type: 'sub', active: false, children: [
						{ path: '/home/vegetable', title: 'cart-right', type: 'link' },
						{ path: '/home/watch', title: 'cart-left', type: 'link' },
						{ path: '/home/furniture', title: 'cart-top', type: 'link' },
						{ path: '/home/flower', title: 'cart-bottom', type: 'link' },
						{ path: '/home/fashion', title: 'cart-model-popup', type: 'link' }
					]
				},
				{
					title: 'theme-elements', type: 'sub', active: false, children: [
						{ path: '/elements/theme/title', title: 'title', type: 'link' },
						{ path: '/elements/theme/collection-banner', title: 'collection-banner', type: 'link' },
						{ path: '/elements/theme/home-slider', title: 'home-slider', type: 'link' },
						{ path: '/elements/theme/category', title: 'category', type: 'link' },
						{ path: '/elements/theme/services', title: 'services', type: 'link' }
					]
				},
				{
					title: 'product-elements', type: 'sub', active: false, children: [
						{ path: '/elements/product/slider', title: 'product-slider', type: 'link' },
						{ path: '/elements/product/banners', title: 'banners', type: 'link' },
						{ path: '/elements/product/tabs', title: 'product-tabs', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'multi-slider', type: 'link' }
					]
				},
				{
					title: 'email-template', type: 'sub', active: false, children: [
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success.html', title: 'order-success', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success-two.html', title: 'order-success-2', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template.html', title: 'email-template', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template-two.html', title: 'email-template-2', type: 'extTabLink' }
					]
				}
			]*/
		},

		/*children: [
			{
				title: 'account', type: 'sub', active: false, children: [
					{ path: '/pages/wishlist', title: 'wishlist', type: 'link' },
					{ path: '/pages/cart', title: 'cart', type: 'link' },
					{ path: '/pages/dashboard', title: 'dashboard', type: 'link' },
					{ path: '/pages/login', title: 'login', type: 'link' },
					{ path: '/pages/register', title: 'register', type: 'link' },
					{ path: '/pages/contact', title: 'contact', type: 'link' },
					{ path: '/pages/forget/password', title: 'forget-password', type: 'link' },
					{ path: '/pages/profile', title: 'profile', type: 'link' },
					{ path: '/pages/checkout', title: 'checkout', type: 'link' },
				]
			},
			{ path: '/pages/aboutus', title: 'about-us', type: 'link' },
			{ path: '/pages/search', title: 'search', type: 'link' },
			{ path: '/pages/typography', title: 'typography', type: 'link', badge: true, badgeText: 'new' },
			{ path: '/pages/review', title: 'review', type: 'link', badge: true, badgeText: 'new' },
			{ path: '/pages/order/success', title: 'order-success', type: 'link' },
				{
					title: 'compare', type: 'sub', active: false, children: [
						{ path: '/pages/compare/one', title: 'compare-1', type: 'link' },
						{ path: '/pages/compare/two', title: 'compare-2', type: 'link', badge: true, badgeText: 'new' }
					]
				},
			{ path: '/pages/collection', title: 'collection', type: 'link' },
			{ path: '/pages/lookbook', title: 'lookbook', type: 'link' },
			{ path: '/pages/404', title: '404', type: 'link' },
			{ path: '/pages/comingsoon', title: 'coming-soon', type: 'link', badge: true, badgeText: 'new' },
			{ path: '/pages/faq', title: 'faq', type: 'link' }
		]*/

	];

	LEFTMENUITEMS: Menu[] = [


		{
			path: '/porteur/dashboard', title: 'Tableau de Bord ', type: 'link'
		},

		{
			title: 'Projets', type: 'sub', active: false, children: [
				{
					path: '/porteur/afficher_projets', title: 'Mes Projets', type: 'link'
				},
				{
					path: '/porteur/proposer_projet', title: 'Proposer un projet', type: 'link'
				},
				{
					path: '/porteur/proposer_projet', title: 'Mon projet en cour', type: 'link'
				},
				{
					path: '/porteur/proposer_projet', title: 'Mes projets finis', type: 'link'
				},
				{
					path: '/porteur/proposer_projet', title: 'Mes projets soutenus', type: 'link'
				},
				{
					path: '/porteur/proposer_projet', title: 'Mes projets suivis', type: 'link'
				},
				{
					path: '/porteur/statistiques_projets', title: 'Statistiques', type: 'link'
				},
	
			]
		},
		{
			title: 'Contributions', type: 'sub', active: false, children: [
				{
					path: '/porteur/afficher_contributeurs', title: 'Mes Contributeurs', type: 'link'
				},
				{
					path: '/porteur/afficher_contributions', title: 'Mes Contributions', type: 'link'
				},
				{
					path: '/porteur/afficher_contributions', title: 'Mes Contributions reçus', type: 'link'
				},
			]

		},



	
		{
			title: 'Boite à message', type: 'sub', active: false, children: [
				{
					path: '/porteur/afficher_liste_diffusion', title: 'Liste de diffusion', type: 'link'
				},
				{
					path: '/porteur/afficher_liste_message', title: 'Ecrire un message', type: 'link'
				},
				{
					path: '/porteur/partage_message', title: 'Partage', type: 'link'
				},
				{
					path: '/porteur/configurer_notification', title: 'Notifications', type: 'link'
				},
			]
		},
		{
			title: 'Sécurité', type: 'sub', active: false, children: [
				{
					path: '/porteur/modifier_profil', title: 'Mon Profil', type: 'link'
				},
				{
					path: '/porteur/supprimer_compte', title: 'Supprimer Compte', type: 'link'
				},
			]
		},

	];
	CONNECTMENU: Menu[] = [
		{
			title: 'Se connecter', type: 'sub', active: false, children: [
				{
					path: '/porteur/modifier_profil', title: 'Mon Profil', type: 'link'
				},
				{
					path: '/porteur/supprimer_compte', title: 'Supprimer Compte', type: 'link'
				},
			]
		},

	];

	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	leftMenuItems = new BehaviorSubject<Menu[]>(this.LEFTMENUITEMS);
	//connect = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	//connectMenuItems = new BehaviorSubject<Menu[]>(this.CONNECTMENU);

}
