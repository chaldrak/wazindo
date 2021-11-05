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
  selector: 'app-create-categorie',
  templateUrl: './create-categorie.component.html',
  styleUrls: ['./create-categorie.component.scss']
})
export class CreateCategorieComponent implements OnInit {

  dataProjet: any = {};
  nom: string = "";
  reference: string = "";
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

    if (this.nom === '' || this.nom === undefined) {
      this.toastr.error('Veuillez saisir le nom de la catégorie', "Création de catégorie", { positionClass: 'toast-top-center' });
      return;
    }

    if (this.reference === '' || this.reference === undefined) {
      this.toastr.error('Veuillez saisir la référence de la catégorie', "Création de catégorie", { positionClass: 'toast-top-center' });
      return;
    }

    if (this.imageURL === '' || this.imageURL === undefined) {
      this.toastr.error('Veuillez ajouter une image', "Création de catégorie", { positionClass: 'toast-top-center' });
      return;
    }

    let data: any = {
      'nom': this.nom,
      'reference': this.reference
    }
    this.isLoading = true;

    this.adminService.saveCategorie(this.imageContent, data).subscribe((result) => {

      this.isLoading = false;

      if (result === undefined || result.status === "error") {
        let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
        this.toastr.error(error, "Création de mode de paiement", { positionClass: 'toast-top-center' });
        this.isLoading = false;
        return;
      } else {
        this.isLoading = false;
        let info: string = result.message;
        this.toastr.info(info, "Création de mode de paiement", { positionClass: 'toast-top-center' });
        this.router.navigate(["/list-modepaiement"]);

      }
    });

  }


}
