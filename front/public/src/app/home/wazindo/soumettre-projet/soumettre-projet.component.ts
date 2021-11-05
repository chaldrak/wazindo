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

import {
  ModalFirstProductComponent,
} from '../contributions/modalfirstproduct/modalfirstproduct.component';

@Component({
  selector: 'app-soumettre-projet',
  templateUrl: './soumettre-projet.component.html',
  styleUrls: ['./soumettre-projet.component.css']
})
export class SoumettreProjetComponent implements OnInit {
  dataUser: any = {};
  public themeLogo: string = "assets/images/wazindotrans.png"; // 'assets/images/icon/logo-2.png'; // Change Logo
  bsModalRef: BsModalRef;

  constructor(private router: Router, private modalService: BsModalService, private storageService: LocalStorageService) {
    this.dataUser = this.storageService.getUser();
    console.log(this.dataUser);
  }

  ngOnInit(): void {
  }

  goToProposition() {

    if (this.dataUser === null || this.dataUser.email === "" || this.dataUser.email === null || this.dataUser.email === undefined) {
      let data = "/porteur/proposer_projet";
      this.storageService.saveUrl(data);

      const initialState = { list: [], title: 'Modal with component' };
      this.bsModalRef = this.modalService.show(ModalFirstProductComponent, { initialState });
      this.bsModalRef.content.closeBtnName = 'Fermer';

      this.bsModalRef.onHidden.subscribe((reason: string | any) => {
        if (typeof reason !== 'string') {
          reason = `onHide(), modalId is : ${reason.id}`;

        }
        const _reason = reason ? `, dismissed by ${reason}` : '';
        //console.log(reason);

      });
    } else {

      this.router.navigate(["/porteur/proposer_projet"]);
    }
  }


}
