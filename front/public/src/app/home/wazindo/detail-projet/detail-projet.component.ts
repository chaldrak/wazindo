import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import {
  BsModalRef,
  BsModalService,
} from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';
import {
  PorteurService,
} from 'src/app/shared/services/porteur-service/porteur.service';
import { PublicService } from 'src/app/shared/services/public.service';

import {
  ModalSoutenirProjetComponent,
} from '../contributions/modalsoutenirprojet/modalsoutenirprojet.component';

@Component({
  selector: 'app-detail-projet',
  templateUrl: './detail-projet.component.html',
  styleUrls: ['./detail-projet.component.css']
})
export class DetailProjetComponent implements OnInit {
  public themeLogo: string = "assets/images/wazindotrans.png";
  public facebookLogo: string = "assets/img/facebook.png";
  public youtubeLogo: string = "assets/img/youtube.png";
  public twitterLogo: string = "assets/img/twitter.png";
  public linkedinLogo: string = "assets/img/linkedin.png";
  public loveLogo: string = "assets/img/love.png";

  contenu: string = '';
  categorieName: string = '';
  paysName: string = '';
  profilName: string = '';
  colorPourcentage: string = '';
  isLoading: boolean = false;
  isLimit: boolean = true;
  pourcentageCollect: number = 0;
  dataUser: any = {};
  projetData: any = {};
  listCommentaire: any[] = [];
  listContrepartie: any[] = [];
  listLigneFinance: any[] = [];
  listContributeur: any[] = [];
  listActualite: any[] = [];
  lienmessage: boolean;
  message: boolean;
  bsModalRef: BsModalRef;

  constructor(private toastr: ToastrService, private modalService: BsModalService, private route: ActivatedRoute, private router: Router, private porteurService: PorteurService, private publicService: PublicService, private localStorageService: LocalStorageService) {

    let value: any = {};
    this.localStorageService.saveDataContrepartie(value);

    this.dataUser = this.localStorageService.getUser();

    this.route.data.subscribe(routeResponse => {
      let params = this.route.snapshot.params['slug'];
      //get data
      this.publicService.getListInfoDetailProject(params).subscribe(response => {

        if (response === undefined || response === null) {
          return;
        } else {
          // Sorting Filter
          this.projetData = response.data.project;
          this.listLigneFinance = this.projetData.ligne_finance_projets;
          this.listActualite = this.projetData.actualites;
          this.listContrepartie = this.projetData.contreparties;
          this.listCommentaire = this.projetData.commentaires;
          this.paysName = this.projetData.pays.nom;
          this.categorieName = this.projetData.categorie.nom;
          this.profilName = this.projetData.profil.nom;
          this.pourcentageCollect = (this.projetData.montant_collecte / this.projetData.montant_a_collecte) * 100;


          this.getListLastCommenatireByProject();
          this.getListContributeurByProjet();

        }


        if (this.pourcentageCollect <= 20) {
          this.colorPourcentage = 'danger';
        } else {
          if (this.pourcentageCollect <= 50) {
            this.colorPourcentage = 'primary';
          } else {
            this.colorPourcentage = 'success';
          }

        }
      })//end get data


    }
    );

  }

  ngOnInit(): void {

    this.lienmessage = true;

  }

  Envoyer() {
    this.message = false;
    this.lienmessage = true;
  }
  afficherZoneEnvoyer() {
    this.message = true;
  }

  //récupérer la liste des lignes finances
  getListLigneFinance(): void {

    this.porteurService.getListLigneFinance(this.projetData.id).subscribe(
      (result: any) => {

        if (result === null || result === undefined) {
          this.listLigneFinance = this.listLigneFinance;
          return;
        }
        if (result.status === "error") {
          this.listLigneFinance = this.listLigneFinance;
          return;
        }

        this.listLigneFinance = result.data;

      },
      err => {
        return;
      }
    );
  } //end getListLigneFinance

  //récupérer la liste des statistiques
  getListContrepartie(): void {

    this.porteurService.getListContrepartie(this.projetData.id).subscribe(
      (result: any) => {


        if (result === null || result === undefined) {
          this.listContrepartie = this.listContrepartie;
          return;
        }
        if (result.status === "error") {
          this.listContrepartie = this.listContrepartie;
          return;
        }

        this.listContrepartie = result.data;

      },
      err => {
        return;
      }
    );
  } //end getListStatistiques

  saveCommentaire() {

    if (this.dataUser.email === null || this.dataUser.email === undefined) {
      this.toastr.error('Veuillez vous connecter avant de poster un commentaire', "Commentaire", { positionClass: 'toast-top-center' });
      return;
    }

    if (this.contenu === '') {
      this.toastr.error('Veuillez saisir votre commentaire', "Commentaire", { positionClass: 'toast-top-center' });
      return;
    }

    let data: any = {
      'commente_par_id': this.dataUser.email,
      'contenu': this.contenu,
      'projet_id': this.projetData.id
    }
    // this.isLoading = true;

    this.publicService.createCommentaire(data).subscribe((result) => {

      // this.isLoading = false;

      if (result === undefined) {
        let error: string = "Une erreur est survenue. Si ce message persiste, veuillez patienter puis réessayer dans quelques minutes.";
        this.toastr.error(error, "Attention", { positionClass: 'toast-top-center' });
        return;
      }

      if (result.status === "error") {
        let error: string = result.message;
        this.toastr.error(error, "Attention", { positionClass: 'toast-top-center' });
        return;
      } else {
        this.toastr.success(result.message, "Succès", { positionClass: 'toast-top-center' });
        this.contenu = '';
        this.getListLastCommenatireByProject();
      }
    });


  }

