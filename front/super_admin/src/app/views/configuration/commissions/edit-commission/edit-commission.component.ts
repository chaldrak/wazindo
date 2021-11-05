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
  selector: 'app-edit-commission',
  templateUrl: './edit-commission.component.html',
  styleUrls: ['./edit-commission.component.scss']
})
export class EditCommissionComponent implements OnInit {

  dataProjet: any = {};
  libelle: string = "";
  valeur: string = "";
  isLoading: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(private adminService: AdminService, private toastr: ToastrService, private router: Router, private localStorageService: LocalStorageService) {

    this.dataProjet = this.localStorageService.getDataProjet();
    console.log(this.dataProjet);
    this.libelle = this.dataProjet.code;
    this.valeur = this.dataProjet.valeur;
  }
  ngOnInit(): void {
  }

  saveCommissionUpdated() {

    if (this.libelle === '' || this.libelle === undefined) {
      this.toastr.error('Veuillez saisir le libellé de la commission', "Mise à jour de Commission", { positionClass: 'toast-top-center' });
      return;
    }

    if (this.valeur === '' || this.valeur === undefined) {
      this.toastr.error('Veuillez saisir la valeur de la commission', "Mise à jour de Commission", { positionClass: 'toast-top-center' });
      return;
    }

    let data : any = {
      'libelle' : this.libelle,
      'id' : this.dataProjet.id,
      'valeur': this.valeur
    }
    this.isLoading = true;

    this.adminService.updateCommission(data).subscribe((result) => {

      this.isLoading = false;

      if (result === undefined || result.status === "error") {
        let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
        this.toastr.error(error, "Edition de Commission", { positionClass: 'toast-top-center' });
        this.isLoading = false;
        return;
      } else {
        this.isLoading = false;
        let info: string = result.message;
        this.toastr.info(info, "Edition de Commission", { positionClass: 'toast-top-center' });
    this.router.navigate(["/list-commission"]);
     
      }
    });

  }


}
