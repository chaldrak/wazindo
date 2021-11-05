export class Contrepartie {

    public montant: number;
    public description: string;
    public image: string;
    public quantite: number;
    public date_livraison: Date;

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

//montant
if(this.montant === undefined || this.montant === null){
  this.errorMessage = "Veuillez saisir le montant"; return false;
}
//date_livraison
if(this.date_livraison === undefined || this.date_livraison === null){
  this.errorMessage = "Veuillez saisir la date de livraison"; return false;
}
//image
if(this.image === undefined || this.image === null){
  this.errorMessage = "Veuillez ajouter une image"; return false;
}
//description
if(this.description === undefined || this.description === null || this.description.trim() === ""){
  this.errorMessage = "Veuillez saisir la description"; return false;
}

return true;
}//end canSave


}
