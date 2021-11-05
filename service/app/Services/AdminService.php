<?php
namespace App\Services;
use App\Models\Profil;
use App\Models\Projet;
use App\Models\Actualite;
use App\Models\Categorie;
use App\Models\Commentaire;
use App\Models\VideoProjet;
use App\Models\Contrepartie;
use App\Models\Contribution;
use App\Models\ModePaiement;
use App\Models\TypeContribution;
use App\Exceptions\WazindoException;
use App\Helpers\Factory\ParamsFactory;
use App\Models\Commune;
use App\Models\Departement;
use App\Models\DetailDiffusion;
use App\Models\Diffusion;
use App\Models\Pay;
use App\Models\StatutProjet;
use App\Models\TypeOrganisation;

class AdminService
{


    public function __construct()
    {

    }

     // get List Project Admin
     public static function getListProjectAdmin($statut)
     {
         try{
             $searchStatut= StatutProjet::where("nom", "like", $statut)->get();
             if($searchStatut->isEmpty()){
                 //return array( "status" => "error", "message" => "Vos paramètres de recherche sont incorrects. Veuillez réésayer à nouveau", "data" => "" );
             }else{
                 $statutId = $searchStatut->first()->id;
 
                 }
 
             $searchProjet= Projet::with("statut_projet",   "categorie",
             "ligne_finance_projets","contributions","commentaires","actualites","type_organisation","pays",
             "contreparties",
             "profil")
             ->orderBy("id", "desc")
             ->get(); 
             //where("statut_projet_id", "like", $statutId)
             //->get();
                   
                     return array( "status" => "success", "message" => "", "data" => $searchProjet );
 
             }
             catch (\Illuminate\Database\QueryException $ex) {
             
                 throw $ex;
             }
             catch (\Exception $ex) {
                 
                 throw $ex;
             }
     }
     //end of get List Project Admin

     

     // get List Project Admin
     public static function getListProject()
     {
         try{
              $searchProjet= Projet::all(); 
                   
                     return array( "status" => "success", "message" => "", "data" => $searchProjet );
             }
             catch (\Illuminate\Database\QueryException $ex) {
             
                 throw $ex;
             }
             catch (\Exception $ex) {
                 
                 throw $ex;
             }
     }
     //end of get List Project Admin

     
   //update status
    public static function updateProjectStatus($reference, $email)
    {
        try{
            $searchStatut= Projet::where("reference", "like", $reference)->get();
            if($searchStatut->isEmpty()){
                throw new WazindoException("La référence du projet n'est pas valide. Veuillez réessayer");
          
            }
            $projetObj = $searchStatut->first();

            //next status
            $currentProjetStatutSearch = StatutProjet::where("id", "=", $projetObj->statut_projet_id)->get(); 
            if($currentProjetStatutSearch->isEmpty()){ //si current statu
                throw new WazindoException("Un statut actuel n'a pas été trouvé");
            }

            $nextProjectStatus = "";
            if($currentProjetStatutSearch->first()->code == ParamsFactory::$PROJECT_STATUS_PROPOSE){
                $nextProjectStatus = ParamsFactory::$PROJECT_STATUS_VALIDE_INIT;
            }
            if($currentProjetStatutSearch->first()->code == ParamsFactory::$PROJECT_STATUS_PUBLIE){
                $nextProjectStatus = ParamsFactory::$PROJECT_STATUS_EN_LIGNE;
            }
            
            // else{
            //     throw new WazindoException("Statut non trouvé. Erreur fatale");
            // }

            //statut object
            $searchProjetStatut = StatutProjet::where("code", "like", $nextProjectStatus)->get(); 
            if($searchProjetStatut->isEmpty()){
                throw new WazindoException("La mise à jour du statut du projet n'a pas abouti");
            }
            $statutProjetId = $searchProjetStatut->first()->id;

            //update project
            $projetObj->statut_projet_id = $statutProjetId;
            $projetObj->save();

            //update notification
            //$notification = new
                  
            return true;

            }
            catch (\Illuminate\Database\QueryException $ex) {
			
                throw $ex;
            }
            catch (\Exception $ex) {
                
                throw $ex;
            }
    }
	//end updateProjectStatus



}
