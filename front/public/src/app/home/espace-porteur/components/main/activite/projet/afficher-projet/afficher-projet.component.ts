import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';
import {
  PorteurService,
} from 'src/app/shared/services/porteur-service/porteur.service';

@Component({
  selector: 'app-afficher-projet',
  templateUrl: './afficher-projet.component.html',
  styleUrls: ['./afficher-projet.component.css']
})
export class AfficherProjetComponent implements OnInit {

  listProjets: any[] = [];
  dataUser: any = {};
  StatutDefautProjet: string = "";
  isLoading: boolean;
  public themeLogo: string = 'assets/images/wazindotrans.png';

  constructor(private porteurService: PorteurService, private router: Router, private localStorageService: LocalStorageService) {
    this.dataUser = this.localStorageService.getUser();
    console.log(this.dataUser.email);

    this.getListProjetByStatut();
  }

  ngOnInit(): void {
  }

  searchProjects() {
    this.getListProjetByStatut();
  }

  goToDetail(data: any) {
    this.localStorageService.saveDataProjet(data);

    this.router.navigate(["/porteur/detail_projets"]);

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

}
