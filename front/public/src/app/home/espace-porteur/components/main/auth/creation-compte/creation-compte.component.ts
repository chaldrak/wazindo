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
  ModalAfterInscriptionComponent,
} from 'src/app/home/wazindo/contributions/modalafterinscription/modalafterinscription.component';
import { Profil } from 'src/app/shared/models/profil';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';
import {
  PorteurService,
} from 'src/app/shared/services/porteur-service/porteur.service';
import { PublicService } from 'src/app/shared/services/public.service';

@Component({
  selector: 'app-creation-compte',
  templateUrl: './creation-compte.component.html',
  styleUrls: ['./creation-compte.component.css']
})
export class CreationCompteComponent implements OnInit {
  profil: Profil = new Profil();
  paysList: any[] = [];
  public themeLogo: string = '../../../../../../../assets/images/wazindotrans.png';
  public Logo: string = '../../../../../../../assets/img/inscription.png';
  bsModalRef: BsModalRef;
  isPasswordVisible: boolean;

  constructor(
    private toastr: ToastrService, private modalService: BsModalService,
    private router: Router, private publicService: PublicService, private ngxService: NgxUiLoaderService,
    private porteurService: PorteurService, private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.profil.email = "";
    this.profil.password = "";
    this.profil.password_confirmation = "";
    this.getListPays();
  }


  //récupérer la liste des pays
  getListPays(): void {

    this.paysList = [];

    this.publicService.getListPays().subscribe(
      (result: any) => {
        let resp = result;
        if (resp.status === "error") {
          this.paysList = [];
          return;
        } else {
          this.paysList = resp.data;
        }
      },
      err => {
        return;
      }
    );
  } //end getListPays

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


  //methode de connexion
  goToAuth() {

    this.profil.password_confirmation = this.profil.password;
    this.profil.telephone = new String(this.profil.telephone).toString();
    console.log(this.profil);

    if (!this.profil.canSave()) {
      this.toastr.error(this.profil.getErrorMessage(), 'Inscription');
      return;
    }
    this.ngxService.start();
    this.porteurService.createProfil(this.profil).subscribe((result) => {

      if (result === undefined) {
        this.ngxService.stop();
        let error: string = 'Une erreur est survenue. Si ce message persiste, veuillez patienter puis réessayer dans quelques minutes.';
        this.toastr.error(error, 'Attention', { positionClass: 'toast-top-center' });
        return;
      }

      let info: string = result.message;
      this.ngxService.stop();

      if (result.status === 'error') {
        this.toastr.error(info, 'Attention', { positionClass: 'toast-top-center' });
        return;
      } else {
        this.toastr.info(info, 'Félicitations', { positionClass: 'toast-top-center' });

        const initialState = { list: [], title: 'Modal with component' };
        this.bsModalRef = this.modalService.show(ModalAfterInscriptionComponent, { initialState });
        this.bsModalRef.content.closeBtnName = 'Fermer';

        this.bsModalRef.onHidden.subscribe((reason: string | any) => {
          if (typeof reason !== 'string') {
            reason = `onHide(), modalId is : ${reason.id}`;

          }
          const _reason = reason ? `, dismissed by ${reason}` : '';
          //console.log(reason);

        });
      }
    });
  }//end goToAuth

  //redirection vers connexion
  goToConnect() {
    this.router.navigate(['/porteur/auth']);
  }//end goToConnect


}
