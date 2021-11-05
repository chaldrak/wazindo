export class MessageWazindo {

  public objet: string;
  public contenu: string;
  public nom: string;
  public prenom: string;
  public telephone: string;
  public email: string;


  private errorMessage: string;

  constructor() {
    this.errorMessage = "";
  }

  //get error message
  getErrorMessage(): string {
    return this.errorMessage;
  }//end getErrorMessage


  //check for save
  canSendMessage(): boolean {

    //message
    if (this.contenu === undefined || this.contenu === null || this.contenu.trim() === "") {
      this.errorMessage = "Veuillez saisir votre message"; return false;
    }

    //objet
    if (this.email === undefined || this.email === null || this.email.trim() === "") {
      this.errorMessage = "Veuillez saisir votre adresse email"; return false;
    }

    //objet
    if (this.telephone === undefined || this.telephone === null || this.telephone.trim() === "") {
      this.errorMessage = "Veuillez saisir votre adresse telephone"; return false;
    }

    //objet
    if (this.nom === undefined || this.nom === null || this.nom.trim() === "") {
      this.errorMessage = "Veuillez saisir votre nom"; return false;
    }

    //objet
    if (this.prenom === undefined || this.prenom === null || this.prenom.trim() === "") {
      this.errorMessage = "Veuillez saisir votre prenom"; return false;
    }


    return true;
  }//end canSave

  //check for save
  canSave(): boolean {

    //objet
    if (this.objet === undefined || this.objet === null || this.objet.trim() === "") {
      this.errorMessage = "Veuillez saisir le titre du message"; return false;
    }
    //message
    if (this.contenu === undefined || this.contenu === null || this.contenu.trim() === "") {
      this.errorMessage = "Veuillez saisir votre message"; return false;
    }

    return true;
  }//end canSave

}
