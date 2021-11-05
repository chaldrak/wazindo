import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Diffusion } from 'src/app/shared/models/diffusion';
import {
  ConfirmDialogService,
} from 'src/app/shared/services/confirm-dialog/confirm-dialog.service';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';
import {
  PorteurService,
} from 'src/app/shared/services/porteur-service/porteur.service';

import {
  ModalDismissReasons,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-creer-liste-diffusion',
  templateUrl: './creer-liste-diffusion.component.html',
  styleUrls: ['./creer-liste-diffusion.component.css']
})
export class CreerListeDiffusionComponent implements OnInit {
  diffusion: Diffusion = new Diffusion();
  public themeLogo: string = 'assets/images/wazindotrans.png';
  dataUser: any;
  listData: any[] = [];
  listContactDiffusion: any[] = [];
  isLoading: boolean = false;
  closeResult = '';
  message: string = "";
  contact: string = "";


  // tslint:disable-next-line:max-line-length
  constructor(private toastr: ToastrService, private modalService: NgbModal, private confirmDialogService: ConfirmDialogService, private porteurService: PorteurService, private router: Router, private localStorageService: LocalStorageService) {
    this.dataUser = this.localStorageService.getUser();
    console.log(this.dataUser);

  }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  saveDetailDiffusion() {
    if (!this.diffusion.canSave()) {
      this.toastr.error(this.diffusion.getErrorMessage(), "Ajout de Contact", { positionClass: 'toast-top-center' });
      this.isLoading = false;
      return;
    }

    let data: any = {
      'nom': this.diffusion.nom,
      'telephone': this.diffusion.telephone,
      'email': this.diffusion.email
    }
    this.listContactDiffusion.push(data);

    this.diffusion.nom = "";
    this.diffusion.telephone = "";
    this.diffusion.email = "";
    this.modalService.dismissAll();

  }

  deleteContactDiffusion(index: number) {
    this.listContactDiffusion.splice(index, 1);
  }

  saveDiffusion() {
    if (this.diffusion.nom_diffusion === undefined || this.diffusion.nom_diffusion === null || this.diffusion.nom_diffusion.trim() === "") {
      this.toastr.error('Veuillez saisir le nom de la liste de diffusion', "Création diffusion", { positionClass: 'toast-top-center' });
      return;
    }

    if (this.listContactDiffusion.length === 0) {
      this.toastr.error('Veuillez ajouter des contacts pour la liste de diffusion', "Création diffusion", { positionClass: 'toast-top-center' });
      return;
    }

    let data: any = {
      'nom_contact': this.diffusion.nom_diffusion,
      'email': this.dataUser.email,
      'nombre_contact': this.listContactDiffusion.length,
      'contact': this.listContactDiffusion
    }

    this.isLoading = true;

    this.porteurService.saveDiffusion(data).subscribe((result) => {

      this.isLoading = false;

      if (result === undefined) {
        let error: string = "Une erreur est survenue. Si ce message persiste, veuillez patienter puis réessayer dans quelques minutes.";
        this.toastr.error(error, "Attention", { positionClass: 'toast-top-center' });
        return;
      }

      if (result.status === "error") {
        let error: string = result.message;
        this.toastr.error(error, "Attention", { positionClass: 'toast-top-center' });
        return;
      } else {
        let error: string = result.message;
        this.toastr.success(error, "Attention", { positionClass: 'toast-top-center' });
        this.router.navigate(["/porteur/afficher_liste_diffusion"]);
      }
    });


  }

  sharViaWhatsapp(){
const url = 'https://wa.me/' + this.contact + '?text=' + this.message;
console.log(url);
window.location.href = url;
  }
}
