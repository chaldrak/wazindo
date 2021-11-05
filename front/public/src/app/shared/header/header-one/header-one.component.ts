import {
  Component,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from '../../services/localstorage.service';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {

  @Input() class: string;
  @Input() themeLogo: string = 'assets/images/wazindotranspng'; // Default Logo icon/logo.
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false
  dataUser: any = {};
  isconnected: boolean = false;
  public stick: boolean = false;

  constructor(private localStorageService: LocalStorageService, public navServices: NavService, private router: Router) { }

  ngOnInit(): void {
    this.dataUser = this.localStorageService.getUser();

    if(this.dataUser !== null){
      if (this.dataUser.email !== null && this.dataUser.email !== undefined) {
        this.isconnected = true;
      } else {
        this.isconnected = false;
      }
    }else {
      this.isconnected = false;
    }
    
  }


  ionViewDidEnter() {
    this.dataUser = this.localStorageService.getUser();
    if (this.dataUser.email !== null && this.dataUser.email !== undefined) {
      this.isconnected = true;

    } else {
      this.isconnected = false;
    }
  }

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

  goToProfil() {
    this.router.navigate(['/porteur/modifier_profil']);
  }


  goToConnexion() {
    this.router.navigate(['/porteur/auth']);
  }
}
