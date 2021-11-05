import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Finance } from 'src/app/shared/models/finance';
import { Projet } from 'src/app/shared/models/projet';
import {
  ConfirmDialogService,
} from 'src/app/shared/services/confirm-dialog/confirm-dialog.service';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';
import {
  PorteurService,
} from 'src/app/shared/services/porteur-service/porteur.service';
import { PublicService } from 'src/app/shared/services/public.service';

import {
  ModalDismissReasons,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-projet',
  templateUrl: './detail-projet.component.html',
  styleUrls: ['./detail-projet.component.css']
})
export class DetailProjetComponent implements OnInit {

  projet: Projet = new Projet();
  finance: Finance = new Finance();
  loading: boolean;
  isLocal: boolean;
  document: File;
  imageContent: File;
  imageDocument: File;
  public imagePath;
  closeResult = '';
  imageURL: any;
  imgURL: any;
  imageDocURL: any;
  dataProjet: any = {};
  dataUser: any = {};
  message: string = "Veuillez charger l’image du projet";
  messageVideo: string = "Veuillez héberger la vidéo promotionnelle de votre projet sur Youtube, puis copier le lien de la vidéo dans le champ ci-dessus";
  paysList: any[] = [];
  listDay: any[] = [];
  listActualite: any[] = [];
  isStartUp: boolean = false;
  isCompagny: boolean = false;
  categorieList: any[] = [];
  departementList: any[] = [];
  organisationList: any[] = [];
  listContrepartie: any[] = [];
  communeList: any[] = [];
  listLigneFinance: any[] = [];
  isSaving: boolean = false;
  isSecondEtape: boolean = false;
  isThirdEtape: boolean = false;
  isFourEtape: boolean = false;
  isFiveEtape: boolean = false;
  isFirstEtape: boolean = false;
  isPublie: boolean = false;
  public themeLogo: string = 'assets/images/wazindotrans.png';
  description: string = '';
  etape: string = '';
  titre: string = '';
  urlFacebook: string = '';
  urlYoutube: string = '';
  urlLinkedln: string = '';
  urlShared: string = '';
  descriptionShared: string = '';
  urlTwitter: string = '';
  isNotPublie: boolean = false;


  constructor(private porteurService: PorteurService, private publicService: PublicService,
    private modalService: NgbModal, private localStorageService: LocalStorageService, private router: Router,
    private toastr: ToastrService, private confirmDialogService: ConfirmDialogService) {

  }

  ngOnInit(): void {

    this.removeItem();
    //duree campagne
    for (let i = 7; i <= 90; i++) {
      this.listDay.push({ 'id': i });
    }


    this.dataProjet = this.localStorageService.getDataProjet();
    console.log(this.dataProjet);

    if(this.dataProjet.statut_projet_id !== 7){
      this.isPublie = false;
      this.isFirstEtape = true;
      this.isSecondEtape = false;
      this.isThirdEtape = false;
      this.isFourEtape = false;
      this.isFiveEtape = false;
    }else{
      this.isPublie = true;
      this.isFirstEtape = false;
      this.isSecondEtape = false;
      this.isThirdEtape = false;
      this.isFourEtape = false;
      this.isFiveEtape = false;
    }

    this.dataUser = this.localStorageService.getUser();
    console.log(this.dataUser);
    this.projet.titre_projet = this.dataProjet.titre;
    this.projet.montant_collecter = this.dataProjet.montant_a_collecte;
    this.projet.resume = this.dataProjet.resume;
    this.projet.pays = this.dataProjet.pays_id;
    this.projet.duree_campagne = this.dataProjet.duree_campagne;
    this.projet.description_projet = this.dataProjet.description;
    this.projet.type_organisation = this.dataProjet.type_organisation_id;
    this.projet.categorie = this.dataProjet.categorie_id;
    this.projet.reference = this.dataProjet.reference;
    this.imageDocURL = this.dataProjet.photo_mini;
    this.urlFacebook = this.dataProjet.url_facebook;
    this.urlYoutube = this.dataProjet.url_youtube;
    this.urlLinkedln = this.dataProjet.url_linkedin;
    this.urlTwitter = this.dataProjet.url_twitter;
    this.finance.biographie = this.dataUser.bibliographie;
    this.finance.email = this.dataProjet.adresse_email;
    this.finance.facebook = this.dataUser.url_facebook;
    this.finance.linkedln = this.dataUser.url_linkedin;
    this.finance.phone = this.dataProjet.telephone;
    this.finance.residence = this.dataProjet.adresse;
    this.finance.twitter = this.dataUser.url_twitter;
    this.finance.youtube = this.dataUser.url_youtube;

    this.urlShared = 'https://wazindo.com/home/detail-projet/' + this.dataProjet.reference;
    // tslint:disable-next-line:max-line-length
    this.descriptionShared = 'Bonjour, je suis ' + this.dataUser.prenom +' '+this.dataUser.nom + ', je porte le projet ' + this.dataProjet.titre + ' sur la platforme Wazindo. La description est : ' + this.dataProjet.description + '. Veuillez cliquer sur le lien ci-dessous';

    this.getListTypesOrganisationProjet();
    this.getListPays();
    this.getListCategorieProjet();
    this.getListLigneFinance(this.dataProjet.id);
    this.getListContrepartie(this.dataProjet.id);
    this.getListDepartementByPays();

    if (this.projet.type_organisation === "1" || this.projet.type_organisation === "4") {
      this.isStartUp = true;
      this.isCompagny = false;
    } else {
      this.isStartUp = false;
      this.isCompagny = true;
    }
    //save every 5 min
    //setInterval(() => { this.updateProject(); }, environment.SAVE_PROJECT_INTERVAL);
  }

