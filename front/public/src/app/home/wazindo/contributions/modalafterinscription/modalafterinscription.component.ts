import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  BsModalRef,
  BsModalService,
} from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modalafterinscription',
  templateUrl: './modalafterinscription.component.html',
  styleUrls: ['./modalafterinscription.component.scss']
})
export class ModalAfterInscriptionComponent implements OnInit {

  title: string;
  closeBtnName: string;
  public soumissionLogo: string = "assets/img/image_soumission.jpg";
  constructor(private modalService: BsModalService,public bsModalRef: BsModalRef, private toastr: ToastrService, private router: Router  ) {}
 
  ngOnInit() {
  }

  
  goToLogin() {
    this.router.navigate(['/porteur/auth']);

  }

  goToAccueil() {
    this.router.navigate(['/home/accueil']);

  }

}
