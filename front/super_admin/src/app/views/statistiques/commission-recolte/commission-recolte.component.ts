import {
  Component,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";

import { PageChangedEvent } from "ngx-bootstrap/pagination";

import {
  AdminService,
} from "../../../shared/services/adminservice/admin.service";
import {
  LocalStorageService,
} from "../../../shared/services/app/localstorage.service";

@Component({
  selector: 'app-commission-recolte',
  templateUrl: './commission-recolte.component.html',
  styleUrls: ['./commission-recolte.component.scss']
})
export class CommissionRecolteComponent implements OnInit {

  listProjetUser: any[] = [];
  listProjet: any[] = [];
  dataUser: any = {};
  StatutDefautProjet: string = "creation";
  isLoading: boolean;
  dateDebut: string = '';
  dateFin: string = '';
  projet: string = '';
  totalItems = 0;
  pageStartIndex: number = 0;
  pageLimit: number = 0;
  itemsPerPage: number = 5;
  currentPage = 1;
  returnedItems: any = [];
  constructor(private adminService: AdminService, private router: Router, private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.getListProjetStatCommission();
    this.getListProjet();
  }

  
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedItems = this.listProjetUser.slice(startItem, endItem);
  }

     //récupérer les projets par catégorie
     getListProjet(): void {
  
      this.adminService.getListProjet().subscribe(
        (result: any) => {
    this.isLoading = false;
    let resp = result;
          if (resp === null || resp === undefined) {
            this.listProjet = this.listProjet;
            return;
          }
          if (resp.status === "error") {
            this.listProjet = this.listProjet;
            return;
          }
          this.listProjet = resp.data;
      
  
        },
        err => {
    this.isLoading = false;

          return;
        }
      );
    } //end getListProjetByCategory


  //récupérer les projets par catégorie
  getListProjetStatCommission(): void {
  const data : any = {
    'dateDebut' : this.dateDebut,
    'dateFin' : this.dateFin,
    'projet' : this.projet
  }
    this.isLoading = true;

    this.adminService.getListProjetStatCommission(data).subscribe(
      (result: any) => {

        this.isLoading = false;

        console.log(result);

        let resp = result;

        if (resp === null || resp === undefined) {
          this.listProjetUser = this.listProjetUser;
          return;
        }
        if (resp.status === "error") {
          this.listProjetUser = this.listProjetUser;
          return;
        }
        this.listProjetUser = resp.data;
        this.returnedItems = this.listProjetUser.slice(0, this.itemsPerPage);
        this.totalItems = this.listProjetUser.length;

      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getListProjetByCategory

  //récupérer les projets par catégorie
  searchProjetStatCommission(): void {
  const data : any = {
    'dateDebut' : this.dateDebut,
    'dateFin' : this.dateFin,
    'projet' : this.projet
  }
    this.isLoading = true;

    this.adminService.getListProjetStatCommission(data).subscribe(
      (result: any) => {

        this.isLoading = false;

        console.log(result);

        let resp = result;

        if (resp === null || resp === undefined) {
          this.listProjetUser = this.listProjetUser;
          return;
        }
        if (resp.status === "error") {
          this.listProjetUser = this.listProjetUser;
          return;
        }
        this.listProjetUser = resp.data;


      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getListProjetByCategory
}