  //return
  goBack() {
    this.router.navigate(["/porteur/afficher_projets"]);
  }

  saveFinance() {
    if (!this.finance.canSaveFinance()) {
      this.toastr.error(this.finance.getErrorMessage(), "Ajout de la ligne à financer", { positionClass: 'toast-top-center' });
      this.loading = false;
      return;
    }

    let data: any = {
      "commentaire": this.finance.commentaire,
      "date_mise_en_oeuvre": this.finance.date_mise_en_oeuvre,
      "deadline": this.finance.deadline,
      "ligne_financer": this.finance.ligne_financer,
      "montant": this.finance.montant,
      'projet': this.dataProjet.id
    }

    this.porteurService.saveLigneFinance(data).subscribe(
      (result: any) => {

        let resp = result;
        this.toastr.success("L'opération a été effectuée avec succès", "Ligne à financer", { positionClass: 'toast-top-center' });
        this.getListLigneFinance(this.dataProjet.id);
      },
      err => {
        this.toastr.error("Une erreur est survenue lors de l'enregistrement de la ligne de finance", "Attention", { positionClass: 'toast-top-center' });
        return;
      }
    );

    this.modalService.dismissAll();

  }

  createActualite() {
    if (this.titre === '' || this.titre === undefined) {
      this.toastr.error("Veuillez saisir le titre de l'actualité", "Ajout de l'actualité", { positionClass: 'toast-top-center' });
      return;
    }
    if (this.description === '' || this.description === undefined) {
      this.toastr.error("Veuillez saisir la description", "Ajout de l'actualité", { positionClass: 'toast-top-center' });
      return;
    }

    let data: any = {
      "titre": this.titre,
      "description": this.description,
      'projet_id': this.dataProjet.id
    }

    this.porteurService.saveActualite(data).subscribe(
      (result: any) => {

        let resp = result;
        this.toastr.success(result.message, "Création d'Actualité", { positionClass: 'toast-top-center' });
        this.getListLigneFinance(this.dataProjet.id);
      },
      err => {
        this.toastr.error("Une erreur est survenue lors de l'enregistrement de la création de l'actualité", "Attention", { positionClass: 'toast-top-center' });
        return;
      }
    );

    this.modalService.dismissAll();

  }

