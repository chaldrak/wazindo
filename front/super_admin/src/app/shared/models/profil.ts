export class Profil {

            public id: string;
            public adresse_email: string;
            public mdp: string;
            public confirm_mdp: string;
            public nom: string;
            public prenom: string;
            public telephone: string;

            private errorMessage: string;

    constructor(){
      this.errorMessage = "";
    }

    //get error message
    getErrorMessage(): string {
      return this.errorMessage;
    }//end getErrorMessage

      //check for save
      canEdit(): boolean {
     
        //prenoms
        if(this.adresse_email === undefined || this.adresse_email === null || this.adresse_email.trim() === ""){
          this.errorMessage = "Veuillez saisir votre adresse email"; return false;
        }

        return true;
      }//end canSave

      //check for save
      canSave(): boolean {
     
        //prenoms
        if(this.adresse_email === undefined || this.adresse_email === null || this.adresse_email.trim() === ""){
          this.errorMessage = "Veuillez saisir votre adresse email"; return false;
        }
      
        //mdp
        if(this.mdp === undefined || this.mdp === null){
          this.errorMessage = "Veuillez saisir votre mot de passe"; return false;
        }
        //mdp
        if(this.confirm_mdp === undefined || this.confirm_mdp === null){
          this.errorMessage = "Veuillez saisir la confirmation du mot de passe"; return false;
        }
        //mdp
        if(this.mdp !== this.confirm_mdp){
          this.errorMessage = "Les deux mots de passe ne correspondent pas"; return false;
        }

        return true;
      }//end canSave


      //check for save
      canConnect(): boolean {
     
        //prenoms
        if(this.adresse_email === undefined || this.adresse_email === null || this.adresse_email.trim() === ""){
          this.errorMessage = "Veuillez saisir votre adresse email"; return false;
        }
      
        //mdp
        if(this.mdp === undefined || this.mdp === null){
          this.errorMessage = "Veuillez saisir votre mot de passe"; return false;
        }

        return true;
      }//end canSave

}
