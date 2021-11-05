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
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.scss']
})
export class EditCategorieComponent implements OnInit {

  dataProjet: any = {};
  nom: string = "";
  reference: string = "";
  isLoading: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(private adminService: AdminService, private toastr: ToastrService, private router: Router, private localStorageService: LocalStorageService) {

    this.dataProjet = this.localStorageService.getDataProjet();
    console.log(this.dataProjet);
    this.nom = this.dataProjet.nom;
    this.reference = this.dataProjet.code;
  }
  ngOnInit(): void {
  }

  saveCategorieUpdated() {

    if (this.reference === '' || this.reference === undefined) {
      this.toastr.error('Veuillez saisir le code du mode de paiement', "Mise à jour de Catégorie", { positionClass: 'toast-top-center' });
      return;
    }

    if (this.nom === '' || this.nom === undefined) {
      // tslint:disable-next-line:max-line-length
      this.toastr.error('Veuillez saisir le nom de la catégorie', 'Mise à jour de Catégorie', { positionClass: 'toast-top-center' });
      return;
    }

    let data: any = {
      'reference': this.reference,
      'icone': this.dataProjet.icone,
      'id': this.dataProjet.id,
      'nom': this.nom
    }
    this.isLoading = true;

    this.adminService.categorieEdit(data).subscribe((result) => {

      this.isLoading = false;

      if (result === undefined || result.status === "error") {
        let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
        this.toastr.error(error, "Mise à jour de Catégorie", { positionClass: 'toast-top-center' });
        this.isLoading = false;
        return;
      } else {
        this.isLoading = false;
        let info: string = result.message;
        this.toastr.info(info, "Mise à jour de Catégorie", { positionClass: 'toast-top-center' });
        this.router.navigate(["/list-categorie"]);

      }
    });

  }


}