  saveContrepartie() {

    if (!this.projet.canSaveContrepartie()) {
      this.toastr.error(this.projet.getErrorMessage(), "Attention", { positionClass: 'toast-top-center' });
      this.loading = false;
      return;
    }

    let data: any = {
      'description': this.projet.description,
      'montant': this.projet.montant,
      'projet': this.dataProjet.id,
      'quantite_limite': this.projet.quantite,
      'date_de_livraison': this.projet.date_livraison
    }


    this.porteurService.saveContrepartie(this.imageContent, data).subscribe(
      (result: any) => {

        let resp = result;
        this.toastr.success("La contrepartie a été enregistrée avec succès", "Contrepartie", { positionClass: 'toast-top-center' });
        this.getListContrepartie(this.dataProjet.id);
      },
      err => {
        this.toastr.error("une erreur est survenue lors de l'enregistrement de la ligne de finance", "Edition Projet", { positionClass: 'toast-top-center' });
        return;
      }
    );

    this.modalService.dismissAll();

  }

  savePropositionProjet() {

  }

  saveDocument() {
    let data: any = {
      'projet': this.dataProjet.id,
      'urlfacebook': this.urlFacebook,
      'urlYoutube': this.urlYoutube,
      'urlTwitter': this.urlTwitter,
      'urlLinkedln': this.urlLinkedln

    }
    this.porteurService.saveDocument(this.imageDocument, data).subscribe(
      (result: any) => {

        let resp = result;
        this.toastr.success("L'image a été enregistrée avec succès", "Edition Projet", { positionClass: 'toast-top-center' });
        this.getListContrepartie(this.dataProjet.id);
      },
      err => {
        this.toastr.error("Une erreur est survenue lors de l'enregistrement de votre image", "Edition Projet", { positionClass: 'toast-top-center' });
        return;
      }
    );

    this.modalService.dismissAll();

  }

  //remove item
  removeItem() {
    //confirmation first
    console.log("fonction");



    let that = this;

    this.confirmDialogService.confirmThis("Etes-vous sûr de vouloir supprimer cet Agriculteur?",

      function () {


        let data: any = {
          'id': 0
        }
        // that.porteurService.deleteClient(data).subscribe((result) => {

        //   if (result === undefined) {
        //     let error: string = "Une erreur est survenue lors de la suppression de l'Agriculteur. Veuillez réessayer";
        //     that.toastr.error(error, "Livreur", { positionClass: 'toast-top-center' });
        //     return;
        //   }

        //   if (result.status === "error") {
        //     let error: string = result.message;
        //     that.toastr.error(error, "Agriculteur", { positionClass: 'toast-top-center' });
        //     return;
        //   } else {
        //     that.toastr.success("L'Agriculteur a été supprimé avec succès", "Agriculteur", { positionClass: 'toast-top-center' });
        //     that.getListClients();
        //   }
        // });
      }, function () {

      })

  }//end removeItem

  //suppression de ligna financer
  deleteLigneFinance(id) {

    this.porteurService.deleteLigneFinance(id).subscribe(
      (result: any) => {
        let resp = result;

        if (resp === null || resp === undefined) {
          this.toastr.error("Une erreur est survenue lors de la suppression de la ligne à financer", "Attention", { positionClass: 'toast-top-center' });
          return;
        }
        if (resp.status === "error") {
          this.toastr.error("Une erreur est survenue lors de la suppression de la ligne à financer", "Attention", { positionClass: 'toast-top-center' });
          return;
        } else {
          this.toastr.success("La suppression a été effectuée", "Ligne à financer", { positionClass: 'toast-top-center' });
          this.getListLigneFinance(this.dataProjet.id);
        }


      },
      err => {
        this.toastr.error("une erreur est survenue lors de la suppression de la ligne de finance", "Edition Projet", { positionClass: 'toast-top-center' });
        return;
      }
    );

  }


