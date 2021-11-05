import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from '../../services/localstorage.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-footer-voiture',
  templateUrl: './footer-voiture.component.html',
  styleUrls: ['./footer-voiture.component.scss']
})
export class FooterVoitureComponent implements OnInit {

  @Input() class: string ; // Default class 
  @Input() themeLogo: string = 'assets/images/icon/logo.png'; // Default Logo
  @Input() newsletter: boolean = true; // Default True

  public today: number = Date.now();
  ligneList : any[] = [];
  valeurPhone : any = { valeur: ""};
  valeurEmail : any = { valeur: ""};

  constructor(private publicService : AdminService) { 
    this.getListLigne();

  }

  ngOnInit(): void {
  }

  
  //get list ligne
  getListLigne(){
    this.ligneList = [];
    this.publicService.getListLigne().subscribe((result) => {
      if(result !== undefined){

        this.ligneList = result.data;
      if(this.ligneList[1] !== null && this.ligneList[1] !== undefined){
        this.valeurPhone = this.ligneList[1];
       }
       if(this.ligneList[0] !== null && this.ligneList[0] !== undefined){
        this.valeurEmail = this.ligneList[0];
       }

      }
  });
}//end getListLigne

}
