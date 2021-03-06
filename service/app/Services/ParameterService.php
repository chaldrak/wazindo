<?php
namespace App\Services;
use App\Models\Pay;
use App\Models\Profil;
use App\Models\User;
use App\Models\Projet;
use App\Models\Categorie;
use App\Models\Departement;
use App\Models\VideoProjet;
use App\Models\ModePaiement;
use App\Models\TypeContribution;
use App\Exceptions\WazindoException;
use Illuminate\Database\QueryException;


class ParameterService
{

	//get Type Contribution
    public function getTypeContribution($code){
        try {
        $searchTypeContribution=TypeContribution::where('code','=',$code)->get();
        if ($searchTypeContribution->isEmpty())
        {
        throw new WazindoException ("Cette contribution n'existe pas ! ");
        }
        $foundType = $searchTypeContribution->first();
        return $foundType;
        }
        catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
            }
        catch (\Exception $ex) {
            throw $ex;
        }
    }
	// end of get Type Contribution
	
	//get Mode Paiement
    public function getModePaiement($mode_paiement_reference){
        try {
       $searchModePaiement=ModePaiement::where('code','=',$mode_paiement_reference)->get();
        if ($searchModePaiement->isEmpty())
        {
            throw new WazindoException ("Ce mode de paiement n'existe pas ! ");
        }
        $foundMode = $searchModePaiement->first();
        return $foundMode;
    }
    catch (\Illuminate\Database\QueryException $ex) {
        throw $ex;
         }
    catch (\Exception $ex) {
        throw $ex;
    }
    }
	// end of get Mode Paiement

	// get Profil
    public function getProfil($login){
        try {
        $searchUser=User::where('login','=',$login)->get();
            if ($searchUser->isEmpty())
            {
                throw new WazindoException ("Cet utilisateur n'existe pas ! ");
            }
            $foundUser = $searchUser->first();
            return $foundUser;
        }
        catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
             }
        catch (\Exception $ex) {
            throw $ex;
        }
     }
	 // end of get Profil

	// get Projet
     public function getProjet($projet_reference){
        try {
     
            $searchProjet=Projet::where('reference','=',$projet_reference)->get();

        if ($searchProjet->isEmpty())
        {
            throw new WazindoException("Cet projet n'existe pas ! ");

        }
        $foundProjet = $searchProjet->first();
        return $foundProjet;
    }
    catch (\Illuminate\Database\QueryException $ex) {
        throw $ex;
         }
    catch (\Exception $ex) {
        throw $ex;
    }
     }
	 // end of get Projet
	 
	// get Video
     public function getVideo($video_reference){
        try {
        $searchVideo=VideoProjet::where('reference','=',$video_reference)->get();
        if ($searchVideo->isEmpty())
        {
            throw new WazindoException ("Cette video n'existe pas ! ");
        }
        $foundVideo = $searchVideo->first();
        return $foundVideo;
    }
    catch (\Illuminate\Database\QueryException $ex) {
        throw $ex;
         }
    catch (\Exception $ex) {
        throw $ex;
    }
     }
	 	// end of get Video

    //Categorie
    public static function getListCategories()
    {
        try {
            $listCategories = Categorie::all();

            return $listCategories;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {
            throw $ex;
        }
    } 
	//end of get Group By Code

	//create Categorie
    public function createCategorie($nom)
    {
        try {
            $createcategorie = new Categorie();
            $createcategorie -> nom = $nom;
            $createcategorie -> save();

            return array("status" => "success", "message" => "La cat??gorie a ??t?? cr??e avec succ??s", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {
            return array("status" => "error", "message" => "Une erreur est survenue lors de la cr??ation de la cat??gorie", "data" => $ex);
        } catch (\Exception $ex) {
            return array("status" => "error", "message" => "Une erreur est survenue lors de la cr??ation de la cat??gorie", "data" => $ex);
        }
    }
	// end of create Categorie

	//update categorie
public function updateCategorie($id,$nom)
{
    try {

           //phone verification
           $searchCategorieCheck = Categorie::where("id", "=", $id)
           ->get();
           if ($searchCategorieCheck->isEmpty()) {
               return array("status" => "error", "message" => "Cette cat??gorie n'existe pas", "data" => "");
           }
        //got it
        $foundCategorie = $searchCategorieCheck->first();
        //now update
        $foundCategorie->nom = $nom;
        $foundCategorie->save();

        return true;

    }
    catch (\Illuminate\Database\QueryException $ex) {
        return array("status" => "error", "message" => "Une erreur est survenue lors de la cr??ation de la categorie", "data" => "");
    }
    catch (\Exception $ex) {
        return array("status" => "error", "message" => "Une erreur est survenue lors de la cr??ation de la categorie", "data" => "");
    }
}
 //end of update Categorie
 
 //remove Categorie
public function removeCategorie($id)
{
    try {
        $searchCategorie = Categorie::where("id", "=", $id)->get();
        //search existence
        if ($searchCategorie->isEmpty()) {
            return array("status" => "succ??s", "message" => "Impossible de trouver cette cat??gorie. Veuillez r??essayer", "data" => "");
        }
        //get profil related
        $foundCategorie=$searchCategorie->first();
        $projet_lie=Projet::where("categorie_id","=",$id)->get();
        if(!$projet_lie->isEmpty())
        {
            return array("status"=>"error","message" => "Cette cat??gorie est d??j?? utilis??e par un projet !","data"=>"");
        }

        $foundCategorie->delete();
        return array("status" => "succ??s", "message" => "La cat??gorie a ??t?? supprim?? avec succ??s", "data" => "");

        // return true;

    }
    catch (\Illuminate\Database\QueryException $ex) {

         }
    catch (\Exception $ex) {
        throw $ex;
    }
}
 //end of remove Categorie


// get List Countries
    public static function getListCountries()
    {
        try {
          $listCountries = Pay::orderBy("nom", "ASC")->get();
          return $listCountries;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {
            throw $ex;
        }
    }
	//end of get List Countries
	
	// create Countrie
    public function createCountrie($nom,$indicatif)
    {
        try {
            $createcountrie = new Pay();
            $createcountrie -> nom = $nom;
            $createcountrie -> indicatif = $indicatif;
            $createcountrie -> save();

            return array("status" => "success", "message" => "Le pays a ??t?? cr??e avec succ??s", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {
            return array("status" => "error", "message" => "Une erreur est survenue lors de la cr??ation du pays", "data" => "");
        } catch (\Exception $ex) {
            return array("status" => "error", "message" => "Une erreur est survenue lors de la cr??ation du pays", "data" => "");
        }
    }
    public function updateCountrie($id,$nom,$indicatif)
    {
        try {

               //phone verification
               $searchCountrieCheck = Pay::where("id", "=", $id)
               ->get();
               if ($searchCountrieCheck->isEmpty()) {
                   return array("status" => "error", "message" => "Ce pays n'existe pas", "data" => "");
               }
            //got it
            $foundCountrie = $searchCountrieCheck->first();
            //now update
            $foundCountrie->nom = $nom;
            $foundCountrie->indicatif = $indicatif;
            $foundCountrie->save();

            return true;

        }
        catch (\Illuminate\Database\QueryException $ex) {
            return array("status" => "error", "message" => "Une erreur est survenue lors de la cr??ation du pays", "data" => "");
        }
        catch (\Exception $ex) {
            return array("status" => "error", "message" => "Une erreur est survenue lors de la cr??ation du pays", "data" => "");
        }
    }
	//end of create Countrie


	// remove Countrie
    public function removeCountrie($id){

    try {
        $searchCountrie = Pay::where("id", "=", $id)->get();
        //search existence
        if ($searchCountrie->isEmpty()) {
            return array("status" => "succ??s", "message" => "Impossible de trouver cette cat??gorie. Veuillez r??essayer", "data" => "");
        }
        //get profil related
        $foundCountrie=$searchCountrie->first();
        $searchDepartement = Departement::where("pays_id", "=", $id)->get();
        if (!$searchDepartement->isEmpty()) {
        return array("status" => "succ??s", "message" => "Impossible de supprimer ce pays car il est li??e ?? un d??partement", "data" => "");
        }
        $searchProfil = User::where("pays_id", "=", $id)->get();
        if (!$searchProfil->isEmpty()) {
        return array("status" => "succ??s", "message" => "Impossible de supprimer ce pays car il est li??e ?? un profil", "data" => "");
        }
        //remove now
        $foundCategorie->delete();
        return array("status" => "succ??s", "message" => "La cat??gorie a ??t?? supprim?? avec succ??s", "data" => "");
        // return true;

    }
    catch (\Illuminate\Database\QueryException $ex) {

         }
    catch (\Exception $ex) {
        throw $ex;
    }
} 
//end of remove Countrie


    // get List Departements
    public static function getListDepartements($pays_id)
    {
        try {
            $listDepartements = Departement::where('pays_id', '=', $pays_id)->get();

            return $listDepartements;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {
            throw $ex;
        }
    }
	//end of get List Departements
	
	//create Departement
    public function createDepartement($nom,$pays_id)
    {
        try {
            $createDepartement = new Departement();
            $createDepartement -> nom = $nom;
            $createDepartement -> pays_id = $pays_id;
            $createDepartement -> save();

            return array("status" => "success", "message" => "Le d??partement a ??t?? cr??e avec succ??s", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {
            return array("status" => "error", "message" => "Une erreur est survenue lors de la cr??ation du departement", "data" => "");
        } catch (\Exception $ex) {
            return array("status" => "error", "message" => "Une erreur est survenue lors de la cr??ation du departement", "data" => "");
        }
    }

    public function updateDepartement($id,$nom,$pays_id)
    {
        try {

               //phone verification
               $searchDepartementCheck = Departement::where("id", "=", $id)
               ->get();
               if ($searchDepartementCheck->isEmpty()) {
                   return array("status" => "error", "message" => "Ce d??partement n'existe pas", "data" => "");
               }
            //got it
            $foundDepartement = $searchDepartementCheck->first();
            //now update
            $foundDepartement->nom = $nom;
            $foundDepartement->pays_id = $pays_id;
            $foundDepartement->save();

            return true;

        }
        catch (\Illuminate\Database\QueryException $ex) {
            return array("status" => "error", "message" => "Une erreur est survenue lors de la modification du departement", "data" => "");
        }
        catch (\Exception $ex) {
            return array("status" => "error", "message" => "Une erreur est survenue lors de la modification du departement", "data" => "");
        }
    }
	//end of create Departement
	
	
    //remove Departement
    public function removeDepartement($id){

        try {

            $searchDepartement = Departement::where("id", "=", $id)->get();
            //search existence
            if ($searchDepartement->isEmpty()) {
                return array("status" => "succ??s", "message" => "Impossible de trouver cette cat??gorie. Veuillez r??essayer", "data" => "");
            }
            //get profil related
            $foundDepartement=$searchDepartement->first();
            $searchProjetDepartement = Projet::where("departement_id", "=", $id)->get();
            if (!$searchProjetDepartement->isEmpty()) {
            return array("status" => "succ??s", "message" => "Impossible de supprimer ce d??partement car il est li??e ?? un projet", "data" => "");
            }

            //remove now
            $foundDepartement->delete();
            return array("status" => "succ??s", "message" => "La cat??gorie a ??t?? supprim?? avec succ??s", "data" => "");

            // return true;

        }
        catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
             }
        catch (\Exception $ex) {
            throw $ex;
        }
    }
	//end of remove Departement
}
