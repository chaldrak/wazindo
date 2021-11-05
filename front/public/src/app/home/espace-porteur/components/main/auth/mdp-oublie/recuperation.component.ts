import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

//import { NgxSpinnerService } from 'ngx-spinner';
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
  selector: 'app-recuperation',
  templateUrl: './recuperation.component.html',
  styleUrls: ['./recuperation.component.css']
})
export class RecuperationComponent implements OnInit {

  profil: Profil = new Profil();
  loading: boolean;
  dataUrl: string = '';
  public themeLogo: string = '../../../../../../../assets/images/wazindotrans.png';

  constructor(
    //private spinner: NgxSpinnerService, 
    private localStorageService: LocalStorageService, private toastr: ToastrService, private router: Router, private porteurService: PorteurService,
    private ngxService: NgxUiLoaderService) {

    this.dataUrl = this.localStorageService.getUrl();
  }

  ngOnInit(): void {
    this.profil.email = "";
    this.profil.password = "";
  }

  //inscription
  goToCreerCompte() {
    this.router.navigate(["/public/creer-compte"]);
  }

  //recuperation de compte
  resetUserCompte() {
    this.loading = true;
    if (!this.profil.canReset()) {
      this.toastr.error(this.profil.getErrorMessage(), "Connexion", { positionClass: 'toast-top-center' });
      this.loading = false;
      return;
    }

    this.ngxService.start();

    this.porteurService.getResetCompte(this.profil).subscribe((result) => {


      if (result === undefined) {
        let error: string = "Vos paramètres de connexion sont incorrects. Veuillez réessayer";

        this.toastr.error(error, "Attention", { positionClass: 'toast-top-center' });
        this.loading = false;
        this.ngxService.stop();
        return;
      }

      if (result.status === "error") {
        let error: string = result.message;

        this.toastr.error(error, "Attention", { positionClass: 'toast-top-center' });
        this.loading = false;
        this.ngxService.stop();
        return;
      } else {
        this.loading = false;
        this.ngxService.stop();
        this.localStorageService.saveUser(result.data);

        if (result.data.has_project_supported === true) {
          if (this.dataUrl === "" || this.dataUrl === null || this.dataUrl === undefined) {
            this.router.navigate(["/porteur/dashboard"]);
          } else {
            this.router.navigate([this.dataUrl]);
          }

        } else {
          if (this.dataUrl === '/porteur/dashboard') {
            this.toastr.info('Vous devez soutenir au moins un projet avant de pouvoir faire une proposition de projet', "Attention", { positionClass: 'toast-top-center' });

            this.router.navigate(["/public/accueil"]);
          } else {
            if (this.dataUrl === "" || this.dataUrl === null || this.dataUrl === undefined) {
              this.router.navigate(['/public/accueil']);
            } else {
              this.router.navigate([this.dataUrl]);
            }
          }
        }
      }
    });

  }//end resetUserCompte
}
