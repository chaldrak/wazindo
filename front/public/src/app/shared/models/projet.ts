// import * as EmailValidator from 'email-validator';
import { Profil } from './profil';

export class Projet {

    public type_organisation: string;
    public titre_projet: string;
    public porteur_id: number;
    public pays: string;
    public departement: string;
    public email: string;
    public commune: string;
    public categorie: string;
    public montant_collecter: number;
    public duree_campagne: string;
    public description_projet: string;
    public contrepartie: string;
    public resume: string;
    public document_projet: File;

	public description: string;
    public montant: number;
    public quantite: boolean = false;
    public date_livraison: Date;

	public message: string;
	public mode: string;
	public contact: string;


	public reference: string;
	public porteur: Profil;

    private errorMessage: string;

constructor(){
		this.errorMessage = "";
}

//get error message
getErrorMessage(): string {
		return this.errorMessage;
}//end getErrorMessage


//check for save
canUpdate(): boolean {

						//type_organisation
						if(this.type_organisation === undefined || this.type_organisation === null){
						  this.errorMessage = "Veuillez sélectionner le type d'organisation"; return false;
						}
						//titre_projet
						if(this.titre_projet === undefined || this.titre_projet === null || this.titre_projet.trim() === ""){
							this.errorMessage = "Veuillez saisir le titre du projet"; return false;
						  }
						  	  //pays
						if(this.pays === undefined || this.pays === null ){ //|| this.pays.trim() === ""
							this.errorMessage = "Veuillez sélectionner le pays"; return false;
					  }else{
						//   if (this.pays === "Benin" ){
						// 	//departement
						// 	if(this.departement === undefined || this.departement === null || this.departement.trim() === ""){
						// 	  this.errorMessage = "Veuillez selectionner le departement"; return false;
						// 	}
						// 	//commune
						// 	if(this.commune === undefined || this.commune === null || this.commune.trim() === ""){
						// 	  this.errorMessage = "Veuillez selectionner la commune"; return false;
						// 	}
						// }
					  }	  
					  //categorie
					  if(this.categorie === undefined || this.categorie === null){
						this.errorMessage = "Veuillez sélectionner la catégorie du projet"; return false;
					  }

							//montant_collecter
						if(this.montant_collecter === undefined || this.montant_collecter === null){
							this.errorMessage = "Veuillez saisir le montant à collecter pour le projet"; return false;
						  }
						
						//duree_campagne
						if(this.duree_campagne === undefined || this.duree_campagne === null){
							this.errorMessage = "Veuillez saisir le nombre de jours de la durée de campagne du projet"; return false;
						  }

						  	//resume
						if(this.resume === undefined || this.resume === null){
							this.errorMessage = "Veuillez saisir la phrase d'accroche"; return false;
						  }
						  	
						//description_projet
						if(this.description_projet === undefined || this.description_projet === null || this.description_projet.trim() === ""){
							this.errorMessage = "Veuillez saisir la présentation détaillée"; return false;
						  }

						// //email
						// if(this.email === undefined || this.email === null || this.email.trim() === ""){
						//   this.errorMessage = "Veuillez saisir adresse email"; return false;
					  				  
						// }else{
						// 	let checkEmail : boolean = EmailValidator.validate(this.email.trim());
						// 	if (checkEmail === false){
						// 		 this.errorMessage = "Cette adresse email n'est pas valide"; return false;
						// 	}
						// }

						
						  
					
					
					

					

						// //contrepartie
						// if(this.contrepartie === undefined || this.contrepartie === null || this.contrepartie.trim() === ""){
						//   this.errorMessage = "Veuillez saisir les contreparties de votre projet"; return false;
						// }

						return true;

}//end canUpdate				
			

//check for save
savePartage(): boolean {

	//mode
	if(this.mode === undefined || this.mode === null){
	  this.errorMessage = "Veuillez selectionner le mode de partage"; return false;
	}
	
	//message
	if(this.message === undefined || this.message === null || this.message.trim() === ""){
		this.errorMessage = "Veuillez saisir votre message"; return false;
	  }

	return true;

}//end canSave

//check for save
canSaveContrepartie(): boolean {

	//type_organisation
	if(this.montant === undefined || this.montant === null){
	  this.errorMessage = "Veuillez saisir le montant"; return false;
	}
	
	//titre_projet
	if(this.description === undefined || this.description === null || this.description.trim() === ""){
		this.errorMessage = "Veuillez saisir votre description"; return false;
	  }

		//montant_collecter
	if(this.date_livraison === undefined || this.date_livraison === null){
		this.errorMessage = "Veuillez selectionner la date de livraison"; return false;
	  }

	return true;

}//end canSave


//check for save
canSave(): boolean {

						//type_organisation
						if(this.type_organisation === undefined || this.type_organisation === null){
						  this.errorMessage = "Veuillez sélectionner le type d'organisation"; return false;
						}
						
						//email
						if(this.email === undefined || this.email === null || this.email.trim() === ""){
						  this.errorMessage = "Veuillez saisir adresse email"; return false;
					  				  
						}
						// else{
						// 	let checkEmail : boolean = EmailValidator.validate(this.email.trim());
						// 	if (checkEmail === false){
						// 		 this.errorMessage = "Cette adresse email n'est pas valide"; return false;
						// 	}
						// }

						//titre_projet
						if(this.titre_projet === undefined || this.titre_projet === null || this.titre_projet.trim() === ""){
							this.errorMessage = "Veuillez saisir le titre du projet"; return false;
						  }
						  
						  //pays
						if(this.pays === undefined || this.pays === null || this.pays.trim() === ""){
								this.errorMessage = "Veuillez sélectionner le pays"; return false;
						  }else{
							  if (this.pays === "Benin" ){
								//departement
								if(this.departement === undefined || this.departement === null || this.departement.trim() === ""){
								  this.errorMessage = "Veuillez selectionner le departement"; return false;
								}
								//commune
								if(this.commune === undefined || this.commune === null || this.commune.trim() === ""){
								  this.errorMessage = "Veuillez selectionner la commune"; return false;
								}
							}
						  }
						  

						
						//categorie
						if(this.categorie === undefined || this.categorie === null || this.categorie.trim() === ""){
						  this.errorMessage = "Veuillez sélectionner la catégorie du projet"; return false;
						}
						
							//montant_collecter
						if(this.montant_collecter === undefined || this.montant_collecter === null){
						  this.errorMessage = "Veuillez saisir le montant à collecter pour le projet"; return false;
						}

						//duree_campagne
						if(this.duree_campagne === undefined || this.duree_campagne === null){
						  this.errorMessage = "Veuillez indiquer le nombre de jours de la durée de campagne du projet"; return false;
						}
						
						//description_projet
						if(this.description_projet === undefined || this.description_projet === null || this.description_projet.trim() === ""){
						  this.errorMessage = "Veuillez saisir la description du projet"; return false;
						}

						//contrepartie
						if(this.contrepartie === undefined || this.contrepartie === null || this.contrepartie.trim() === ""){
						  this.errorMessage = "Veuillez saisir les contreparties de votre projet"; return false;
						}

						return true;

}//end canSave					
			


						



}
