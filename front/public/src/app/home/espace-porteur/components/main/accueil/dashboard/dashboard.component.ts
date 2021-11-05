import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {
  public themeLogo: string = 'assets/images/wazindotrans.png';
  constructor(private router: Router) {
   }



  //proposer projet
  proposerProjet(){    this.router.navigate(["/porteur/proposer_projet"]); }//end proposerProjet

  //voir contributions
  ecrireWazindo(){    this.router.navigate(["/porteur/afficher_liste_message"]); }//end ecrireWazindo

  //partager
  partagerProjet(){    this.router.navigate(["/porteur/partage_message"]); }//end partagerProjet

  //voir statistiques
  afficherStatistiques(){    this.router.navigate(["/porteur/statistiques_projets"]); }//end afficherStatistiques


}

