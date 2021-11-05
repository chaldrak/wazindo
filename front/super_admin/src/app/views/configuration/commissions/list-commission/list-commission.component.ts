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
  selector: 'app-list-commission',
  templateUrl: './list-commission.component.html',
  styleUrls: ['./list-commission.component.scss']
})
export class ListCommissionComponent implements OnInit {

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
  constructor(private adminService: AdminService, private router: Router, private localStorageService : LocalStorageService) {
   }

  ngOnInit(): void {
    this.getListCommission();
  }

  
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedItems = this.listProjetUser.slice(startItem, endItem);
  }

  goToedit(data : any){
    this.localStorageService.saveDataProjet(data);

    this.router.navigate(["/edit-commission"]);
  }

    //récupérer les projets par catégorie
    getListCommission(): void {
  
      this.isLoading = true;

      this.adminService.getListCommission().subscribe(
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
}
