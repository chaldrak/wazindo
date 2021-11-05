export class Finance {

	public ligne_financer: string;
	public commentaire: string;
	public description: string;
	public montant: number;
	public quantite_limite: boolean;
	public date_mise_en_oeuvre: Date;
	public date_livraison: Date;
	public deadline: Date;

	public statut: string;
	public residence: string;
	public email: string;
	public phone: string;
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
	canSaveFinance(): boolean {

		//type_organisation
		if (this.ligne_financer === undefined || this.ligne_financer === null) {
			this.errorMessage = "Veuillez saisir le nombre de ligne à financer"; return false;
		}

		//type_organisation
		if (this.montant === undefined || this.montant === null) {
			this.errorMessage = "Veuillez saisir le montant"; return false;
		}
		//titre_projet
		if (this.commentaire === undefined || this.commentaire === null || this.commentaire.trim() === "") {
			this.errorMessage = "Veuillez saisir votre commentaire"; return false;
		}

		//categorie
		if (this.date_mise_en_oeuvre === undefined || this.date_mise_en_oeuvre === null) {
			this.errorMessage = "Veuillez selectionner la date de ùise en oeuvre"; return false;
		}

		//montant_collecter
		if (this.deadline === undefined || this.deadline === null) {
			this.errorMessage = "Veuillez selectionner la deadline"; return false;
		}

		return true;

	}//end canSave					

	//check for save
	SaveBibiographie(): boolean {
		// //statut
		// if (this.statut === undefined || this.statut === null || this.statut.trim() === "") {
		// 	this.errorMessage = "Veuillez choisir votre statut"; return false;
		// }

		//residence
		if (this.residence === undefined || this.residence === null || this.residence.trim() === "") {
			this.errorMessage = "Veuillez saisir votre residence"; return false;
		}
		//titre_projet
		if (this.email === undefined || this.email === null || this.email.trim() === "") {
			this.errorMessage = "Veuillez saisir votre adresse email"; return false;
		}

		//categorie
		if (this.phone === undefined || this.phone === null || this.phone.trim() === "") {
			this.errorMessage = "Veuillez saisir votre numéro de téléphone"; return false;
		}

		//montant_collecter
		if (this.biographie === undefined || this.biographie === null || this.biographie.trim() === "") {
			this.errorMessage = "Veuillez saisir votre bibliographie"; return false;
		}


		//facebook
		if (this.facebook === undefined || this.facebook === null || this.facebook.trim() === "") {
			this.errorMessage = "Veuillez saisir votre compte facebook"; return false;
		}

		//  strpos(this.facebook,"http://")===0 )
		else {
			if (!this.facebook.startsWith('http://')) {
				this.errorMessage = "Veuillez saisir une adresse commençant par http://"; return false;
			}
		}

		//twitter
		if (this.twitter === undefined || this.twitter === null || this.twitter.trim() === "") {
			this.errorMessage = "Veuillez saisir votre compte twitter"; return false;
		}
		else {
			if (!this.twitter.startsWith('http://')) {
				this.errorMessage = "Veuillez saisir une adresse commençant par http://"; return false;
			}
		}

		//youtube
		if (this.youtube === undefined || this.youtube === null || this.youtube.trim() === "") {
			this.errorMessage = "Veuillez saisir votre compte youtube"; return false;
		}
		else {
			if (!this.youtube.startsWith('http://')) {
				this.errorMessage = "Veuillez saisir une adresse commençant par http://"; return false;
			}
		}

		//linkedln
		if (this.linkedln === undefined || this.linkedln === null || this.linkedln.trim() === "") {
			this.errorMessage = "Veuillez saisir votre compte linkedln"; return false;
		}
		else {
			if (!this.linkedln.startsWith('http://')) {
				this.errorMessage = "Veuillez saisir une adresse commençant par http://"; return false;
			}
		}


		return true;

	}//end canSave					


}
