import {
  Component,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";

import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { ToastrService } from "ngx-toastr";

import {
  AdminService,
} from "../../../../shared/services/adminservice/admin.service";
import {
  LocalStorageService,
} from "../../../../shared/services/app/localstorage.service";

@Component({
  selector: 'app-list-pubsolidaire',
  templateUrl: './list-pubsolidaire.component.html',
  styleUrls: ['./list-pubsolidaire.component.scss']
})
export class ListPubSolidaireComponent implements OnInit {
  listPubSolidaire: any[] = [];
  dataUser: any = { };
  StatutDefautProjet: string = "creation";
  isLoading: boolean;
  totalItems = 0;
  pageStartIndex: number = 0;
  pageLimit: number = 0;
  itemsPerPage: number = 5;
  currentPage = 1;
  returnedItems: any = [];

  constructor(private toastr: ToastrService, private adminService: AdminService, private router: Router, private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.getListPubSolidaire();
  }

  goToedit(data: any) {
    this.localStorageService.saveDataProjet(data);

    this.router.navigate(["/edit-pubsolidaire"]);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedItems = this.listPubSolidaire.slice(startItem, endItem);
  }

  pubSolidaireCreation() {
    this.router.navigate(["/creer-pubsolidaire"]);
  }

  
  //récupérer les projets par catégorie
  getListPubSolidaire(): void {

    this.isLoading = true;

    this.adminService.getListPubSolidaire().subscribe(
      (result: any) => {

        this.isLoading = false;

        console.log(result);

        let resp = result;

        if (resp === null || resp === undefined) {
          this.listPubSolidaire = this.listPubSolidaire;
          return;
        }
        if (resp.status === "error") {
          this.toastr.error(resp.message, "liste de Publicité solidaire", { positionClass: 'toast-top-center' });
          this.listPubSolidaire = this.listPubSolidaire;
          return;
        }
        this.listPubSolidaire = resp.data;
        this.returnedItems = this.listPubSolidaire.slice(0, this.itemsPerPage);
        this.totalItems = this.listPubSolidaire.length;

      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getListProjetByCategory



  //récupérer les projets par catégorie
  pubSolidaireDelete(item: any): void {
  
    this.adminService.PubSolidaireDelete(item.id).subscribe(
      (result: any) => {
        this.isLoading = false;
        console.log(result);
        let resp = result;

        if (result === undefined || result.status === "error") {
          let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
          this.toastr.error(error, "Suppression de Publicité solidaire", { positionClass: 'toast-top-center' });
          this.isLoading = false;
          return;
        } else {
          this.isLoading = false;
          let info: string = result.message;
          this.toastr.info(info, "Suppression de Publicité solidaire", { positionClass: 'toast-top-center' });
          this.getListPubSolidaire();

        }

      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getListProjetByCategory
}
