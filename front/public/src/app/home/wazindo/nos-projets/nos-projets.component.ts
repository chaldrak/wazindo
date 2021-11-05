import { ViewportScroller } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Produit } from 'src/app/shared/classes/produit';
import { AdminService } from 'src/app/shared/services/admin.service';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { PublicService } from 'src/app/shared/services/public.service';

@Component({
  selector: 'app-nos-projets',
  templateUrl: './nos-projets.component.html',
  styleUrls: ['./nos-projets.component.scss']
})
export class NosProjetsComponent implements OnInit {
  listProjets: any[] = [];
  dataUser: any = {};
  StatutDefautProjet: string = "creation";
  isLoading: boolean;
  public themeLogo: string = 'assets/images/wazindotrans.png';
  public grid: string = 'col-xl-3 col-md-6';
  public layoutView: string = 'grid-view';
  public products: Produit[] = [];
  public brands: any[] = [];
  public colors: any[] = [];
  listPays: any[] = [];
  public size: any[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 1200;
  public tags: any[] = [];
  public category: string;
  public pageNo: number = 1;
  public paginate: any = {}; // Pagination use only
  public paginateProjet: any = {}; // Pagination use only
  public ContentToSeach: any = {};
  categorieSave: any = {};
  public sortBy: string; // Sorting Order
  public mobileSidebar: boolean = false;
  public loader: boolean = true;

  public marquesList: any[] = [];
  public categoriesList: any[] = [];
  totalItems = 0;
  pageStartIndex: number = 0;
  pageLimit: number = 0;
  itemsPerPage: number = 10;
  currentPage = 1;
  returnedItems: any = [];
  filter: any = { categorie: null, nom_projet: '', pays: null, nom_porteur: '', montant_minimum: null, montant_maximum: null, date_de_cloture: "" };

  constructor(private adminService: AdminService, private publicService: PublicService, private route: ActivatedRoute, private router: Router, private localStorageService: LocalStorageService,
    private viewScroller: ViewportScroller, public productService: ProductService) {

    // Get Query params..
    this.route.queryParams.subscribe(params => {

      this.brands = params.brand ? params.brand.split(",") : [];
      this.colors = params.color ? params.color.split(",") : [];
      this.size = params.size ? params.size.split(",") : [];
      this.minPrice = params.minPrice ? params.minPrice : this.minPrice;
      this.maxPrice = params.maxPrice ? params.maxPrice : this.maxPrice;
      this.tags = [...this.brands, ...this.colors, ...this.size]; // All Tags Array

      this.category = params.category ? params.category : null;
      this.sortBy = params.sortBy ? params.sortBy : 'ascending';
      this.pageNo = params.page ? params.page : this.pageNo;

   

    })
  }

  ngOnInit(): void {
    this.getListCategories();

    this.getListPays();


    this.getListPublishedProjects();

  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedItems = this.listProjets.slice(startItem, endItem);
  }


  //display project detail
  displayProject(item: any) {
    //save project data
    this.localStorageService.saveDataProjet(item);

    //route
    this.router.navigate(["/home/detail-projet"]);

  }//end displayProject


  //récuperer les projets recents
  getListPays(): void {

    this.publicService.getListPays().subscribe(
      (result: any) => {

        if (result === null || result === undefined) {
          this.listPays = [];
          return;
        }
        if (result.status === "error") {
          this.listPays = [];
          return;
        }
        this.listPays = result.data;

      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getListProjetpublished


  //récuperer les projets recents
  getListPublishedProjects(): void {
    this.publicService.getListProjetpublished(this.filter).subscribe(
      (result: any) => {

        if (result === null || result === undefined) {
          this.listProjets = [];
          return;
        }
        if (result.status === "error") {
          this.listProjets = [];
          return;
        }
        this.listProjets = result.data;

        // Paginate Products
        this.returnedItems = this.listProjets.slice(0, this.itemsPerPage);
        this.totalItems = this.listProjets.length;
      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getListProjetpublished

  // //get list Produit
  // getListProduits() {
  //   this.products = [];
  //   this.productService.getListProduits().subscribe(response => {

  //     if (response === undefined || response === null) {
  //       this.products = [];
  //       return;
  //     } else {
  //       // Sorting Filter
  //       this.products = this.productService.sortProductsR(response.data, this.sortBy);

  //       // Paginate Products
  //       this.paginate = this.productService.getPager(this.products.length, +this.pageNo);     // get paginate object from service
  //       this.products = this.products.slice(this.paginate.startIndex, this.paginate.endIndex + 1); // get current page of items 
  //     }
  //   })
  // }//end getListProduits



  //search Produit
  searchProduits() {
    this.products = [];
    this.productService.searchProduits(this.filter).subscribe(response => {

      if (response === undefined || response === null) {
        this.products = [];
        return;
      } else {
        // Sorting Filter
        this.products = this.productService.sortProductsR(response.data, this.sortBy);

        // Paginate Products
        this.paginate = this.productService.getPager(this.products.length, +this.pageNo);     // get paginate object from service
        this.products = this.products.slice(this.paginate.startIndex, this.paginate.endIndex + 1); // get current page of items 
      }
    })
  }//end searchProduits


  // Append filter value to Url
  updateFilter(tags: any) {
    tags.page = null; // Reset Pagination
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: tags,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // SortBy Filter
  sortByFilter(value) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortBy: value ? value : null },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Remove Tag
  removeTag(tag) {

    this.brands = this.brands.filter(val => val !== tag);
    this.colors = this.colors.filter(val => val !== tag);
    this.size = this.size.filter(val => val !== tag);

    let params = {
      brand: this.brands.length ? this.brands.join(",") : null,
      color: this.colors.length ? this.colors.join(",") : null,
      size: this.size.length ? this.size.join(",") : null
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Clear Tags
  removeAllTags() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // product Pagination
  setPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Change Grid Layout
  updateGridLayout(value: string) {
    this.grid = value;
  }

  // Change Layout View
  updateLayoutView(value: string) {
    this.layoutView = value;
    if (value == 'list-view')
      this.grid = 'col-lg-12';
    else
      this.grid = 'col-xl-3 col-md-6';
  }


  // Mobile sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }


  //get list categories
  getListCategories() {
    this.categoriesList = [];
    this.productService.getListCategories().subscribe((result) => {
      if (result === undefined) {
        let error: string = "Une erreur est survenue lors du chargement des categories. Veuillez réessayer";
        return;
      }

      if (result.status === "error") {
        let error: string = result.message;
        return;
      }
      this.categoriesList = result.data;
      this.categoriesList.push({ id: 0, nom: "Sélectionner une catégorie" });

      if (this.categoriesList.length !== 0) {
        this.filter.categorie = this.categoriesList[this.categoriesList.length - 1].id;
      }
      this.categoriesList = result.data;

      this.categorieSave = this.localStorageService.getDataProductCategorie();
      if (this.categorieSave !== {} && this.categorieSave !== null && this.categorieSave !== undefined) {

        const result = this.categoriesList.filter(word => word.nom === this.categorieSave.nom_categorie);
        this.filter.categorie = result[0].id;
        this.getListPublishedProjects();
        let data: any = {};
        this.localStorageService.saveDataProductCategorie(data);

      }

    });
  }//end getListCategories



  //récupérer les projets par catégorie
  getListProjetByStatut(data: string): void {

    let dataStatut: any = {
      "statut": data
    }
    this.adminService.getListProjetByUser(dataStatut).subscribe(
      (result: any) => {
        this.isLoading = false;
        let resp = result;
        if (resp === null || resp === undefined) {
          this.listProjets = this.listProjets;
          return;
        }
        if (resp.status === "error") {
          this.listProjets = this.listProjets;
          return;
        }
        this.listProjets = resp.data;

      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getListProjetByCategory


}
