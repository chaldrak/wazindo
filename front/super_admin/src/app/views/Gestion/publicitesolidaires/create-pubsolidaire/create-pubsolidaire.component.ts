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
  selector: 'app-create-pubsolidaire',
  templateUrl: './create-pubsolidaire.component.html',
  styleUrls: ['./create-pubsolidaire.component.scss']
})
export class CreatePubSolidaireComponent implements OnInit {

  dataProjet: any = {};
  titre: string = "";
  description: string = "";
  lien_video: string = "";
  montant_projet: string = "";
  isLoading: boolean;
  imageContent: File;
  imageDocument: File;
  public imagePath;
  imageURL: any;

  constructor(private adminService: AdminService, private toastr: ToastrService, private router: Router, private localStorageService: LocalStorageService) {

  }
  ngOnInit(): void {
  }

  previewContrepartie(files) {
    console.log(files);
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    this.imageContent = files[0];
    console.log(this.imageContent);

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageURL = reader.result;
    }
  }

  saveCategorie() {

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

    if (this.imageURL === '' || this.imageURL === undefined) {
      this.toastr.error('Veuillez ajouter une image', "Création de la publicité Solidaire", { positionClass: 'toast-top-center' });
      return;
    }

    let data: any = {
      'titre': this.titre,
      'description': this.description,
      'lien_video': this.lien_video,
      'montant_projet': this.montant_projet
    }
    
    this.isLoading = true;

    this.adminService.createPubSolidaire(this.imageContent, data).subscribe((result) => {

      this.isLoading = false;

      if (result === undefined || result.status === "error") {
        let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
        this.toastr.error(error, "Création de la publicité Solidaire", { positionClass: 'toast-top-center' });
        this.isLoading = false;
        return;
      } else {
        this.isLoading = false;
        let info: string = result.message;
        this.toastr.info(info, "Création de la publicité Solidaire", { positionClass: 'toast-top-center' });
        this.router.navigate(["/list-pubsolidaire"]);

      }
    });

  }


}
