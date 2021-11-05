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
  selector: 'app-afficher-liste-diffusion',
  templateUrl: './afficher-liste-diffusion.component.html',
  styleUrls: ['./afficher-liste-diffusion.component.css']
})
export class AfficherListeDiffusionComponent implements OnInit {

  listDiffusionByProfil: any[] = [];
  public themeLogo: string = 'assets/images/wazindotrans.png';
  isLoading: boolean;
  dataUser: any;

  constructor(private porteurService: PorteurService, private router: Router, private localStorageService: LocalStorageService) {
    this.dataUser = this.localStorageService.getUser();
    console.log(this.dataUser);

    this.getListDiffusionByProfil(this.dataUser.email);
  }


  ngOnInit(): void {
  }

  createDiffusion() {
    this.router.navigate(["/porteur/creer_liste_diffusion"]);
  }

  //récupérer la liste des diffusions
  getListDiffusionByProfil(data: string): void {
    this.isLoading = true;
    this.porteurService.getListDiffusionByProfil(data).subscribe(
      (result: any) => {
        this.isLoading = false;

        let resp = result;


        if (resp === null || resp === undefined) {
          this.listDiffusionByProfil = this.listDiffusionByProfil;
          return;
        }
        if (resp.status === "error") {
          this.listDiffusionByProfil = this.listDiffusionByProfil;
          return;
        }
        this.listDiffusionByProfil = resp.data;

      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getlistDiffusionByProfil


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
  } //end getlistDiffusionByProfil
}
