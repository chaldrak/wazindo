import {
  Component,
  OnInit,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { EmbedVideoService } from "ngx-embed-video";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

import {
  ModalDismissReasons,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";

import { Contrepartie } from "../../../shared/models/contrepartie";
import { Finance } from "../../../shared/models/finance";
import { Projet } from "../../../shared/models/projet";
import {
  AdminService,
} from "../../../shared/services/adminservice/admin.service";
import {
  LocalStorageService,
} from "../../../shared/services/app/localstorage.service";

@Component({
  selector: 'app-modifier-projet',
  templateUrl: './modifier-projet.component.html',
  styleUrls: ['./modifier-projet.component.scss']
})
export class ModifierProjetComponent implements OnInit {
  loading: boolean;
  isLocal: boolean;
  image: boolean;
  document: File;
  imageContent: File;
  imageDocument: File;
  imageContentBiblio: File;
  imageContentContre: File;
  public imagePath;
  public imagePathContre;
  public imagePathBiblio;
  imageURL: any;
  imageBiblio: any;
  imageContre: any;
  message: string = "Veuillez charger l’image du projet";
  messageUpload: string = "Veuillez charger une image";
  messageVideo: string = "Veuillez héberger la vidéo promotionnelle de votre projet sur Youtube, puis copier le lien de la vidéo dans le champ ci-dessus";
  paysList: any[] = [];
  listDay: any[] = [
    { 'id': 1 }, { 'id': 2 }, { 'id': 3 }, { 'id': 4 }, { 'id': 5 }, { 'id': 6 }, { 'id': 7 }, { 'id': 8 }, { 'id': 9 }, { 'id': 10 },
    { 'id': 11 }, { 'id': 12 }, { 'id': 13 }, { 'id': 14 }, { 'id': 15 }, { 'id': 16 }, { 'id': 17 }, { 'id': 18 }, { 'id': 19 }, { 'id': 20 },
    { 'id': 21 }, { 'id': 22 }, { 'id': 23 }, { 'id': 24 }, { 'id': 25 }, { 'id': 26 }, { 'id': 27 }, { 'id': 28 }, { 'id': 29 }, { 'id': 30 },
    { 'id': 31 }, { 'id': 32 }, { 'id': 33 }, { 'id': 34 }, { 'id': 35 }, { 'id': 36 }, { 'id': 37 }, { 'id': 38 }, { 'id': 39 }, { 'id': 40 },
    { 'id': 41 }, { 'id': 42 }, { 'id': 43 }, { 'id': 44 }, { 'id': 45 }, { 'id': 46 }, { 'id': 47 }, { 'id': 48 }, { 'id': 49 }, { 'id': 50 },
    { 'id': 51 }, { 'id': 52 }, { 'id': 53 }, { 'id': 54 }, { 'id': 55 }, { 'id': 56 }, { 'id': 57 }, { 'id': 58 }, { 'id': 59 }, { 'id': 60 },
    { 'id': 61 }, { 'id': 62 }, { 'id': 63 }, { 'id': 64 }, { 'id': 65 }, { 'id': 66 }, { 'id': 67 }, { 'id': 68 }, { 'id': 69 }, { 'id': 70 },
    { 'id': 71 }, { 'id': 72 }, { 'id': 73 }, { 'id': 74 }, { 'id': 75 }, { 'id': 76 }, { 'id': 77 }, { 'id': 78 }, { 'id': 79 }, { 'id': 80 },
    { 'id': 81 }, { 'id': 82 }, { 'id': 83 }, { 'id': 84 }, { 'id': 85 }, { 'id': 86 }, { 'id': 87 }, { 'id': 88 }, { 'id': 89 }, { 'id': 90 },

  ];
  categorieList: any[] = [];
  departementList: any[] = [];
  listContrepartie: any[] = [];
  listFinance: any[] = [];
  communeList: any[] = [];
  dataUser: any = {};
  dataProjet: any = {};
  videoURL: string = "";
  iframe_html: any;
  imageDocURL: any;
  safeURL: any;
  closeResult = '';
  projet: Projet = new Projet();
  finance: Finance = new Finance();
  contrepartie: Contrepartie = new Contrepartie();
  urlVideo: string = "";

  constructor(private adminService: AdminService, private spinner: NgxSpinnerService, private router: Router, private modalService: NgbModal, private embedService: EmbedVideoService,
    private localStorageService: LocalStorageService, private _sanitizer: DomSanitizer, private toastr: ToastrService,) {
    this.dataProjet = this.localStorageService.getDataProjet();
    console.log(this.dataProjet);

this.listFinance = this.dataProjet.ligne_finance_projets;
this.listContrepartie = this.dataProjet.contreparties;
    this.projet.titre_projet = this.dataProjet.titre;
    this.projet.pays = this.dataProjet.pays.nom;
    this.projet.categorie = this.dataProjet.categorie.nom;
    this.imageURL = this.dataProjet.photo_mini;
    this.projet.montant_collecter = this.dataProjet.montant_a_collecte;
    this.projet.resume = this.dataProjet.resume;
    this.projet.description = this.dataProjet.description;
    this.projet.duree_campagne = this.dataProjet.duree_campagne + ' jours';
    this.projet.description_projet = this.dataProjet.description;
    this.projet.statut_projet = this.dataProjet.statut_projet;

    this.videoURL = "https://youtu.be/1TFZDpbHOLQ";
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
    this.iframe_html = this.embedService.embed(this.videoURL,
      {
        query: { portrait: 0, color: '333' },
        attr: { width: 800, height: 400 }
      });
    // this.data();
  }

  ngOnInit(): void {
    this.image = false;
  }

  saveProjetUpdated() {

    if (!this.projet.canUpdate()) {
      this.toastr.error(this.projet.getErrorMessage(), "Mise à jour Projet", { positionClass: 'toast-top-center' });
      this.loading = false;
      return;
    }
    this.projet.email = this.dataUser.email_address;
    this.projet.reference = '125455255';

    console.log(this.projet);
    this.loading = true;

    this.adminService.updateProject(this.projet).subscribe((result) => {

      this.loading = false;

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
      this.imageURL = reader.result;
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


  saveDocument() {
    let data: any = {
      'projet': this.dataProjet.id
    }
    this.adminService.saveDocument(this.imageDocument, data).subscribe(
      (result: any) => {

        let resp = result;
        this.toastr.error("succes", "Enregistrement du document", { positionClass: 'toast-top-center' });
        this.getListContrepartie(this.dataProjet.id);
      },
      err => {
        this.toastr.error("une erreur est survenue lors de l'enregistrement de votre document", "Edition Projet", { positionClass: 'toast-top-center' });
        return;
      }
    );

    this.modalService.dismissAll();

  }

  //is viewable
  isViewable() {

    console.log(this.projet.statut_projet);

    if (this.projet === undefined || this.projet.statut_projet === undefined) return false;
    return (this.projet.statut_projet.code === "INITIE" || this.projet.statut_projet.code === "EDITE");
  }

  //retour 
  goBack() {
    this.router.navigate(["list-projet"]);
  }//end goBack

  preValideProjet() {
    let data: any = {
      "project_reference": this.dataProjet.reference,
      "email_address": this.dataProjet.porteur_id
    }
    this.saveUpdateStatusProjet(data);
  }


  rejetProjet() {
    let data: any = {
      "project_reference": this.dataProjet.reference,
      "email_address": this.dataProjet.porteur_id
    }
    this.saveRejetProjet(data);

    // this.UpdateProjet(data);
  }


  goToBack() {
    this.router.navigate(["/public/soumettre-projet"]);

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

  previewBiblio(files) {
    console.log(files);
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    this.imageContentBiblio = files[0]

    var reader = new FileReader();
    this.imagePathBiblio = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageBiblio = reader.result;
    }
  }

  previewContre(files) {
    console.log(files);
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    this.imageContentContre = files[0]

    var reader = new FileReader();
    this.imagePathContre = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageContre = reader.result;
    }
  }

  preview(files) {
    console.log(files);
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
      this.imageURL = reader.result;
    }
  }

  data() {
    this.videoURL = "https://youtu.be/1TFZDpbHOLQ";
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
    this.iframe_html = this.embedService.embed(this.videoURL,
      {
        query: { portrait: 0, color: '333' },
        attr: { width: 800, height: 400 }
      });
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

    this.adminService.saveLigneFinance(data).subscribe(
      (result: any) => {

        let resp = result;
        this.toastr.success("succes", "Enregistrement de ligne finance", { positionClass: 'toast-top-center' });
        this.getListLigneFinance(this.dataProjet.id);
      },
      err => {
        this.toastr.error("une erreur est survenue lors de l'enregistrement de la ligne de finance", "Edition Projet", { positionClass: 'toast-top-center' });
        return;
      }
    );

    this.modalService.dismissAll();

  }

  //récupérer la liste des statistiques
  getListLigneFinance(id): void {

    this.adminService.getListLigneFinance(id).subscribe(
      (result: any) => {

        let resp = result;

        if (resp === null || resp === undefined) {
          this.listFinance = this.listFinance;
          return;
        }
        if (resp.status === "error") {
          this.listFinance = this.listFinance;
          return;
        }

        this.listFinance = resp.data;

      },
      err => {
        return;
      }
    );
  } //end getListStatistiques


  deleteLigneFinance(id) {

    this.adminService.deleteLigneFinance(id).subscribe(
      (result: any) => {

        let resp = result;
        this.toastr.success("succes", "Suppression de ligne finance", { positionClass: 'toast-top-center' });
        this.getListLigneFinance(this.dataProjet.id);

      },
      err => {
        this.toastr.error("une erreur est survenue lors de la suppression de la ligne de finance", "Edition Projet", { positionClass: 'toast-top-center' });
        return;
      }
    );

  }

  envoiFichier(fichiers: FileList) {
    this.document = fichiers.item(0);
    console.log(this.document);

  }

  //met a jour le statut du projet
  saveUpdateStatusProjet(data: any) {
    //
    this.spinner.show();

    this.adminService.saveUpdateStatusProjet(data).subscribe((result) => {
      console.log(result);

      this.spinner.hide();

      if (result === undefined) {
        let error: string = "Une erreur s'est produite lors de la mise à jour du statut de votre projet. Veuillez réessayer";

        this.toastr.error(error, "Wazindo", { positionClass: 'toast-top-center' });
        this.loading = false;
        return;
      }

      if (result.status === "error") {
        let error: string = result.message;
        this.toastr.error(error, "Wazindo", { positionClass: 'toast-top-center' });

        this.loading = false;
        return;
      } else {
        this.loading = false;
        let info: string = result.message;
        this.toastr.info(info, "Wazindo", { positionClass: 'toast-top-center' });
      }
    });

  }//end saveUpdateStatusProjet

  saveRejetProjet(data: any) {

    this.adminService.saveRejetProjet(data).subscribe((result) => {
      console.log(result);

      if (result === undefined) {
        let error: string = "Une erreur s'est produite lors du rejet de votre projet. Veuillez réessayer";
        alert(error);
        this.loading = false;
        return;
      }

      if (result.status === "error") {
        let error: string = result.message;
        alert(error);

        this.loading = false;
        return;
      } else {
        this.loading = false;
        let error: string = result.message;
        alert(error);
        this.getListContrepartie(this.dataProjet.id);


      }
    });

  }

  saveContrepartie() {
    if (!this.contrepartie.canSave()) {
      alert(this.contrepartie.getErrorMessage());
      return;
    }
    let data: any = {
      "montant": this.contrepartie.montant,
      "quantite": this.contrepartie.quantite,
      "date_livraison": this.contrepartie.date_livraison,
      "idProjet": this.dataProjet.id,
      "description": this.contrepartie.description

    }

    this.adminService.saveContrepartie(this.imageContent, data).subscribe((result) => {
      console.log(result);

      if (result === undefined) {
        let error: string = "Une erreur s'est produite lors de l'enregistrement de la contrepartie. Veuillez réessayer";
        alert(error);
        this.loading = false;
        return;
      }

      if (result.status === "error") {
        let error: string = result.message;
        alert(error);

        this.loading = false;
        return;
      } else {
        this.loading = false;
        let error: string = result.message;
        alert(error);
        this.getListContrepartie(this.dataProjet.id);


      }
    });

    this.modalService.dismissAll('Save click');
  }

  //récupérer les projets par catégorie
  DeleteContrepartie(data: any): void {

    let dataIdContrepartie: any = {
      "id": data.id
    }
    this.adminService.deleteContrepartie(dataIdContrepartie).subscribe(
      (result: any) => {
        console.log(result);
        let resp = result;

        if (resp === null || resp === undefined) {
          this.listContrepartie = this.listContrepartie;
          return;
        }
        if (resp.status === "error") {
          this.listContrepartie = this.listContrepartie;
          return;
        }
        this.getListContrepartie(this.dataProjet.id);


      },
      err => {

        return;
      }
    );
  } //end getListProjetByCategory

  //récupérer les projets par catégorie
  getListContrepartie(data: string): void {

    let dataIdProjet: any = {
      "idProjet": data
    }
    this.adminService.getListContrepartie(dataIdProjet).subscribe(
      (result: any) => {
        console.log(result);
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
  } //end getListProjetByCategory


  // checkPays () {
  // if(this.projet.pays === 'Benin'){
  //   this.isLocal = true;
  // }else{
  //   this.isLocal = false;

  // }

}

