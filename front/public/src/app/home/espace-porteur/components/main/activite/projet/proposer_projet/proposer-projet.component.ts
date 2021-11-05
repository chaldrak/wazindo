import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Projet } from 'src/app/shared/models/projet';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';
import { PublicService } from 'src/app/shared/services/public.service';

@Component({
  selector: 'app-proposer-projet',
  templateUrl: './proposer-projet.component.html',
  styleUrls: ['./proposer-projet.component.css']
})
export class ProposerProjetComponent implements OnInit {

  projet: Projet = new Projet();
  public themeLogo: string = 'assets/images/wazindotrans.png';
  loading: boolean;
  isLocal: boolean;
  document: File;
  paysList: any[] = [];
  dataUser: any = {};
  categorieList: any[] = [];
  departementList: any[] = [];
  communeList: any[] = [];
  organisationList: any[] = [];
  dataUserIdentite: string;
  listDurees: any[] = [];

  constructor(private publicService: PublicService, private router: Router,
    private localStorageService: LocalStorageService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    //init var
    let data = '';
    this.localStorageService.saveUrl(data);
    this.dataUser = this.localStorageService.getUser();
    this.dataUserIdentite = this.dataUser.prenom + ' ' + this.dataUser.nom;
    this.projet.email = this.dataUser.email;

    for (let i = 7; i <= 90; i++) {
      this.listDurees.push(i);
    }

    //
    this.getListPays();
    this.getListCategorieProjet();
    this.getListTypesOrganisationProjet();
    this.getListDepartementByPays();
  }

  //retour arrière
  goToBack() {
    this.router.navigate(["/porteur/dashboard"]);
  }// end goToBack

  //envoi de Fichier
  envoiFichier(fichiers: FileList) {
    this.document = fichiers.item(0);
  }// end envoiFichier

  //check Pays
  checkPays() {
    if (this.projet.pays === 'Benin') {
      this.isLocal = true;
    } else {
      this.isLocal = false;
    }
  }// end checkPays

  //récupérer la liste des statistiques

  //get List Pays
  getListPays(): void {
    this.publicService.getListPays().subscribe(
      (result: any) => {
        let resp = result;
        if (resp === null || resp === undefined) {
          this.paysList = this.paysList;
          return;
        }
        if (resp.status === "error") {
          this.paysList = this.paysList;
          return;
        }
        this.paysList = resp.data;
      },
      err => {
        return;
      }
    );
  } //end getListPays

  //récupérer la liste des organisations

  //get List Types Organisation Projet
  getListTypesOrganisationProjet(): void {
    this.publicService.getListOrganisationProjet().subscribe(
      (result: any) => {
        let resp = result;
        if (resp === null || resp === undefined) {
          this.organisationList = this.organisationList;
          return;
        }
        if (resp.status === "error") {
          this.organisationList = this.organisationList;
          return;
        }
        this.organisationList = resp.data;
      },
      err => {
        return;
      }
    );
  } //end getListTypesOrganisationProjet

  //get List Categorie Projet
  getListCategorieProjet(): void {
    this.publicService.getListCategorieProjet().subscribe(
      (result: any) => {
        let resp = result;

        if (resp === null || resp === undefined) {
          this.categorieList = this.categorieList;
          return;
        }
        if (resp.status === "error") {
          this.categorieList = this.categorieList;
          return;
        }
        this.categorieList = resp.data;
      },
      err => {
        return;
      }
    );
  } //end getListCategorieProjet

  // get List Commune By Departement
  getListCommuneByDepartement(): void {
    this.publicService.getListCommuneByDepartement(this.projet.departement).subscribe(
      (result: any) => {
        let resp = result;
        if (resp === null || resp === undefined) {
          this.communeList = this.communeList;
          return;
        }
        if (resp.status === "error") {
          this.communeList = this.communeList;
          return;
        }

        this.communeList = resp.data;

      },
      err => {
        return;
      }
    );
  } //end getListCommuneByDepartement


  //get List Departement By Pays
  getListDepartementByPays(): void {

    this.publicService.getListDepartementByPays().subscribe(
      (result: any) => {
        let resp = result;

        if (resp === null || resp === undefined) {
          this.departementList = this.departementList;
          return;
        }
        if (resp.status === "error") {
          this.departementList = this.departementList;
          return;
        }

        this.departementList = resp.data;

      },
      err => {
        return;
      }
    );
  } //end getListDepartementByPays

  // save Proposition Projet
  savePropositionProjet() {
    this.loading = true;

    if (!this.projet.canSave()) {
      this.toastr.error(this.projet.getErrorMessage(), "Proposition Projet");
      return;
    }
    this.projet.porteur_id = this.dataUser.id;

    console.log(this.projet);
    // this.spinner.show();

    this.publicService.savePropositionProjet(this.document, this.projet).subscribe((result) => {

      // this.spinner.hide();
      console.log(result);

      if (result === undefined) {
        let error: string = "Une erreur s'est produite lors de la soumission de votre projet. Veuillez réessayer";
        this.toastr.error(error, "Proposition Projet");
        this.loading = false;
        return;
      }

      if (result.status === "error") {
        let error: string = result.message;
        this.toastr.error(error, "Proposition Projet");
        this.loading = false;
        return;
      } else {
        this.loading = false;
        let info: string = result.message;
        this.toastr.success(info, "Proposition Projet");
        this.router.navigate(["/porteur/afficher_projets"]);
      }
    });
  }//end  savePropositionProjet

  //get remaining description characters
  getRemainingDescriptionCharacters() {
    let count: number = 0;
    if (this.projet.description_projet === null || this.projet.description_projet === undefined) {
      count = 600;
    } else {
      count = 600 - this.projet.description_projet.length;
    }
    return count;
  }//end getRemainingDescriptionCharacters

  //get remaining contrepartie characters
  getRemainingContrepartieCharacters() {
    let count: number = 0;
    if (this.projet.contrepartie === null || this.projet.contrepartie === undefined) {
      count = 600;
    } else {
      count = 600 - this.projet.contrepartie.length;
    }
    return count;
  }//end getRemainingContrepartieCharacters


}
