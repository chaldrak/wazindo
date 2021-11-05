import { Component, OnInit, Input, HostListener } from '@angular/core';
import { LocalStorageService } from '../../services/localstorage.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-header-voiture',
  templateUrl: './header-voiture.component.html',
  styleUrls: ['./header-voiture.component.scss']
})
export class HeaderVoitureComponent implements OnInit {
   
  @Input() class: string;
  @Input() themeLogo: string = '/assets/images/icon/logo.png'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false
  
  public stick: boolean = false;
  ligneList : any[] = [];
  valeurPhone : any = {};

  constructor(private publicService: AdminService) { 
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
      }
  });
}//end getListLigne



  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  	if (number >= 150 && window.innerWidth > 400) { 
  	  this.stick = true;
  	} else {
  	  this.stick = false;
  	}
  }

}
