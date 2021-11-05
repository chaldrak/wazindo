import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';
import { PublicService } from 'src/app/shared/services/public.service';

@Component({
  selector: 'app-contribution-validation',
  templateUrl: './contribution-validation.component.html',
  styleUrls: ['./contribution-validation.component.scss']
})
export class ContributionValidationComponent implements OnInit {
  public themeLogo: string = "assets/images/wazindotrans.png";
  public themeSuccess: string = "assets/images/6143.jpg";
  projetData: any = {};
  detailPaiement: any = {};
  dataUser: any = {};
  reference: string = "";
  transactionId: string = "";

  constructor(private publicService: PublicService, private router: Router, private ngxService: NgxUiLoaderService, private route: ActivatedRoute, private localStorageService: LocalStorageService) {
    this.dataUser = this.localStorageService.getUser();
    this.detailPaiement = this.localStorageService.getMontantContibution();

    this.route.data.subscribe(routeResponse => {
      this.transactionId = this.route.snapshot.params['slug'];
      this.ngxService.start();

      let data: any = {
        'transactionid': this.transactionId,
        'montant': this.detailPaiement.montant,
        'projetid': this.detailPaiement.projetid,
        'reference': this.detailPaiement.reference,
        'useremail': this.dataUser.email
      }
      this.publicService.payContribution(data).subscribe(
        (result: any) => {


          console.log(result);
          this.ngxService.stop();


        },
        err => {
          console.log(err);
          return;
        }
      );
    }
    );
  }


  ngOnInit(): void {
  }

  goToProjet(): void {

    this.router.navigate(['/home/detail-projet/'+this.detailPaiement.reference]);

  } //end goToProjet

}
