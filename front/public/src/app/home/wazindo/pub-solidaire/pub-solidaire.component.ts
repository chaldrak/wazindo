import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  BsModalRef,
  BsModalService,
} from 'ngx-bootstrap/modal';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';
import { PublicService } from 'src/app/shared/services/public.service';

import {
  ModalPubSolidaireComponent,
} from '../modalpubsolidaire/modalpubsolidaire.component';

@Component({
  selector: 'app-pub-solidaire',
  templateUrl: './pub-solidaire.component.html',
  styleUrls: ['./pub-solidaire.component.css']
})
export class PubSolidaireComponent implements OnInit {
  dataUser: any = { };
  public themeLogo: string = "assets/images/wazindotrans.png"; // 'assets/images/icon/logo-2.png'; // Change Logo
  bsModalRef: BsModalRef;
  listPubSolidaire: any[] = [];
  isLoading: boolean = false;

  constructor(private router: Router, private modalService: BsModalService, private publicService: PublicService, private storageService: LocalStorageService) {
    this.dataUser = this.storageService.getUser();
    this.getListPubSolidaire();

  }

  ngOnInit(): void {
  }


  //récupérer les projets par catégorie
  getListPubSolidaire(): void {

    this.isLoading = true;

    this.publicService.getListPubSolidaire().subscribe(
      (result: any) => {

        this.isLoading = false;

        console.log(result);

        let resp = result;

        if (resp === null || resp === undefined) {
          this.listPubSolidaire = this.listPubSolidaire;
          return;
        }
        if (resp.status === "error") {
          this.listPubSolidaire = this.listPubSolidaire;
          return;
        }
        this.listPubSolidaire = resp.data;
      },
      err => {
        this.isLoading = false;

        return;
      }
    );
  } //end getListProjetByCategory


  goToVisualisation(item: any) {
    this.storageService.saveDataPubSolidaire(item);
    this.saveVisualisation(item);
    const initialState = { list: [], title: 'Modal with component' };
    this.bsModalRef = this.modalService.show(ModalPubSolidaireComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Fermer';

    this.bsModalRef.onHidden.subscribe((reason: string | any) => {
      if (typeof reason !== 'string') {
        reason = `onHide(), modalId is : ${reason.id}`;
      }
      const _reason = reason ? `, dismissed by ${reason}` : '';
      //console.log(reason);

    }//end displayLigneCreation
    )
  }


  saveVisualisation(item: any) {
    console.log(item);

    let data: any = {
      'id': item.id,
      'type': 'VISUALISATION'
    }

    this.isLoading = true;

    this.publicService.updatePartagePubSolidaire(data).subscribe((result) => {

      this.isLoading = false;

      if (result === undefined || result.status === "error") {
        let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
        this.isLoading = false;
        return;
      } else {
        this.isLoading = false;
        let info: string = result.message;

      }
    });
  }


  savePartage(item: any) {
    let data: any = {
      'id': item.id,
      'type': 'PARTAGE'
    }

    this.isLoading = true;

    this.publicService.updatePartagePubSolidaire(data).subscribe((result) => {

      this.isLoading = false;

      if (result === undefined || result.status === "error") {
        let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
        this.isLoading = false;
        return;
      } else {
        this.isLoading = false;
        let info: string = result.message;

      }
    });
  }



}
