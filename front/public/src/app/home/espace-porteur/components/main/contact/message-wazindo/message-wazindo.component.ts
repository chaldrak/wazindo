import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { MessageWazindo } from 'src/app/shared/models/message_wazindo';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';
import {
  PorteurService,
} from 'src/app/shared/services/porteur-service/porteur.service';

@Component({
  selector: 'app-message-wazindo',
  templateUrl: './message-wazindo.component.html',
  styleUrls: ['./message-wazindo.component.css']
})
export class MessageWazindoComponent implements OnInit {
  message: MessageWazindo = new MessageWazindo();
  public themeLogo: string = 'assets/images/wazindotrans.png';
  dataUser: any;
  isLoading: boolean;
  listProjets: any[] = [];
  StatutDefautProjet: string = "";
  projet: string = "";

  // tslint:disable-next-line:max-line-length
  constructor(private porteurService: PorteurService, private localStorageService: LocalStorageService, private toastr: ToastrService, private router: Router) {
    this.dataUser = this.localStorageService.getUser();
    console.log(this.dataUser);
    this.getListProjetByStatut();
  }

  ngOnInit(): void {
    this.getListProjetByStatut();

  }

  sendMessageWazindo() {
    if (!this.message.canSave()) {
      this.toastr.error(this.message.getErrorMessage(), "Message", { positionClass: 'toast-top-center' });
      return;
    }

    let data: any = {
      "description": this.message.contenu,
      "projet": this.projet,
      "titre": this.message.objet,
      "porteur": this.dataUser.email
    }

    this.porteurService.sendMessageWazindo(data).subscribe((result) => {
      console.log(result);

      if (result === undefined) {
        let error: string = "Une erreur est survenue. Si ce message persiste, veuillez patienter puis réessayer dans quelques minutes.";
        this.toastr.error(error, "Message", { positionClass: 'toast-top-center' });

        return;
      }

      if (result.status === "error") {
        let error: string = result.message;
        this.toastr.error(error, "Message", { positionClass: 'toast-top-center' });

        return;
      } else {
        this.toastr.success(result.message, "Message", { positionClass: 'toast-top-center' });
        this.router.navigate(["/porteur/afficher_liste_message"]);
      }
    });
  }


  //récupérer les projets par catégorie
  getListProjetByStatut(): void {

    let data: any = {
      'email_address': this.dataUser.email,
      'statut': this.StatutDefautProjet
    };
    this.isLoading = true;
    this.listProjets = [];

    this.porteurService.getListProjetByUser(data).subscribe(
      (result: any) => {
        this.isLoading = false;

        console.log(result);

        if (result === null || result === undefined) {
          this.listProjets = this.listProjets; return;
        }
        if (result.status === "error") { this.listProjets = this.listProjets; return; }
        this.listProjets = result.data;


      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getListProjetByStatut

  goToBack() {
    this.router.navigate(["/porteur/afficher_liste_message"]);
  }
}
