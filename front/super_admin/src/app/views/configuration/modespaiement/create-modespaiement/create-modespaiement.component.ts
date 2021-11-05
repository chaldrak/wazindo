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
  selector: 'app-create-modespaiement',
  templateUrl: './create-modespaiement.component.html',
  styleUrls: ['./create-modespaiement.component.scss']
})
export class CreateModesPaiementComponent implements OnInit {

  dataProjet: any = {};
  nom: string = "";
  code: string = "";
  isLoading: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(private adminService: AdminService, private toastr: ToastrService, private router: Router, private localStorageService: LocalStorageService) {

  }
  ngOnInit(): void {
  }

  saveCommissionUpdated() {

    if (this.nom === '' || this.nom === undefined) {
      this.toastr.error('Veuillez saisir le nom du mode de paiement', "Création de mode de paiement", { positionClass: 'toast-top-center' });
      return;
    }

    if (this.code === '' || this.code === undefined) {
      this.toastr.error('Veuillez saisir le code du mode de paiement', "Création de mode de paiement", { positionClass: 'toast-top-center' });
      return;
    }

    let data: any = {
      'nom': this.nom,
      'code': this.code
    }
    this.isLoading = true;

    this.adminService.modePaiementCreate(data).subscribe((result) => {

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
