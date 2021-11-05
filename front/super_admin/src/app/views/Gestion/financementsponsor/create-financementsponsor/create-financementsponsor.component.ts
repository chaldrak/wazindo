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
  selector: 'app-create-financementsponsor',
  templateUrl: './create-financementsponsor.component.html',
  styleUrls: ['./create-financementsponsor.component.scss']
})
export class CreateFinancementSponsorComponent implements OnInit {

  dataProjet: any = { };
  listSponsor: any[] = [];
  listPubSolidaire: any[] = [];
  sponsor_id: string = "";
  montant_apport: string = "";
  pub_id: string = "";
  isLoading: boolean;


  constructor(private adminService: AdminService, private toastr: ToastrService, private router: Router, private localStorageService: LocalStorageService) {
    this.getListSponsor();
    this.getListPubSolidaire();
  }


  ngOnInit(): void {
  }

  //récupérer les projets par catégorie
  getListSponsor(): void {
    this.adminService.getListSponsor().subscribe(
      (result: any) => {
        this.isLoading = false;
        console.log(result);
        let resp = result;

        if (result === undefined || result.status === "error") {
          let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
          this.toastr.error(error, "liste sponsor", { positionClass: 'toast-top-center' });
          this.isLoading = false;
          this.listSponsor = this.listSponsor;
          return;
        } else {
          this.isLoading = false;
          this.listSponsor = resp.data;

        }
      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getListCategorie

  //récupérer les projets par catégorie
  getListPubSolidaire(): void {
    this.adminService.getListPubSolidaire().subscribe(
      (result: any) => {
        this.isLoading = false;
        console.log(result);
        let resp = result;

        if (result === undefined || result.status === "error") {
          let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
          this.toastr.error(error, "liste publicité solidaire", { positionClass: 'toast-top-center' });
          this.isLoading = false;
          this.listPubSolidaire = this.listPubSolidaire;
          return;
        } else {
          this.isLoading = false;
          this.listPubSolidaire = resp.data;

        }
      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getListCategorie

  saveFiancementSponsor() {

    if (this.sponsor_id === '' || this.sponsor_id === undefined) {
      this.toastr.error('Veuillez sélectionner le sponsor', "Création de financement sponsor", { positionClass: 'toast-top-center' });
      return;
    }

    if (this.pub_id === '' || this.pub_id === undefined) {
      this.toastr.error('Veuillez sélectionner la publicité solidaire', "Création de financement sponsor", { positionClass: 'toast-top-center' });
      return;
    }

    if (this.montant_apport === '' || this.pub_id === undefined) {
      this.toastr.error('Veuillez saisir le montant apport', "Création de financement sponsor", { positionClass: 'toast-top-center' });
      return;
    }

    let data: any = {
      'montant_apport': this.montant_apport,
      'pub_id': this.pub_id,
      'sponsor_id': this.sponsor_id
    }

    this.isLoading = true;

    this.adminService.createFinancementSponsor(data).subscribe((result) => {

      this.isLoading = false;

      if (result === undefined || result.status === "error") {
        let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
        this.toastr.error(error, "Création de financement sponsor", { positionClass: 'toast-top-center' });
        this.isLoading = false;
        return;
      } else {
        this.isLoading = false;
        let info: string = result.message;
        this.toastr.info(info, "Création de financement sponsor", { positionClass: 'toast-top-center' });
        this.router.navigate(["/list-financementsponsor"]);

      }
    });

  }


}