  getListLastCommenatireByProject() {

    this.isLoading = true;
    this.isLimit = true;

    this.publicService.getListLastCommenatireByProject(this.projetData.id).subscribe((result) => {

      this.isLoading = false;

      if (result === undefined) {
        let error: string = "Une erreur est survenue. Si ce message persiste, veuillez patienter puis réessayer dans quelques minutes.";
        this.toastr.error(error, "Attention", { positionClass: 'toast-top-center' });
        return;
      }

      if (result.status === "error") {
        let error: string = result.message;
        this.toastr.error(error, "Attention", { positionClass: 'toast-top-center' });
        return;
      } else {
        this.listCommentaire = result.data;

      }
    });


  }

  getListActualiteByProject() {

    this.isLoading = true;

    this.publicService.getListActualiteByProject(this.projetData.id).subscribe((result) => {

      this.isLoading = false;

      if (result === undefined) {
        let error: string = "Une erreur est survenue. Si ce message persiste, veuillez patienter puis réessayer dans quelques minutes.";
        this.toastr.error(error, "Attention", { positionClass: 'toast-top-center' });
        return;
      }

      if (result.status === "error") {
        let error: string = result.message;
        this.toastr.error(error, "Attention", { positionClass: 'toast-top-center' });
        return;
      } else {
        this.listActualite = result.data;

      }
    });


  }

  getListCommentaireByProject() {

    this.isLoading = true;
    this.isLimit = false;

    this.publicService.getListCommenatireByProject(this.projetData.id).subscribe((result) => {

      this.isLoading = false;

      if (result === undefined) {
        let error: string = "Une erreur est survenue. Si ce message persiste, veuillez patienter puis réessayer dans quelques minutes.";
        this.toastr.error(error, "Attention", { positionClass: 'toast-top-center' });
        return;
      }

      if (result.status === "error") {
        let error: string = result.message;
        this.toastr.error(error, "Attention", { positionClass: 'toast-top-center' });
        return;
      } else {
        this.listCommentaire = result.data;
      }
    });


  }

  getListContributeurByProjet() {

    this.porteurService.getListContributeurByProjet(this.projetData.id).subscribe((result) => {

      this.isLoading = false;

      if (result === undefined) {
        let error: string = "Une erreur est survenue. Si ce message persiste, veuillez patienter puis réessayer dans quelques minutes.";
        this.toastr.error(error, "Attention", { positionClass: 'toast-top-center' });
        return;
      }

      if (result.status === "error") {
        let error: string = result.message;
        this.toastr.error(error, "Attention", { positionClass: 'toast-top-center' });
        return;
      } else {
        this.listContributeur = result.data;
        console.log(this.listContributeur);
      }
    });


  }

  addContrepartie(item: any) {
    this.localStorageService.saveDataContrepartie(item);
    if (this.dataUser === "" || this.dataUser === null || this.dataUser === undefined) {
      let data = '/home/contribution-projet/' + this.projetData.reference;
      this.localStorageService.saveUrl(data);

      const initialState = { list: [], title: 'Modal with component' };
      this.bsModalRef = this.modalService.show(ModalSoutenirProjetComponent, { initialState });
      this.bsModalRef.content.closeBtnName = 'Fermer';

      this.bsModalRef.onHidden.subscribe((reason: string | any) => {
        if (typeof reason !== 'string') {
          reason = `onHide(), modalId is : ${reason.id}`;
        }
        const _reason = reason ? `, dismissed by ${reason}` : '';
        //console.log(reason);

      });
    } else {

      this.router.navigate(['/home/contribution-projet/' + this.projetData.reference]);

    }
  }

  goToSoutenir() {
    if (this.dataUser === "" || this.dataUser === null || this.dataUser === undefined) {
      let data = '/home/contribution-projet/' + this.projetData.reference;
      this.localStorageService.saveUrl(data);

      const initialState = { list: [], title: 'Modal with component' };
      this.bsModalRef = this.modalService.show(ModalSoutenirProjetComponent, { initialState });
      this.bsModalRef.content.closeBtnName = 'Fermer';

      this.bsModalRef.onHidden.subscribe((reason: string | any) => {
        if (typeof reason !== 'string') {
          reason = `onHide(), modalId is : ${reason.id}`;

        }
        const _reason = reason ? `, dismissed by ${reason}` : '';
        //console.log(reason);

      });
    } else {

      this.router.navigate(['/home/contribution-projet/' + this.projetData.reference]);

    }
  }

}
