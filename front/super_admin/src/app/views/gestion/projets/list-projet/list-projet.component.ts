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
  selector: 'app-list-projet',
  templateUrl: './list-projet.component.html',
  styleUrls: ['./list-projet.component.scss']
})
export class ListProjetComponent implements OnInit {

  listProjets: any[] = [];
  dataUser: any = {};
  StatutDefautProjet: string = "creation";
  isLoading: boolean;
  page: number;
  pageStartIndex: number = 0; 
  pageLimit: number = 0;
  totalItems = 0;
  itemsPerPage: number = 6;
  currentPage = 1;
  returnedItems: any = []; 

  constructor(private adminService: AdminService, private router: Router, private localStorageService: LocalStorageService) {
    this.getListProjetByStatut(this.StatutDefautProjet);
  }

  ngOnInit(): void {
    // this.itemsPerPage = environment.itemsPerPage;
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedItems = this.listProjets.slice(startItem, endItem);
  }

  goToedit(data: any) {
    this.localStorageService.saveDataProjet(data);

    this.router.navigate(["/modifier-projet"]);

  }

  //récupérer les projets par catégorie
  getListProjetByStatut(data: string): void {

    let dataStatut: any = {
      "statut": data
    }
    this.adminService.getListProjetByUser(dataStatut).subscribe(
      (result: any) => {
        this.isLoading = false;



        let resp = result;
        console.log(result);
        if (resp === null || resp === undefined) {
          this.listProjets = this.listProjets;
          return;
        }
        if (resp.status === "error") {
          this.listProjets = this.listProjets;
          return;
        }
        this.listProjets = resp.data;
        console.log(this.listProjets);
        this.returnedItems = this.listProjets.slice(0, this.itemsPerPage);
        console.log(this.returnedItems);

      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getListProjetByCategory
}
