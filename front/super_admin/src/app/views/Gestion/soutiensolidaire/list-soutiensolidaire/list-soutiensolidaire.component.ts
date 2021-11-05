import {
  Component,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";

import { PageChangedEvent } from "ngx-bootstrap/pagination";

import {
  AdminService,
} from "../../../../shared/services/adminservice/admin.service";
import {
  LocalStorageService,
} from "../../../../shared/services/app/localstorage.service";

@Component({
  selector: 'app-list-soutiensolidaire',
  templateUrl: './list-soutiensolidaire.component.html',
  styleUrls: ['./list-soutiensolidaire.component.scss']
})
export class ListSoutienSolidaireComponent implements OnInit {

  listSoutienSolidaire : any[] = [];
  dataUser : any = {};
  StatutDefautProjet : string = "creation";
  isLoading : boolean;
  pageStartIndex: number = 0; 
  pageLimit: number = 0;
  totalItems = 0;
  itemsPerPage: number = 6;
  currentPage = 1;
  returnedItems: any = []; 

  constructor(private adminService: AdminService, private router: Router, private localStorageService : LocalStorageService) {
    this.getListSoutienSolidaire();
   }

  ngOnInit(): void {
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedItems = this.listSoutienSolidaire.slice(startItem, endItem);
  }

    //récupérer les projets par catégorie
    getListSoutienSolidaire(): void {
  
      this.isLoading = true;

      this.adminService.getListSoutienSolidaire().subscribe(
        (result: any) => {
    this.isLoading = false;

console.log(result);

    let resp = result;
    
          if (resp === null || resp === undefined) {
            this.listSoutienSolidaire = this.listSoutienSolidaire;
            return;
          }
          if (resp.status === "error") {
            this.listSoutienSolidaire = this.listSoutienSolidaire;
            return;
          }
          this.listSoutienSolidaire = resp.data;
          console.log(this.listSoutienSolidaire);
          this.returnedItems = this.listSoutienSolidaire.slice(0, this.itemsPerPage);
          console.log(this.returnedItems);
  
        },
        err => {
    this.isLoading = false;

          return;
        }
      );
    } //end getListSoutienSolidaire

}
