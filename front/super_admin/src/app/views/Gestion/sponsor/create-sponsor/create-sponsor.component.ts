import {
  Component,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";

import {
  AdminService,
} from "../../../../shared/services/adminservice/admin.service";
import {
  LocalStorageService,
} from "../../../../shared/services/app/localstorage.service";

@Component({
  selector: 'app-create-sponsor',
  templateUrl: './create-sponsor.component.html',
  styleUrls: ['./create-sponsor.component.scss']
})
export class CreateSponsorComponent implements OnInit {

  dataProjet: any = {};
  nom: string = "";
  adresse: string = "";
  contact: string = "";
  personne_reference: string = "";
  isLoading: boolean;

  constructor(private adminService: AdminService, private toastr: ToastrService, private router: Router, private localStorageService: LocalStorageService) {

  }
  ngOnInit(): void {
  }


  saveSponsor() {

    if (this.nom === '' || this.nom === undefined) {
      this.toastr.error('Veuillez saisir le nom du sponsor', "Mise à jour du Sponsor", { positionClass: 'toast-top-center' });
      return;
    }

    if (this.adresse === '' || this.adresse === undefined) {
      this.toastr.error("Veuillez saisir l'adresse du sponsor", "Mise à jour du Sponsor", { positionClass: 'toast-top-center' });
      return;
    }

    if (this.contact === '' || this.contact === undefined) {
      this.toastr.error("Veuillez saisir le contact du sponsor", "Mise à jour du Sponsor", { positionClass: 'toast-top-center' });
      return;
    }
    if (this.personne_reference === '' || this.personne_reference === undefined) {
      this.toastr.error("Veuillez saisir les coordonnées de la personne reference du sponsor", "Mise à jour du Sponsor", { positionClass: 'toast-top-center' });
      return;
    }



    let data: any = {
      'contact': this.contact,
      'personne_reference': this.personne_reference,
      'adresse': this.adresse,
      'nom': this.nom
    }

    this.isLoading = true;

    this.adminService.createSponsor(data).subscribe((result) => {

      this.isLoading = false;

      if (result === undefined || result.status === "error") {
        let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
        this.toastr.error(error, "Création de Sponsor", { positionClass: 'toast-top-center' });
        this.isLoading = false;
        return;
      } else {
        this.isLoading = false;
        let info: string = result.message;
        this.toastr.info(info, "Création de Sponsor", { positionClass: 'toast-top-center' });
        this.router.navigate(["/list-sponsor"]);

      }
    });

  }


}
