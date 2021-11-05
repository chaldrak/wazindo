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
  selector: 'app-list-sponsor',
  templateUrl: './list-sponsor.component.html',
  styleUrls: ['./list-sponsor.component.scss']
})
export class ListSponsorComponent implements OnInit {

  listSponsor : any[] = [];
  dataUser : any = {};
  StatutDefautProjet : string = "creation";
  isLoading : boolean;
  totalItems = 0;
  pageStartIndex: number = 0;
  pageLimit: number = 0;
  itemsPerPage: number = 5;
  currentPage = 1;
  returnedItems: any = [];
  constructor(private adminService: AdminService, private router: Router,private toastr: ToastrService, private localStorageService : LocalStorageService) {
    this.getListSponsor();
   }

  ngOnInit(): void {
  }

  
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedItems = this.listSponsor.slice(startItem, endItem);
  }

  goToedit(data : any){
    this.localStorageService.saveDataProjet(data);

    this.router.navigate(["/edit-sponsor"]);

  }

  sponsorCreation(){
    this.router.navigate(["/creer-sponsor"]);

  }

   //récupérer les projets par catégorie
   sponsorDelete(item:any): void {
  
      this.adminService.sponsorDelete(item.id).subscribe(
        (result: any) => {
    this.isLoading = false;
console.log(result);
    let resp = result;
    
    if (result === undefined || result.status === "error") {
      let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
      this.toastr.error(error, "Suppression du sponsor", { positionClass: 'toast-top-center' });
      this.isLoading = false;
      return;
    } else {
      this.isLoading = false;
      let info: string = result.message;
      this.toastr.info(info, "Suppression du sponsor", { positionClass: 'toast-top-center' });
  this.getListSponsor();
   
    }
  
        },
        err => {
    this.isLoading = false;

          return;
        }
      );
    } //end getListProjetByCategory

    //récupérer les projets par catégorie
    getListSponsor(): void {
      this.adminService.getListSponsor().subscribe(
        (result: any) => {
    this.isLoading = false;
console.log(result);
    let resp = result;
    
    if (result === undefined || result.status === "error") {
      let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
      this.toastr.error(error, "liste sponsor", { positionClass: 'toast-top-center' });
      this.isLoading = false;
      this.listSponsor = this.listSponsor;
      return;
    } else {
      this.isLoading = false;
      this.listSponsor = resp.data;
      this.returnedItems = this.listSponsor.slice(0, this.itemsPerPage);
      this.totalItems = this.listSponsor.length;
    }
        },
        err => {
    this.isLoading = false;

          return;
        }
      );
    } //end getListCategorie

}
