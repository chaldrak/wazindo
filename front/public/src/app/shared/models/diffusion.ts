export class Diffusion {

    public nom: string;
    public nom_diffusion: string;
    public telephone: string;
    public email: string;

    private errorMessage: string;

constructor(){
this.errorMessage = "";
}

//get error message
getErrorMessage(): string {
return this.errorMessage;
}//end getErrorMessage

//check for save
canSave(): boolean {

//prenoms
if(this.nom === undefined || this.nom === null || this.nom.trim() === ""){
  this.errorMessage = "Veuillez saisir le nom"; return false;
}

//prenoms
if(this.telephone === undefined || this.nom === null || this.nom.trim() === ""){
  this.errorMessage = "Veuillez saisir le numéro de téléphone"; return false;
}

//prenoms
if(this.email === undefined || this.email === null || this.email.trim() === ""){
  this.errorMessage = "Veuillez saisir l'adresse email'"; return false;
}

return true;
}//end canSave


}
