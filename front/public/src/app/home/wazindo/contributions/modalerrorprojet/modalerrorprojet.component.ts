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
  selector: 'app-modalerrorprojet',
  templateUrl: './modalerrorprojet.component.html',
  styleUrls: ['./modalerrorprojet.component.scss']
})
export class ModalErrorProjetComponent implements OnInit {

  title: string;
  closeBtnName: string;
  public soumissionLogo: string = "assets/img/image_soumission.jpg";
  constructor(private modalService: BsModalService,public bsModalRef: BsModalRef, private toastr: ToastrService, private router: Router  ) {}
 
  ngOnInit() {
  }

  
  goToDashboard() {
    this.router.navigate(['/porteur/dashboard']);

  }

  goToAccueil() {
    this.router.navigate(['/home/accueil']);

  }



}
