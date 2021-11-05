import {
  Component,
  OnInit,
} from '@angular/core';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';
import {
  PorteurService,
} from 'src/app/shared/services/porteur-service/porteur.service';

@Component({
  selector: 'app-afficher-contributeur',
  templateUrl: './afficher-contributeur.component.html',
  styleUrls: ['./afficher-contributeur.component.css']
})
export class AfficherContributeurComponent implements OnInit {
  isLoading: boolean;
  listContributeurByProjet: any[] = [];
  dataUser: any = {};
  public themeLogo: string = 'assets/images/wazindotrans.png';
  idProjet: string = "";
  listProjetUser: any[] = [];
  totalItems = 0;
  pageStartIndex: number = 0; 
  pageLimit: number = 0;
  itemsPerPage: number = 6;
  currentPage = 1;
  returnedItems: any = [];

  constructor(private porteurService: PorteurService, private localStorageService: LocalStorageService) {
    this.dataUser = this.localStorageService.getUser();
    console.log(this.dataUser);

    this.getListProjetByCategory(this.dataUser.email);
  }

  ngOnInit(): void {
  }


  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedItems = this.listContributeurByProjet.slice(startItem, endItem);
  }

  seacrch() {
    console.log(this.idProjet);
    this.getListContributeurByProjet(this.idProjet);
  }

  //récupérer les projets par catégorie
  getListProjetByCategory(user: string): void {
    let data: any = {
      'email_address': user,
      'statut': ""
    };

    this.isLoading = true;

    this.porteurService.getListProjetByUser(data).subscribe(
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


  //récupérer les contributeurs par projet
  getListContributeurByProjet(idProjet: string): void {

    this.porteurService.getListContributeurByProjet(idProjet).subscribe(
      (result: any) => {
        this.isLoading = false;
        console.log(result);
        let resp = result;


        if (resp === null || resp === undefined) {
          this.listContributeurByProjet = this.listContributeurByProjet;
          return;
        }
        if (resp.status === "error") {
          this.listContributeurByProjet = this.listContributeurByProjet;
          return;
        }
        this.listContributeurByProjet = resp.data;
        this.returnedItems = this.listContributeurByProjet.slice(0, this.itemsPerPage);
        this.totalItems = this.listContributeurByProjet.length;
      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getListContributeurByProjet
}