  deleteContrepartie(id) {

    this.porteurService.deleteContrepartie(id).subscribe(
      (result: any) => {

        let resp = result;
        if (result.status === "success") {
          this.toastr.info("La contrepartie a été retirée", "Retrait Contrepartie", { positionClass: 'toast-top-center' });
          this.getListContrepartie(this.dataProjet.id);
        } else {
          this.toastr.error(result.message, "Retrait Contrepartie", { positionClass: 'toast-top-center' });
        }
      },
      err => {
        this.toastr.error("Une erreur est survenue lors de la suppression de la contrepartie", "Retrait Contrepartie", { positionClass: 'toast-top-center' });
        return;
      }
    );

  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  Add(contrepartie) {
    this.modalService.open(contrepartie, { ariaLabelledBy: 'modal-basic' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  previewDocument(files) {
    console.log(files);
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    this.imageDocument = files[0];
    console.log(this.imageDocument);

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageDocURL = reader.result;
    }
  }

  previewContrepartie(files) {
    console.log(files);
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    this.imageContent = files[0];
    console.log(this.imageContent);

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageURL = reader.result;
    }
  }


  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }


  envoiFichier(fichiers: FileList) {
    this.document = fichiers.item(0);
    console.log(this.document);
  }

  checkPays() {
    if (this.projet.pays === 'Benin') {
      this.isLocal = true;
    } else {
      this.isLocal = false;
    }
  }// end checkPays

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


  //récupérer la liste des statistiques
  getListContrepartie(id): void {

    this.porteurService.getListContrepartie(id).subscribe(
      (result: any) => {

        let resp = result;

        if (resp === null || resp === undefined) {
          this.listContrepartie = this.listContrepartie;
          return;
        }
        if (resp.status === "error") {
          this.listContrepartie = this.listContrepartie;
          return;
        }

        this.listContrepartie = resp.data;

      },
      err => {
        return;
      }
    );
  } //end getListStatistiques

  //récupérer la liste des statistiques
  getListLigneFinance(id): void {

    this.porteurService.getListLigneFinance(id).subscribe(
      (result: any) => {

        let resp = result;

        if (resp === null || resp === undefined) {
          this.listLigneFinance = this.listLigneFinance;
          return;
        }
        if (resp.status === "error") {
          this.listLigneFinance = this.listLigneFinance;
          return;
        }

        this.listLigneFinance = resp.data;

      },
      err => {
        return;
      }
    );
  } //end getListStatistiques

  //récupérer la liste des pays
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

  //récupérer la liste des statistiques
  getListCategorieProjet(): void {

    this.publicService.getListCategorieProjet().subscribe(
      (result: any) => {
        if (result === undefined || result.status === "error") {
          this.toastr.error("Impossible de récupérer les catégories de projets", "Wazindo", { positionClass: 'toast-top-center' });
          return;
        } else {
          this.categorieList = result.data;
        }

        console.log(result);
      },
      err => {
        return;
      }
    );
  } //end getListCategorieProjet

  //récupérer la liste des communes du departement
  getListCommuneByDepartement(): void {
    this.publicService.getListCommuneByDepartement(this.projet.departement).subscribe(
      (result: any) => {
        if (result === undefined || result.status === "error") {
          this.toastr.error("Impossible de récupérer les communes du département sélectionné", "Wazindo", { positionClass: 'toast-top-center' });
          return;
        } else {
          this.communeList = result.data;
        }
      },
      err => {
        return;
      }
    );
  } //end getListCommuneByDepartement


  //récupérer la liste des departements du pays
  getListDepartementByPays(): void {

    this.publicService.getListDepartementByPays().subscribe(
      (result: any) => {

        if (result === undefined || result.status === "error") {
          this.toastr.error("Impossible de récupérer les départements du pays sélectionné", "Wazindo", { positionClass: 'toast-top-center' });
          return;
        } else {
          this.departementList = result.data;
        }
      },
      err => {
        return;
      }
    );
  } //end getListDepartementByPays



  //change project status
  changeProjectStatus() {

    this.isSaving = true;

    let data: any = {
      'reference': this.dataProjet.reference,
      'email_address': this.dataUser.email
    }
    this.porteurService.validateProject(data).subscribe((result) => {

      this.isSaving = false;

      if (result === undefined || result.status === "error") {
        let error: string = result.message;
        this.toastr.error(error, "Validation Projet", { positionClass: 'toast-top-center' });
        this.loading = false;
        return;
      } else {
        this.loading = false;
        let info: string = result.message;
        this.toastr.info(info, "Validation Projet", { positionClass: 'toast-top-center' });
      }
    });

  }//end changeProjectStatus


  //update project 
  updateProject() {

    if (!this.projet.canUpdate()) {
      this.toastr.error(this.projet.getErrorMessage(), "Mise à jour Projet", { positionClass: 'toast-top-center' });
      this.loading = false;
      return;
    }
    this.projet.email = this.dataUser.email;

    console.log(this.projet);
    this.isSaving = true;

    this.porteurService.updateProject(this.projet).subscribe((result) => {

      this.isSaving = false;

      if (result === undefined || result.status === "error") {
        let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
        this.toastr.error(error, "Edition Projet", { positionClass: 'toast-top-center' });
        this.loading = false;
        return;
      } else {
        this.loading = false;
        let info: string = result.message;
        this.toastr.info(info, "Edition Projet", { positionClass: 'toast-top-center' });
      }
    });

  }//end updateProject

  goToSecondEtape(){
    this.isFirstEtape = false;
    this.isThirdEtape = false;
    this.isFourEtape = false;
    this.isFiveEtape = false;

    this.isSecondEtape = true;
  }
  goToThirdEtape(){
    this.isFirstEtape = false;
    this.isFourEtape = false;
    this.isFiveEtape = false;

    this.isSecondEtape = false;
      this.isThirdEtape = true;

  }
  goToFourEtape(){

    if(this.dataProjet.statut_projet.nom !== 'En Ligne'){
this.isNotPublie = true;
    }

    this.isFirstEtape = false;
    this.isThirdEtape = false;
    this.isFiveEtape = false;

    this.isSecondEtape = false;
      this.isFourEtape = true;
  }
  goToFiveEtape(){
    this.isFirstEtape = false;
    this.isThirdEtape = false;
    this.isFourEtape = false;

    this.isSecondEtape = false;
      this.isFiveEtape = true;
  }


  //update project 
  updateContrepartie() {

    if (!this.projet.canUpdate()) {
      this.toastr.error(this.projet.getErrorMessage(), "Mise à jour Projet", { positionClass: 'toast-top-center' });
      this.loading = false;
      return;
    }
    this.projet.email = this.dataUser.email;

    console.log(this.projet);
    this.isSaving = true;

    this.porteurService.updateProject(this.projet).subscribe((result) => {

      this.isSaving = false;

      if (result === undefined || result.status === "error") {
        let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
        this.toastr.error(error, "Edition Projet", { positionClass: 'toast-top-center' });
        this.loading = false;
        return;
      } else {
        this.loading = false;
        let info: string = result.message;
        this.toastr.info(info, "Edition Projet", { positionClass: 'toast-top-center' });
      }
    });

  }//end updateProject


  //update project 
  updateBibliographie() {

    if (!this.finance.SaveBibiographie()) {
      this.toastr.error(this.finance.getErrorMessage(), "Mise à jour Bibliographie", { positionClass: 'toast-top-center' });
      this.loading = false;
      return;
    }


    const data: any = {
      'biographie': this.finance.biographie,
      'email': this.finance.email,
      'facebook': this.finance.facebook,
      'linkedln': this.finance.linkedln,
      'phone': this.finance.phone,
      'residence': this.finance.residence,
      'twitter': this.finance.twitter,
      'youtube': this.finance.youtube,
      'porteur': this.dataUser.email,
      'reference': this.projet.reference

    }
    this.isSaving = true;

    this.porteurService.updateBibliographie(data).subscribe((result) => {

      this.isSaving = false;

      if (result === undefined || result.status === "error") {
        let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
        this.toastr.error(error, "Edition Bibliographie", { positionClass: 'toast-top-center' });
        this.loading = false;
        return;
      } else {
        this.loading = false;
        let info: string = result.message;
        this.toastr.info(info, "Edition Bibliographie", { positionClass: 'toast-top-center' });
      }
    });

  }//end updateProject


  //update project 
  updateDocument() {

    if (!this.projet.canUpdate()) {
      this.toastr.error(this.projet.getErrorMessage(), "Mise à jour Projet", { positionClass: 'toast-top-center' });
      this.loading = false;
      return;
    }
    this.projet.email = this.dataUser.email;

    console.log(this.projet);
    this.isSaving = true;

    this.porteurService.updateProject(this.projet).subscribe((result) => {

      this.isSaving = false;

      if (result === undefined || result.status === "error") {
        let error: string = (result === undefined) ? "Un erreur est survenue" : result.message;
        this.toastr.error(error, "Edition Projet", { positionClass: 'toast-top-center' });
        this.loading = false;
        return;
      } else {
        this.loading = false;
        let info: string = result.message;
        this.toastr.info(info, "Edition Projet", { positionClass: 'toast-top-center' });
      }
    });

  }//end updateProject

}
