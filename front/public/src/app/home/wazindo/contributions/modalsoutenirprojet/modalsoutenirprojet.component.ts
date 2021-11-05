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
  selector: 'app-modalsoutenirprojet',
  templateUrl: './modalsoutenirprojet.component.html',
  styleUrls: ['./modalsoutenirprojet.component.scss']
})
export class ModalSoutenirProjetComponent implements OnInit {

  title: string;
  closeBtnName: string;
  public soumissionLogo: string = "assets/img/image_soumission.jpg";
  constructor(private modalService: BsModalService,public bsModalRef: BsModalRef, private toastr: ToastrService, private router: Router  ) {}
 
  ngOnInit() {
  }

  
  goToConnect() {
    this.router.navigate(["/porteur/auth"]);
  }

  goToSoumission() {
    this.router.navigate(["/home/projets"]);

  }



}
