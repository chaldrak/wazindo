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
  selector: 'app-list-financementsponsor',
  templateUrl: './list-financementsponsor.component.html',
  styleUrls: ['./list-financementsponsor.component.scss']
})
export class ListFinancementSponsorComponent implements OnInit {

  listFinancementSponsor: any[] = [];
  dataUser: any = { };
  StatutDefautProjet: string = "creation";
  isLoading: boolean;
  totalItems = 0;
  pageStartIndex: number = 0;
  pageLimit: number = 0;
  itemsPerPage: number = 5;
  currentPage = 1;
  returnedItems: any = [];
  constructor(private adminService: AdminService, private router: Router, private toastr: ToastrService, private localStorageService: LocalStorageService) {
    this.getListFinancementSponsor();
  }

  ngOnInit(): void {
  }


  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedItems = this.listFinancementSponsor.slice(startItem, endItem);
  }

  goToedit(data: any) {
    this.localStorageService.saveDataProjet(data);

    this.router.navigate(["/edit-financementsponsor"]);

  }

  financementSponsorCreate() {
    this.router.navigate(["/creer-financementsponsor"]);

  }

  //récupérer les projets par catégorie
  financementSponsorDelete(item: any): void {
   
    this.adminService.FinancementSponsorDelete(item.id).subscribe(
      (result: any) => {
        this.isLoading = false;
        console.log(result);
        let resp = result;

        if (result === undefined || result.status === "error") {
          let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
          this.toastr.error(error, "Suppression de financement sponsor", { positionClass: 'toast-top-center' });
          this.isLoading = false;
          return;
        } else {
          this.isLoading = false;
          let info: string = result.message;
          this.toastr.info(info, "Suppression de financement sponsor", { positionClass: 'toast-top-center' });
          this.getListFinancementSponsor();

        }

      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getListProjetByCategory


  //récupérer les projets par catégorie
  getListFinancementSponsor(): void {
    this.adminService.getListFinancementSponsor().subscribe(
      (result: any) => {
        this.isLoading = false;
        console.log(result);
        let resp = result;
        if (result === undefined || result.status === "error") {
          let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
          this.toastr.error(error, "liste financement sponsor", { positionClass: 'toast-top-center' });
          this.isLoading = false;
          this.listFinancementSponsor = this.listFinancementSponsor;
          return;
        } else {
          this.isLoading = false;
          let info: string = result.message;
          this.listFinancementSponsor = resp.data;
          this.returnedItems = this.listFinancementSponsor.slice(0, this.itemsPerPage);
          this.totalItems = this.listFinancementSponsor.length;
        }
      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getListCategorie

}
