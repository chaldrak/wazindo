import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  BsModalRef,
  BsModalService,
} from 'ngx-bootstrap/modal';
//import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  ModalErrorProjetComponent,
} from 'src/app/home/wazindo/contributions/modalerrorprojet/modalerrorprojet.component';
import { Profil } from 'src/app/shared/models/profil';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';
import {
  PorteurService,
} from 'src/app/shared/services/porteur-service/porteur.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  profil: Profil = new Profil();
  loading: boolean;
  dataUrl: string = '';
  public themeLogo: string = '../../../../../../../assets/images/wazindotrans.png';
  public Logo: string = '../../../../../../../assets/img/connexion.jpg';
  isPasswordVisible: boolean;
  bsModalRef: BsModalRef;

  constructor(
    //private spinner: NgxSpinnerService, 
    private localStorageService: LocalStorageService, private modalService: BsModalService,private toastr: ToastrService, private router: Router, private porteurService: PorteurService,
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

  //toogle password View
  tooglePasswordView(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }//fin tooglePasswordView

  //get get input type
  getInputType(): string {
    if (this.isPasswordVisible) { return "text"; } else { return "password"; }
  }//fin getInputType

  //get icon visible or not
  getIconValue(): string {
    if (this.isPasswordVisible) { return "fa fa-eye"; } else { return "fa fa-eye-slash"; }
  }//fin getIconValue


  //authenticate user
  authenticateUser() {
    this.loading = true;
    if (!this.profil.canConnect()) {
      this.toastr.error(this.profil.getErrorMessage(), "Connexion", { positionClass: 'toast-top-center' });
      this.loading = false;
      return;
    }
    this.ngxService.start();

    this.porteurService.getConnexion(this.profil).subscribe((result) => {


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
        this.localStorageService.saveUser(result.data);
        this.localStorageService.saveApiToken(result.token);

        if (this.dataUrl === "" || this.dataUrl === null || this.dataUrl === undefined) {
          this.ngxService.stop();
          this.router.navigate(["/porteur/dashboard"]);
        } else {
          if (this.dataUrl === '/porteur/proposer_projet') {

            if (result.data.est_admin === false) {

              this.porteurService.getListContributionByProfil(result.data.email).subscribe((value) => {
                console.log(result);
                this.ngxService.stop();

                if (value.data.length === 0) {

                  const initialState = { list: [], title: 'Modal with component' };
                  this.bsModalRef = this.modalService.show(ModalErrorProjetComponent, { initialState });
                  this.bsModalRef.content.closeBtnName = 'Fermer';

                  this.bsModalRef.onHidden.subscribe((reason: string | any) => {
                    if (typeof reason !== 'string') {
                      reason = `onHide(), modalId is : ${reason.id}`;

                    }
                    const _reason = reason ? `, dismissed by ${reason}` : '';
                    //console.log(reason);

                  });
                } else {
                  this.router.navigate([this.dataUrl]);
                }
              });

            } else {
              this.ngxService.stop();
              this.router.navigate([this.dataUrl]);

            }
          } else {
            this.ngxService.stop();
            this.router.navigate([this.dataUrl]);

          }
        }

      }
    });

  }//end authenticateUser
}
