import {
  Component,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import {
  BsModalRef,
  BsModalService,
} from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';

@Component({
  selector: 'app-modalpubsolidaire',
  templateUrl: './modalpubsolidaire.component.html',
  styleUrls: ['./modalpubsolidaire.component.scss']
})
export class ModalPubSolidaireComponent implements OnInit {
  infoPubSolidaire: any = { };
  title: string;
  safeUrl: any;
  closeBtnName: string;
  // tslint:disable-next-line:max-line-length
  constructor(private storageService: LocalStorageService,private _sanitizer: DomSanitizer, private modalService: BsModalService, public bsModalRef: BsModalRef, private toastr: ToastrService, private router: Router) {
    this.infoPubSolidaire = this.storageService.getDataPubSolidaire();
    console.log(this.infoPubSolidaire.lien_video);
    this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.infoPubSolidaire.lien_video);
  
  }

  ngOnInit() {
  }


  goToDashboard() {
    this.router.navigate(['/porteur/dashboard']);

  }

  goToAccueil() {
    this.router.navigate(['/home/accueil']);

  }



}
