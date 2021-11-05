

export class Finance {

    public ligne_financer: string;
    public commentaire: string;
    public description: string;
    public montant: number;
    public quantite_limite: boolean;
    public date_mise_en_oeuvre: Date;
    public date_livraison: Date;
    public deadline: Date;


    private errorMessage: string;

constructor(){
		this.errorMessage = "";
}

//get error message
getErrorMessage(): string {
		return this.errorMessage;
}//end getErrorMessage


//check for save
canSaveFinance(): boolean {

						//type_organisation
						if(this.ligne_financer === undefined || this.ligne_financer === null){
						  this.errorMessage = "Veuillez saisir le nombre de ligne à financer"; return false;
						}

						//type_organisation
						if(this.montant === undefined || this.montant === null){
						  this.errorMessage = "Veuillez saisir le montant"; return false;
						}
						//titre_projet
						if(this.commentaire === undefined || this.commentaire === null || this.commentaire.trim() === ""){
							this.errorMessage = "Veuillez saisir votre commentaire"; return false;
						  }
					
					  //categorie
					  if(this.date_mise_en_oeuvre === undefined || this.date_mise_en_oeuvre === null){
						this.errorMessage = "Veuillez selectionner la date de ùise en oeuvre"; return false;
					  }

							//montant_collecter
						if(this.deadline === undefined || this.deadline === null){
							this.errorMessage = "Veuillez selectionner la deadline"; return false;
						  }
					
						return true;

}//end canSave					


}
