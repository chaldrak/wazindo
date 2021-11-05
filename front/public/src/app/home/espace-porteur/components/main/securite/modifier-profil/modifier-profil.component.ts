import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Profil } from 'src/app/shared/models/profil';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';
import {
  PorteurService,
} from 'src/app/shared/services/porteur-service/porteur.service';

@Component({
  selector: 'app-modifier-profil',
  templateUrl: './modifier-profil.component.html',
  styleUrls: ['./modifier-profil.component.css']
})
export class ModifierProfilComponent implements OnInit {
  dataUser: any;
  profil: Profil = new Profil();
  public themeLogo: string = 'assets/images/wazindotrans.png';
  loading: boolean;

  constructor(private localStorageService: LocalStorageService, private toastr: ToastrService,private ngxService: NgxUiLoaderService, private router: Router, private porteurService: PorteurService) {

  }

  ngOnInit(): void {
    this.dataUser = this.localStorageService.getUser();
    console.log(this.dataUser);
    this.profil.email = this.dataUser.email;
    this.profil.nom = this.dataUser.nom;
    this.profil.prenom = this.dataUser.prenom;
    this.profil.biographie = this.dataUser.bibliographie;
    this.profil.facebook = this.dataUser.url_facebook;
    this.profil.twitter = this.dataUser.url_twitter;
    this.profil.youtube = this.dataUser.url_youtube;
    this.profil.linkedln = this.dataUser.url_linkedln;

  }


  updateProfil() {
    this.ngxService.start();

    console.log(this.profil);
    if (!this.profil.canEdit()) {
      this.toastr.error(this.profil.getErrorMessage(), "Connexion", { positionClass: 'toast-top-center' });
      this.ngxService.stop();

      return;
    }

    this.porteurService.updateProfil(this.profil).subscribe((result) => {
      console.log(result);

      if (result === undefined) {
        let error: string = "Une erreur est survenue. Si ce message persiste, veuillez patienter puis réessayer dans quelques minutes.";
        this.toastr.error(error, "Attention", { positionClass: 'toast-top-center' });
        this.ngxService.stop();

        return;
      }

      if (result.status === "error") {
        let error: string = result.message;
   
        this.toastr.error(error, "Attention", { positionClass: 'toast-top-center' });
        this.ngxService.stop();

        return;
      } else {
        this.localStorageService.saveUser(result.data);
   
        this.toastr.success(result.message, "Attention", { positionClass: 'toast-top-center' });
        this.ngxService.stop();
        this.router.navigate(["/porteur/dashboard"]);
      }
    });

  }
}
