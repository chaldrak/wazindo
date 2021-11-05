
// Products
export class Produit {
    id?: number;
    titre?: string;
    code?: string;
    description?: string;
    url_default?: string;
    prix: number;

    marque: any;
    modele: string;
    kilometrage: string;
    annee: number;
    image_produits: any[];



    constructor(){
        this.prix = 50000;

    }


}
