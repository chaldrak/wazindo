import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../../shared/services/adminservice/admin.service';
import { LocalStorageService } from '../../../../shared/services/app/localstorage.service';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.scss']
})
export class ListNotificationComponent implements OnInit {

  listProjetUser : any[] = [];
  dataUser : any = {};
  StatutDefautProjet : string = "creation";
  isLoading : boolean;

  constructor(private adminService: AdminService, private router: Router, private localStorageService : LocalStorageService) {
   }

  ngOnInit(): void {
    this.getListProjetByStatut(this.StatutDefautProjet);
  }

  goToedit(data : any){
    this.localStorageService.saveDataProjet(data);

    this.router.navigate(["/modifier_projet"]);

  }

    //récupérer les projets par catégorie
    getListProjetByStatut(data : string): void {
  
      let dataStatut : any = {
        "statut" : data
      };
      this.isLoading = true;

      this.adminService.getListProjetByUser(dataStatut).subscribe(
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
