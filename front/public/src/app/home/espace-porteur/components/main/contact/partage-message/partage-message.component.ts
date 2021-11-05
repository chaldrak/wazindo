import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Projet } from 'src/app/shared/models/projet';
import {
  PorteurService,
} from 'src/app/shared/services/porteur-service/porteur.service';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';

@Component({
  selector: 'app-partage-message',
  templateUrl: './partage-message.component.html',
  styleUrls: ['./partage-message.component.css']
})
export class PartageMessagerieComponent implements OnInit {

  listDiffusionByProfil : any[] = [];
  contactList : any[] = [];
  public themeLogo: string = 'assets/images/wazindotrans.png';
  isLoading : boolean;
  iswhatsapp : boolean;
  isfacebook : boolean;
  dataUser: any;
  projet: Projet = new Projet();
  listContacts: any[] = [];


  constructor(private porteurService : PorteurService, private router :Router,private toastr: ToastrService, private localStorageService: LocalStorageService) {
    this.dataUser =  this.localStorageService.getUser();
    console.log(this.dataUser);

   }


  ngOnInit(): void {
    this.addContact();
  }


  selectedValue(){
    console.log(this.projet.mode);
    if(this.projet.mode === 'facebook'){
          this.iswhatsapp = false;
          this.isfacebook = true;
    }else{
      this.isfacebook = false;
      this.iswhatsapp = true;
      }
  }

addContact(){
  let newContact: string = "";
  this.listContacts.push(newContact);

  console.log(this.projet.contact);
  this.contactList.push(this.projet.contact);
  console.log(this.contactList);
  this.projet.contact = "";
}


  sendPartage(){

  if(!this.projet.savePartage()){
    this.toastr.error(this.projet.getErrorMessage(), "Partage de message", {positionClass: 'toast-top-center'});
    this.isLoading = false;
    return;
  }


  }
}
