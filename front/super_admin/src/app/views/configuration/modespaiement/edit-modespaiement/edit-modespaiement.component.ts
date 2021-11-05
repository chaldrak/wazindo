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
  selector: 'app-edit-modespaiement',
  templateUrl: './edit-modespaiement.component.html',
  styleUrls: ['./edit-modespaiement.component.scss']
})
export class EditModesPaiementComponent implements OnInit {

  dataProjet: any = {};
  nom: string = "";
  code: string = "";
  isLoading: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(private adminService: AdminService, private toastr: ToastrService, private router: Router, private localStorageService: LocalStorageService) {

    this.dataProjet = this.localStorageService.getDataProjet();
    console.log(this.dataProjet);
    this.nom = this.dataProjet.nom;
    this.code = this.dataProjet.code;
  }
  ngOnInit(): void {
  }

  saveModePaiementUpdated() {

    if (this.code === '' || this.code === undefined) {
      this.toastr.error('Veuillez saisir le code du mode de paiement', "Mise à jour de Mode de paiement", { positionClass: 'toast-top-center' });
      return;
    }

    if (this.nom === '' || this.nom === undefined) {
      // tslint:disable-next-line:max-line-length
      this.toastr.error('Veuillez saisir le nom du mode de paiement', 'Mise à jour de Mode de paiement', { positionClass: 'toast-top-center' });
      return;
    }

    let data: any = {
      'code': this.code,
      'id': this.dataProjet.id,
      'nom': this.nom
    }
    this.isLoading = true;

    this.adminService.modePaiementEdit(data).subscribe((result) => {

      this.isLoading = false;

      if (result === undefined || result.status === "error") {
        let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
        this.toastr.error(error, "Mise à jour de Mode de paiement", { positionClass: 'toast-top-center' });
        this.isLoading = false;
        return;
      } else {
        this.isLoading = false;
        let info: string = result.message;
        this.toastr.info(info, "Mise à jour de Mode de paiement", { positionClass: 'toast-top-center' });
        this.router.navigate(["/list-modepaiement"]);

      }
    });

  }


}
