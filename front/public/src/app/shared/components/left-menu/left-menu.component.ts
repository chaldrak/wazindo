import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  BsModalRef,
  BsModalService,
} from 'ngx-bootstrap/modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  ModalErrorProjetComponent,
} from 'src/app/home/wazindo/contributions/modalerrorprojet/modalerrorprojet.component';

import { LocalStorageService } from '../../services/localstorage.service';
import {
  Menu,
  NavService,
} from '../../services/nav.service';
import { PorteurService } from '../../services/porteur-service/porteur.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  public menuItems: Menu[];
  dataUser: any = {};
  valTableau: any[] = [];
  bsModalRef: BsModalRef;

  constructor(private ngxService: NgxUiLoaderService, private router: Router, private porteurService: PorteurService, private modalService: BsModalService, private localStorageService: LocalStorageService, public navServices: NavService) {
    this.navServices.leftMenuItems.subscribe(menuItems => this.menuItems = menuItems);
    this.router.events.subscribe((event) => {
      this.navServices.mainMenuToggle = false;
    });

    this.dataUser = this.localStorageService.getUser();
  }

  ngOnInit(): void {

  }


  logout() {
    this.dataUser = {};
    this.localStorageService.saveUser(this.dataUser);
    this.router.navigate(["/home/accueil"]);
    this.leftMenuToggle();


  }

  leftMenuToggle(): void {
    this.navServices.leftMenuToggle = !this.navServices.leftMenuToggle;
  }

  leftMenuRedirect(item): void {
    this.router.navigate([item]);
    this.navServices.leftMenuToggle = !this.navServices.leftMenuToggle;
  }

  leftSousMenuRedirect(item): void {
    if (item === '/porteur/proposer_projet') {
      console.log(this.dataUser);

      if (this.dataUser.est_admin === false) {
        this.ngxService.start();

        this.porteurService.getListContributionByProfil(this.dataUser.email).subscribe((result) => {
          console.log(result);
          this.ngxService.stop();

          this.valTableau = result.data;
          if (this.valTableau.length === 0) {

            const initialState = { list: [], title: 'Modal with component' };
            this.bsModalRef = this.modalService.show(ModalErrorProjetComponent, { initialState });
            this.bsModalRef.content.closeBtnName = 'Fermer';

            this.bsModalRef.onHidden.subscribe((reason: string | any) => {
              if (typeof reason !== 'string') {
                reason = `onHide(), modalId is : ${reason.id}`;

              }
              const _reason = reason ? `, dismissed by ${reason}` : '';
              //console.log(reason);

            });
          } else {
            this.router.navigate([item]);

          }
        });


      } else {
        this.router.navigate([item]);

      }
    } else {
      this.router.navigate([item]);

    }

    console.log(item);
    this.navServices.leftMenuToggle = !this.navServices.leftMenuToggle;
  }

  // Click Toggle menu (Mobile)
  toggletNavActive(item) {
    item.active = !item.active;
  }

  onHover(menuItem) {
    if (window.innerWidth > 1200 && menuItem) {
      document.getElementById('unset').classList.add('sidebar-unset')
    } else {
      document.getElementById('unset').classList.remove('sidebar-unset')
    }
  }

}
