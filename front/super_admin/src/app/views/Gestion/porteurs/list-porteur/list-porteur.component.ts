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
  selector: 'app-list-porteur',
  templateUrl: './list-porteur.component.html',
  styleUrls: ['./list-porteur.component.scss']
})
export class ListPorteurComponent implements OnInit {

  listProjetUser : any[] = [];
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
    this.getListPorteurProjet();
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

    this.router.navigate(["/modifier_projet"]);

  }

    //récupérer les projets par catégorie
    getListPorteurProjet(): void {
  
      this.isLoading = true;

      this.adminService.getListPorteurProjet().subscribe(
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
          console.log(this.listProjetUser);
          this.returnedItems = this.listProjetUser.slice(0, this.itemsPerPage);
          console.log(this.returnedItems);
  
        },
        err => {
    this.isLoading = false;

          return;
        }
      );
    } //end getListProjetByCategory


    goToDelete(item : any){

    }
}
