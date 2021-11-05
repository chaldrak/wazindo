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
  selector: 'app-modalfirstproduct',
  templateUrl: './modalfirstproduct.component.html',
  styleUrls: ['./modalfirstproduct.component.scss']
})
export class ModalFirstProductComponent implements OnInit {

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
    this.router.navigate(["/home/soumettre-projet"]);

  }



}
