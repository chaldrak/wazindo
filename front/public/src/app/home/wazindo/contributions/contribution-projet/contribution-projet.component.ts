import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';
import {
  PorteurService,
} from 'src/app/shared/services/porteur-service/porteur.service';
import { PublicService } from 'src/app/shared/services/public.service';

@Component({
  selector: 'app-contribution-projet',
  templateUrl: './contribution-projet.component.html',
  styleUrls: ['./contribution-projet.component.scss']
})
export class ContributionProjetComponent implements OnInit {
  public themeLogo: string = "assets/images/wazindotrans.png";
  projetData: any = {};
  categorieName: string = '';
  profilName: string = '';
  reference: string = '';
  isadd: boolean = false;
  listCommentaire: any[] = [];
  listContrepartie: any[] = [];
  listContrepartieAdd: any[] = [];
  listLigneFinance: any[] = [];
  listActualite: any[] = [];
  item: any = {};
  dataContrepartie: any = {};



  constructor(private localStorageService: LocalStorageService, private router: Router, private publicService: PublicService, private porteurService: PorteurService, private route: ActivatedRoute) {
    this.route.data.subscribe(routeResponse => {
      let params = this.route.snapshot.params['slug'];
      //get data
      this.publicService.getListInfoDetailProject(params).subscribe(response => {

        if (response === undefined || response === null) {
          return;
        } else {
          this.projetData = response.data.project;
          this.listLigneFinance = this.projetData.ligne_finance_projets;
          this.listActualite = this.projetData.actualites;
          this.listContrepartie = this.projetData.contreparties;
          this.listCommentaire = this.projetData.commentaires;
          this.categorieName = this.projetData.categorie.nom;
          this.profilName = this.projetData.profil.nom;
          console.log(this.projetData);
        }

      })//end get data

    }
    );

    this.dataContrepartie = this.localStorageService.getDataContrepartie();
    if (this.dataContrepartie !== null && this.dataContrepartie !== undefined) {
      if (this.dataContrepartie.id !== null && this.dataContrepartie.id !== undefined) {
        this.listContrepartieAdd.push(this.dataContrepartie);
        this.isadd = true;
      }
    }
    console.log(window);

  }

  ngOnInit(): void {

  }

  addContrepartie(item) {
    console.log(item);

    this.listContrepartieAdd.push(item);
    console.log(this.listContrepartieAdd);
    this.isadd = true;
  }

  goToPaiementContribution() {
    console.log(this.listContrepartieAdd);
    this.localStorageService.saveDataProjet(this.listContrepartieAdd);
    this.router.navigate(['/home/contribution-paiement/', this.projetData.reference]);
  }

}



