import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Commentaire } from 'src/app/shared/models/produit';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public themeLogo: string = 'assets/images/wazindotrans.png'; // 'assets/images/icon/logo-2.png'; // Change Logo
  ligneList: any[] = [];
  public commentaire: Commentaire = new Commentaire();
  valeurPhone: any = { valeur: "" };
  valeurEmail: any = { valeur: "" };
  valeurAdresse: any = { valeur: "" };
  constructor(private publicService: AdminService, private toastr: ToastrService, private router: Router) {
    this.getListLigne();
  }

  ngOnInit(): void {
  }


  sendMailContact() {

    if (!this.commentaire.canSendContact()) {
      this.toastr.error(this.commentaire.getErrorMessage(), "Envoi du formulaire de Contact", { positionClass: 'toast-top-center' });
      return;
    }
    let data: any = {
      'nom': this.commentaire.nom_user,
      'email': this.commentaire.email,
      'telephone': this.commentaire.telephone,
      'message': this.commentaire.commentaire,
      'prenom': this.commentaire.prenoms
    }

    this.publicService.sendMailContact(data).subscribe((result) => {


      if (result === undefined) { this.toastr.error("Une erreur inconnue est survenue. Veuillez réessayer.", "Attention", { positionClass: 'toast-top-center' }); return; }

      if (result.status === "error") {
        this.toastr.error(result.message, "Attention", { positionClass: 'toast-top-center' });
        return;
      } else {
        this.toastr.success('Votre message a été envoyé avec succès', "Envoi du Mail", { positionClass: 'toast-top-center' });
        // this.router.navigate(['/']);
        this.commentaire = new Commentaire();

      }

    });
  }


  //get list ligne
  getListLigne() {
    this.ligneList = [];
    this.publicService.getListLigne().subscribe((result) => {

      this.ligneList = result.data;

      if (this.ligneList[0] !== null && this.ligneList[0] !== undefined) {
        this.valeurEmail = this.ligneList[0];
      }

      if (this.ligneList[1] !== null && this.ligneList[1] !== undefined) {
        this.valeurPhone = this.ligneList[1];
      }

      if (this.ligneList[2] !== null && this.ligneList[2] !== undefined) {
        this.valeurAdresse = this.ligneList[2];
      }




    });
  }//end getListLigne
}
