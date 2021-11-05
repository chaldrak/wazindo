import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { InstagramService } from 'src/app/shared/services/instagram.service';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { PublicService } from 'src/app/shared/services/public.service';

import { Product } from '../../../shared/classes/product';
import { AdminService } from '../../../shared/services/admin.service';



@Component({
  selector: 'app-wazindo-home',
  templateUrl: './accueilwazindo.component.html',
  styleUrls: ['./accueilwazindo.component.scss']
})
export class WazindoComponent implements OnInit, OnDestroy {

  public themeLogo: string = "assets/images/wazindotrans.png"; // 'assets/images/icon/logo-2.png'; // Change Logo
  public products: Product[] = [];
  statistiqueList: any = { nombre_membres: 200, total_projets_finances: 50, montant_total_leve: 450000 };
  listCategories: any[] = [];
  listProjetPublishedCategories: any[] = [];
  latestProjects: any[] = [];

  constructor(public productService: ProductService, private adminService: AdminService, private publicService: PublicService,
    private instaService: InstagramService, private localStorageService: LocalStorageService, private router: Router) {
      
  }

  isLoading: boolean = false; noStat: boolean = false;

  public sliders = [{
    title: 'nouveau projet',
    subTitle: 'La protection des enfants',
    image: 'assets/images/gym-bg.jpg'
  }, {
    title: 'encore un projet',
    subTitle: 'la santé des enfants',
    image: 'assets/images/modeles/1.jpg'
  }];

  // Blog
  public blogs = [{
    image: 'assets/images/blog/28.jpg',
    date: '25 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/29.jpg',
    date: '26 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/30.jpg',
    date: '27 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/31.jpg',
    date: '28 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }];

  // Logo
  public logos = [{
    image: 'assets/images/partenaires/planbenin.jpg',
  }, {
    image: 'assets/images/partenaires/giz.png',
  }, {
    image: 'assets/images/partenaires/unicef.png',
  }, {
    image: 'assets/images/partenaires/unfpa.png',
  }];


  ngOnInit(): void {
    // Change color for this layout
    document.documentElement.style.setProperty('--theme-deafult', '#3d72f1');
    document.documentElement.style.setProperty('--theme-gradient1', '#01effc');
    document.documentElement.style.setProperty('--theme-gradient2', '#485ff2');

    //get list of data
    this.getLastProjetPublished();
    this.getProjectsPublishedCategories();
  }

  ngOnDestroy(): void {
    // Remove Color
    document.documentElement.style.removeProperty('--theme-deafult');
    document.documentElement.style.removeProperty('--theme-gradient1');
    document.documentElement.style.removeProperty('--theme-gradient2');
  }

  //récupérer les catégorie de projets 
  getProjectsPublishedCategories(): void {

    this.publicService.getProjectsPublishedCategories().subscribe(
      (result: any) => {
        this.isLoading = false;
        if (result === null || result === undefined) {
          this.listProjetPublishedCategories = [];
          return;
        }
        if (result.status === "error") { this.listProjetPublishedCategories = []; return; }
        //console.log(result);

        this.listProjetPublishedCategories = result.data;
      },
      err => {
        this.isLoading = false;
        return;
      }
    );
  } //end getProjectsCategories



  //récuperer les projets recents
  getLastProjetPublished(): void {

    this.publicService.getLatestProjects().subscribe(
      (result: any) => {

        if (result === null || result === undefined) {
          this.latestProjects = [];
          return;
        }
        if (result.status === "error") {
          this.latestProjects = [];
          return;
        }
        this.latestProjects = result.data.slice(0, 6);
        //console.log(this.latestProjects);


      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getLastProjetPublished


  alert(data){
    this.localStorageService.saveDataProductCategorie(data);
    this.router.navigate(["/home/projets"]);
  }
}
