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
  selector: 'app-edit-pubsolidaire',
  templateUrl: './edit-pubsolidaire.component.html',
  styleUrls: ['./edit-pubsolidaire.component.scss']
})
export class EditPubSolidaireComponent implements OnInit {

  dataProjet: any = {};
  titre: string = "";
  description: string = "";
  lien_video: string = "";
  montant_projet: string = "";
  isLoading: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(private adminService: AdminService, private toastr: ToastrService, private router: Router, private localStorageService: LocalStorageService) {

    this.dataProjet = this.localStorageService.getDataProjet();
    console.log(this.dataProjet);
    this.titre = this.dataProjet.titre;
    this.lien_video = this.dataProjet.lien_video;
    this.montant_projet = this.dataProjet.montant_projet;
    this.description = this.dataProjet.description;
  }
  ngOnInit(): void {
  }

  savePubSolidaireUpdated() {

  
    if (this.titre === '' || this.titre === undefined) {
      this.toastr.error('Veuillez saisir le titre', "Création de la publicité Solidaire", { positionClass: 'toast-top-center' });
      return;
    }

    if (this.description === '' || this.description === undefined) {
      this.toastr.error('Veuillez saisir la description', "Création de la publicité Solidaire", { positionClass: 'toast-top-center' });
      return;
    }

    if (this.montant_projet === '' || this.montant_projet === undefined) {
      this.toastr.error('Veuillez saisir le montant du projet', "Création de la publicité Solidaire", { positionClass: 'toast-top-center' });
      return;
    }

    if (this.lien_video === '' || this.lien_video === undefined) {
      this.toastr.error('Veuillez saisir la lien de la vidéo', "Création de la publicité Solidaire", { positionClass: 'toast-top-center' });
      return;
    }

    let data: any = {
      'titre': this.titre,
      'description': this.description,
      'lien_video': this.lien_video,
      'id': this.dataProjet.id,
      'montant_projet': this.montant_projet
    }
    
    this.isLoading = true;

    this.adminService.editPubSolidaire(data).subscribe((result) => {

      this.isLoading = false;

      if (result === undefined || result.status === "error") {
        let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
        this.toastr.error(error, "Mise à jour de la publicité Solidaire", { positionClass: 'toast-top-center' });
        this.isLoading = false;
        return;
      } else {
        this.isLoading = false;
        let info: string = result.message;
        this.toastr.info(info, "Mise à jour de la publicité Solidaire", { positionClass: 'toast-top-center' });
        this.router.navigate(["/list-pubsolidaire"]);

      }
    });

  }


}
