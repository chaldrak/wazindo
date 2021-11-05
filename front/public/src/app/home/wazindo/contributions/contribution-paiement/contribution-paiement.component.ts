import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { AppService } from 'src/app/shared/services/app.service';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';
import { PublicService } from 'src/app/shared/services/public.service';

//const k = kkiapay("fd4c52c0e47b11eb96cbffe4cc632e8e",{sandbox:true});

@Component({
  selector: 'app-contribution-paiement',
  templateUrl: './contribution-paiement.component.html',
  styleUrls: ['./contribution-paiement.component.scss']
})
export class ContributionPaiementComponent implements OnInit {
  projetData: any = {};
  public themeLogo: string = "assets/images/wazindotrans.png";
  listContrepartie: any[] = [];
  profilSurname: string = "";
  profilName: string = "";
  profilEmail: string = "";
  urlRedirect: string = "";
  prix: string = '1000';
  paymentData: number = 0;

  constructor(private publicService: PublicService, private appService: AppService, private router: Router, private route: ActivatedRoute, private localStorageService: LocalStorageService) {
    this.listContrepartie = this.localStorageService.getDataProjet();

    this.urlRedirect = this.appService.getPaiementUrl();
    console.log(this.urlRedirect);

    this.route.data.subscribe(routeResponse => {
      let params = this.route.snapshot.params['slug'];

      this.listContrepartie.forEach(element => {
        this.paymentData = this.paymentData + element.mt_max
      });




      //console.log(this.paymentData);

      this.localStorageService.saveParamsUrl(params);
      //get data
      this.publicService.getListInfoDetailProject(params).subscribe(response => {

        if (response === undefined || response === null) {
          return;
        } else {
          this.projetData = response.data.project;
          this.profilName = this.projetData.profil.nom;
          this.profilEmail = this.projetData.profil.email;
          this.profilSurname = this.projetData.profil.prenom;

          console.log(this.projetData);
        }

      })//end get data
    }
    );
  }



  ngOnInit(): void {
  }

  //launch payment on kkiapay agregator
  openKkiapayPayment() {
    let data: any = {
      'montant': this.paymentData,
      'reference': this.projetData.reference,
      'projetid': this.projetData.id
    }

    this.localStorageService.saveMontantContibution(data);

    const k = window.globalThis;

    k.openKkiapayWidget({
              amount: this.paymentData, position: "center", callback: this.urlRedirect,
              data: "", url: "http://wazindo.com/assets/images/wazindotrans.png",
              theme: "#ff0000", sandbox: "true",
              key: "fd4c52c0e47b11eb96cbffe4cc632e8e"
    });


  }//end openKkiapayPayment

}


