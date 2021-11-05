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
  selector: 'app-afficher-contribution',
  templateUrl: './afficher-contribution.component.html',
  styleUrls: ['./afficher-contribution.component.css']
})
export class AfficherContributionComponent implements OnInit {
  isLoading: boolean;
  listContributionByProjet: any[] = [];
  dataUser: any = {};
  idProjet: string = "";
  public themeLogo: string = 'assets/images/wazindotrans.png';
  listProjetUser: any[] = [];
  pageStartIndex: number = 0; 
  pageLimit: number = 0;
  totalItems = 0;
  itemsPerPage: number = 6;
  currentPage = 1;
  returnedItems: any = [];

  constructor(private porteurService: PorteurService, private localStorageService: LocalStorageService) {
    this.dataUser = this.localStorageService.getUser();
    console.log(this.dataUser);


    this.getlistContributionByProjet(this.dataUser.email);
  }

  ngOnInit(): void {
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedItems = this.listContributionByProjet.slice(startItem, endItem);
  }

  seacrch() {
    console.log(this.idProjet);
    this.getlistContributionByProjet(this.idProjet);
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
  getlistContributionByProjet(email: string): void {

    this.porteurService.getListContributionByProjet(email).subscribe(
      (result: any) => {
        this.isLoading = false;
        console.log(result);
        let resp = result;


        if (resp === null || resp === undefined) {
          this.listContributionByProjet = this.listContributionByProjet;
          return;
        }
        if (resp.status === "error") {
          this.listContributionByProjet = this.listContributionByProjet;
          return;
        }
        this.listContributionByProjet = resp.data;
        this.returnedItems = this.listContributionByProjet.slice(0, this.itemsPerPage);
        this.totalItems = this.listContributionByProjet.length;
      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getlistContributionByProjet


}
