import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';
import {
  PorteurService,
} from 'src/app/shared/services/porteur-service/porteur.service';

@Component({
  selector: 'app-afficher-liste-message',
  templateUrl: './afficher-liste-message.component.html',
  styleUrls: ['./afficher-liste-message.component.css']
})
export class AfficherListeMessageComponent implements OnInit {

  listProjets: any[] = [];
  listMessageByProfil: any[] = [];
  public themeLogo: string = 'assets/images/wazindotrans.png';
  isLoading: boolean;
  StatutDefautProjet: string = "";
  dataUser: any;
  totalItems = 0;
  pageStartIndex: number = 0;
  pageLimit: number = 0;
  itemsPerPage: number = 0;
  currentPage = 1;
  returnedItems: any = [];

  constructor(private porteurService: PorteurService, private router: Router, private localStorageService: LocalStorageService) {
    this.dataUser = this.localStorageService.getUser();
    console.log(this.dataUser);

    this.getlistMessageByProfil();
    this.getListProjetByStatut();
  }


  ngOnInit(): void {
    this.dataUser = this.localStorageService.getUser();
    this.getlistMessageByProfil();
    this.getListProjetByStatut();
  }


  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedItems = this.listMessageByProfil.slice(startItem, endItem);
  }

  createMessage() {
    this.router.navigate(["/porteur/ecrire_wazindo"]);
  }
  

  //récupérer les projets par catégorie
  getListProjetByStatut(): void {

    let data: any = {
      'email_address': this.dataUser.email,
      'statut': this.StatutDefautProjet
    };
    this.isLoading = true;
    this.listProjets = [];

    this.porteurService.getListProjetByUser(data).subscribe(
      (result: any) => {
        this.isLoading = false;

        console.log(result);

        if (result === null || result === undefined) {
          this.listProjets = this.listProjets; return;
        }
        if (result.status === "error") { this.listProjets = this.listProjets; return; }
        this.listProjets = result.data;


      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getListProjetByStatut

  //récupérer la liste des diffusions
  getlistMessageByProfil(): void {
    let data: any = {
      'email': this.dataUser.email,
      'projet': this.StatutDefautProjet
    };
    this.isLoading = true;
    this.porteurService.getlistMessageByProfil(data).subscribe(
      (result: any) => {
        this.isLoading = false;
        let resp = result;


        if (resp === null || resp === undefined) {
          this.listMessageByProfil = this.listMessageByProfil;
          return;
        }
        if (resp.status === "error") {
          this.listMessageByProfil = this.listMessageByProfil;
          return;
        }
        this.listMessageByProfil = resp.data;
        this.returnedItems = this.listMessageByProfil.slice(0, this.itemsPerPage);
        this.totalItems = this.listMessageByProfil.length;
      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getlistMessageByProfil


  //récupérer les contributeurs par projet
  deleteDiffusionByProfil(idProjet: string): void {

    this.porteurService.deleteDiffusionByProfil(idProjet).subscribe(
      (result: any) => {
        this.isLoading = false;

        let resp = result;

      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getlistMessageByProfil
}
