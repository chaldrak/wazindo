// import * as EmailValidator from 'email-validator';


export class Profil {

  public id: string;
  public email: string;
  public password: string;
  public password_confirmation: string;
  public nom: string;
  public prenom: string;
  public telephone: string;
  public pays_id: string;
	public biographie: string;
	public facebook: string;
	public youtube: string;
	public twitter: string;
	public linkedln: string;
  private errorMessage: string;

  constructor() {
    this.errorMessage = "";
  }

  //get error message
  getErrorMessage(): string {
    return this.errorMessage;
  }//end getErrorMessage

  //check for save
  canEdit(): boolean {
   //nom
   if (this.nom === undefined || this.nom === null || this.nom.trim() === "") {
    this.errorMessage = "Veuillez saisir votre nom de famille"; return false;
  }

  //prenom
  if (this.prenom === undefined || this.prenom === null || this.prenom.trim() === "") {
    this.errorMessage = "Veuillez saisir votre prénom"; return false;
  }

  //telephone
  if (this.biographie === undefined || this.biographie === null) {
    this.errorMessage = "Veuillez saisir votre biographie"; return false;
  }

  //email adress
  if (this.email === undefined || this.email === null || this.email.trim() === "") {
    this.errorMessage = "Veuillez saisir votre adresse email"; return false;
  }

    return true;
  }//end canSave

  //check for save
  canSave(): boolean {

    //nom
    if (this.nom === undefined || this.nom === null || this.nom.trim() === "") {
      this.errorMessage = "Veuillez saisir votre nom de famille"; return false;
    }

    //prenom
    if (this.prenom === undefined || this.prenom === null || this.prenom.trim() === "") {
      this.errorMessage = "Veuillez saisir votre prénom"; return false;
    }

    //telephone
    if (this.telephone === undefined || this.telephone === null) {
      this.errorMessage = "Veuillez saisir votre numéro de téléphone"; return false;
    }

    //pays_id
    if (this.pays_id === undefined || this.pays_id === null) {
      this.errorMessage = "Veuillez sélectionner le pays"; return false;
    }


    //email adress
    if (this.email === undefined || this.email === null || this.email.trim() === "") {
      this.errorMessage = "Veuillez saisir votre adresse email"; return false;
    }

    // //email address validity
    // let checkEmail : boolean = EmailValidator.validate(this.email.trim());
    // if (checkEmail === false){
    //     this.errorMessage = "Cette adresse email n'est pas valide"; return false;
    // }   

    //password
    if (this.password === undefined || this.password === null || this.password.trim() === "") {
      this.errorMessage = "Veuillez saisir votre mot de passe"; return false;
    }

    //length password
    if (this.password.length < 5) {
      this.errorMessage = "Le mot de passe est trop court. Veuillez réessayer"; return false;
    }

    // //confirm password
    // if (this.password_confirmation === undefined || this.password_confirmation === null || this.password_confirmation.trim() === "") {
    //   this.errorMessage = "Veuillez saisir la confirmation du mot de passe"; return false;
    // }


    // //confirm password
    // if (this.password !== this.password_confirmation) {
    //   this.errorMessage = "Les deux mots de passe ne correspondent pas"; return false;
    // }

    return true;
  }//end canSave


  //check for save
  canConnect(): boolean {

    //prenoms
    if (this.email === undefined || this.email === null || this.email.trim() === "") {
      this.errorMessage = "Veuillez saisir votre adresse email"; return false;
    }

    // //email address validity
    // let checkEmail : boolean = EmailValidator.validate(this.email.trim());
    // if (checkEmail === false){
    //     this.errorMessage = "Cette adresse email n'est pas valide"; return false;
    // }  

    //password
    if (this.password === undefined || this.password === null || this.password.trim() === "") {
      this.errorMessage = "Veuillez saisir votre mot de passe"; return false;
    }

    return true;
  }//end canSave


  //check for save
  canReset(): boolean {

    //prenoms
    if (this.email === undefined || this.email === null || this.email.trim() === "") {
      this.errorMessage = "Veuillez saisir votre adresse email"; return false;
    }
    return true;
  }//end canSave

}
