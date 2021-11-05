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
  selector: 'app-list-modepaiement',
  templateUrl: './list-modepaiement.component.html',
  styleUrls: ['./list-modepaiement.component.scss']
})
export class ListModePaiementComponent implements OnInit {
  listProjetUser : any[] = [];
  dataUser : any = {};
  StatutDefautProjet : string = "creation";
  isLoading : boolean;
  totalItems = 0;
  pageStartIndex: number = 0;
  pageLimit: number = 0;
  itemsPerPage: number = 5;
  currentPage = 1;
  returnedItems: any = [];
  constructor(private adminService: AdminService,private toastr: ToastrService, private router: Router, private localStorageService : LocalStorageService) {
    this.getListModePaiement();
   }

  ngOnInit(): void {
  }

  
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedItems = this.listProjetUser.slice(startItem, endItem);
  }

  goToedit(data : any){
    this.localStorageService.saveDataProjet(data);

    this.router.navigate(["/edit-modepaiement"]);

  }

  modePaiementCreation(){
    this.router.navigate(["/creer-modepaiement"]);

  }

   //récupérer les projets par catégorie
    deletePaiement(item:any): void {
      let data : any = {
        'id': item.id
      }
      this.adminService.modePaiementDelete(data).subscribe(
        (result: any) => {
    this.isLoading = false;
console.log(result);
    let resp = result;
    
    if (result === undefined || result.status === "error") {
      let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
      this.toastr.error(error, "Suppression de modes de paiement", { positionClass: 'toast-top-center' });
      this.isLoading = false;
      return;
    } else {
      this.isLoading = false;
      let info: string = result.message;
      this.toastr.info(info, "Suppression de modes de paiement", { positionClass: 'toast-top-center' });
  this.getListModePaiement();
   
    }
  
        },
        err => {
    this.isLoading = false;

          return;
        }
      );
    } //end getListProjetByCategory

    //récupérer les projets par catégorie
    getListModePaiement(): void {
      this.adminService.getListModePaiement().subscribe(
        (result: any) => {
    this.isLoading = false;
console.log(result);
    let resp = result;
    
    if (result === undefined || result.status === "error") {
      let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
      this.toastr.error(error, "liste de modes de paiement", { positionClass: 'toast-top-center' });
      this.isLoading = false;
      this.listProjetUser = this.listProjetUser;
      return;
    } else {
      this.isLoading = false;
      let info: string = result.message;
      this.listProjetUser = resp.data;
      this.returnedItems = this.listProjetUser.slice(0, this.itemsPerPage);
        this.totalItems = this.listProjetUser.length;
    }
        },
        err => {
    this.isLoading = false;

          return;
        }
      );
    } //end getListProjetByCategory

}
