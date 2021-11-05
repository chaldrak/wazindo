<?php

namespace App\Services;

use App\Models\Profil;
use App\Models\User;
use App\Models\Projet;
use App\Models\Actualite;
use App\Models\Categorie;
use App\Models\FinancementSponsor;
use App\Models\TypePartage;
use App\Models\Commentaire;
use App\Models\PubSolidaire;
use App\Models\Sponsor;
use App\Models\Parametre;
use App\Models\VideoProjet;
use App\Models\ContrepartieProjet;
use App\Models\DetailListeDiffusionPorteur;
use App\Models\ModePaiement;
use App\Models\TypeContribution;
// use App\Services\OperationService;
use App\Exceptions\WazindoException;
use App\Helpers\Factory\ParamsFactory;
use App\Helpers\Carbon\Carbon;
use App\Models\Commune;
use App\Models\ContributionProjet;
use App\Models\Departement;
use App\Models\DetailDiffusion;
use App\Models\Diffusion;
use App\Models\Pay;
use App\Models\StatutProjet;
use App\Models\TypeOrganisation;
use App\Models\ListeDiffusionPorteur;
use App\Models\LigneFinanceProjet;
use App\Models\Message;
use DB;

class OperationService
{


    public function __construct()
    {
    }


    // create Contribution
    public function createContribution($projet_reference, $montant, $login, $mode_paiement_reference)
    {
        try {
            $searcher = new ParameterService();
            $code = "financiere";
            $createcontribution = new ContributionProjet();
            $createcontribution->contributeur_id = $searcher->getProfil($login)->id;
            $createcontribution->projet_id = $searcher->getProjet($projet_reference)->id;
            $createcontribution->montant = $montant;
            $createcontribution->type_contrib_id = $searcher->getTypeContribution($code)->id;
            $createcontribution->paiement_id = $searcher->getModePaiement($mode_paiement_reference)->id;
            $createcontribution->save();

            return array("status" => "success", "message" => "Merci de votre contribution !", "data" => "");
        } catch (WazindoException $e) {
            throw $e;
        } catch (\Exception $ex) {
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la contribution", "data" => "");
        }
    }
    // end of create Contribution


    // create Proposition Projet
    public function createPropositionProjet(
        $pays,
        $fileName,
        $type_organisation,
        $titre_projet,
        $email,
        $departement,
        $commune,
        $categorie,
        $montant_collecter,
        $duree_campagne,
        $description_projet,
        $contrepartie
    ) {
        try {

            //get profil by email
            $searchProfilByEmail = User::where("email", "=", $email)->get();
            if ($searchProfilByEmail->isEmpty()) {
                return array("status" => "error", "message" => "Cette adresse email n'existe pas", "data" => "");
            }
            $profilObj = $searchProfilByEmail->first();

            //search statut projet

            $statut_projet = ParamsFactory::$PROJECT_STATUS_PROPOSE;
            $searchStatut = StatutProjet::where("nom", "=", $statut_projet)
                ->get();
            if ($searchStatut->isEmpty()) {
                return array("status" => "error", "message" => "Ce statut de projet n'existe pas", "data" => "");
            }

            //got it
            $foundStatut = $searchStatut->first()->id;
            $projet = new Projet();

            $projet->statut_projet_id = $foundStatut;
            $projet->lien_document_projet = $fileName;
            $projet->type_organisation_id = $type_organisation;
            $projet->titre = $titre_projet;
            $projet->porteur_id = $profilObj->id;
            $projet->pays_id = $pays;
            $projet->mot_porteur = $description_projet;
            $projet->resume = '';
            $projet->categorie_id = $categorie;
            $projet->montant_a_collecte = $montant_collecter;
            $projet->montant_collecte = 0;
            $projet->duree_campagne = $duree_campagne;
            $projet->description = $description_projet;
            $projet->desc_contrepartie = $contrepartie;
            $projet->reference = "REF" . time();
            $projet->pays_id = $pays;

            if (trim($commune) != "") {
                $projet->commune_id = $commune;
            }

            $projet->save();

            return array("status" => "success", "message" => "Votre proposition de projet a été enregistrée avec succès.", "data" => "");
        } catch (WazindoException $e) {
            throw $e;
        } catch (\Exception $ex) {
            \Log::error($ex);

            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de proposition du projet", "data" => "");
        }
    }
    // end of create Proposition Projet

    //create Contribution Video
    public function createContributionVideo($projet_reference, $montant, $login, $video_reference)
    {
        try {
            $searcher = new ParameterService();
            $code = "video";
            $createcontribution = new ContributionProjet();
            $createcontribution->profil_id = $searcher->getProjet($projet_reference)->id;
            $createcontribution->montant = $montant;
            $createcontribution->projet_id = $searcher->getProfil($login)->id;
            $createcontribution->type_contrib_id = $searcher->getTypeContribution($code)->id;
            $createcontribution->video_id = $searcher->getVideo($video_reference)->id;
            $createcontribution->save();

            return array("status" => "success", "message" => "Merci de votre contribution !", "data" => "");
        } catch (WazindoException $e) {
            throw $e;
        } catch (\Exception $ex) {
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la contribution", "data" => "");
        }
    }
    // end of create Contribution Video


    //get stats published by categorie
    public function getStatsProjectPublishedByCategorie()
    {
        try {

            $statutProjetCode = ParamsFactory::$PROJECT_STATUS_PUBLIE;

            //TODO: pouvoir afficher 0 quand bien meme aucun projet naurait ete cree pr certaines categories

            /*$listData = DB::table('projet')
                ->join('categorie', 'categorie.id', 'projet.categorie_id')
                ->join('statut_projet', 'statut_projet.id', 'projet.statut_projet_id')
                ->where('statut_projet.code', '=', $statutProjetCode)
                ->select(
                     'categorie.id as id_categorie',
                     //DB::raw("select nom from categorie where id = projet.id "),
                    //'categorie.nom as nom_categorie',
                    //  'categorie.icone as icone_categorie',
                    DB::raw("count(projet.id) as total_projets")
                )
                ->groupBy('categorie.id')
                ->get();*/

                //get list of categories
                $categoriesList = Categorie::all();

                //get name and icon for each category
                $finalData = array();
                foreach($categoriesList as $categoryItem){

                    //get categorie object
                    $totalProjets = Projet::where('categorie_id', '=', $categoryItem->id)
									->count();

                    //var_dump($line->id_categorie);
                    $newLine = array(
                                "id"               => $categoryItem->id ,
                                "total_projets"    => $totalProjets ,
                                "nom_categorie"    => $categoryItem->nom,
                                "icone_categorie"  => $categoryItem->icone,
                    );

                    array_push($finalData, $newLine);
                }//end foreach

                //to be optimized

            return $finalData;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {
            throw $ex;
        }
    } //end getStatsProjectPublishedByCategorie

    //get group by code
    public static function getListContribution($projetId)
    {
        try {
            $getListContribution = ContributionProjet::where("projet_id", "=", $projetId)->get();

            return $getListContribution;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    } //end of get Group By Code


    // get List Actualites
    public static function getListActualites($projetId)
    {
        try {
            $getListActualite = Actualite::where("projet_id", "=", $projetId)->get();

            return $getListActualite;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get List Actualites

    // get List Commentaire
    public static function getListActualite($projetId)
    {
        try {
            $getListActualite = Actualite::all();


            return $getListActualite;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get List Commentaire

    // get List Commentaire
    public static function getListCommentaireLimit($projetId)
    {
        try {
            $getListCommentaire = Commentaire::where("projet_id", "=", $projetId)
            ->with("profil")
             ->latest()
                ->take(10)
                ->get();

            return $getListCommentaire;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get List Commentaire

    // get List Commentaire
    public static function getListCommission()
    {
        try {
            $nom = 'COMMISSION';

            $getListCommission = Parametre::where("code", "=", $nom)->get();

            
            return $getListCommission;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get List Commentaire

    // get List Commentaire
    public static function getListModePaiement()
    {
        try {

            $getListModePaiement = ModePaiement::all();

            
            return $getListModePaiement;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get List Commentaire

    
    // create Diffusion
    public static function editModePaiement($nom,$code,$id)
    {
        try {

            $searchCommission = ModePaiement::where("id", "like", $id)->get();

            if ($searchCommission->isEmpty()) {
                return array("status" => "error", "message" => "Vos identifiants sont inconrrects. Veuillez vous connecter puis réésayer à nouveau", "data" => "");
            } 

            $commissionObj = $searchCommission->first();
            $commissionObj->code = $code;
            $commissionObj->nom = $nom;
            $commissionObj->save();

            return array("status" => "success", "message" => "Votre mode de paiement a été mise à jour avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of create Diffusion
    
    // create Diffusion
    public static function createModePaiement($nom,$code)
    {
        try {

            $searchCommission = ModePaiement::where("nom", "like", $nom)->get();

            if (!$searchCommission->isEmpty()) {
                return array("status" => "error", "message" => "Ce nom est déjà utilisé veuillez corriger puis réésayer à nouveau", "data" => "");
            } 

            $searchPaiement = ModePaiement::where("code", "like", $code)->get();

            if (!$searchPaiement->isEmpty()) {
                return array("status" => "error", "message" => "Ce code est déjà utilisé veuillez corriger puis réésayer à nouveau", "data" => "");
            } 

            $newModePaiement = new ModePaiement();
            $newModePaiement->nom = $nom;
            $newModePaiement->code = $code;
            $newModePaiement->save();

            return array("status" => "success", "message" => "Votre mode de paiement a été enregistré avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of create Diffusion

       // delete Profil
       public function deleteModePaiement($id)
       {
   
           try {
               $searchFinance = ModePaiement::where("id", "=", $id)->get();
               if ($searchFinance->isEmpty()) {
                   return array("status" => "error", "message" => "Votre mode de paiement n'existe pas. Veuillez réessayer.", "data" => "");
               }
               $foundLigneFinance = $searchFinance->first();
   
               $foundLigneFinance->delete();
   
   
               return array("status" => "success", "message" => "Votre mode de paiement a été supprimé avec succès", "data" => "");
           } catch (\Illuminate\Database\QueryException $ex) {
   
               // throw $ex;
           } catch (\Exception $ex) {
               // throw $ex;
           }
       }
       

    // get List Commentaire
    public static function getListCategorie()
    {
        try {

            $getListModePaiement = Categorie::all();

            
            return $getListModePaiement;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get List Commentaire

    
    // create Diffusion
    public static function editCategorie($nom,$icone,$reference,$id)
    {
        try {

            $searchCommission = Categorie::where("id", "like", $id)->get();

            if ($searchCommission->isEmpty()) {
                return array("status" => "error", "message" => "Vos identifiants sont incorrects. Veuillez vous connecter puis réésayer à nouveau", "data" => "");
            } 

            $commissionObj = $searchCommission->first();
            $commissionObj->reference = $reference;
            $commissionObj->icone = $icone;
            $commissionObj->nom = $nom;
            $commissionObj->save();

            return array("status" => "success", "message" => "Votre mode de paiement a été mise à jour avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of create Diffusion
    

    ////// Sponsor ///////////////
    // create Diffusion
    public static function createSponsor($personne_reference, $adresse, $contact,$nom)
    {
        try {

            $newModePaiement = new Sponsor();
            $newModePaiement->nom = $nom;
            $newModePaiement->contact = $contact;
            $newModePaiement->personne_reference = $personne_reference;
            $newModePaiement->adresse = $adresse;
            $newModePaiement->save();

            return array("status" => "success", "message" => "Votre sponsor a été enregistré avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of create Diffusion
    
    // create Diffusion
    public static function editSponsor($id,$personne_reference, $adresse, $contact,$nom)
    {
        try {
            $searchSponsor = Sponsor::where("id", "like", $id)->get();

            if ($searchSponsor->isEmpty()) {
                return array("status" => "error", "message" => "Le sponsor n'existe pas veuillez réessayer", "data" => "");
            } 
            $sponsorObj = $searchSponsor->first();
            $sponsorObj->nom = $nom;
            $sponsorObj->contact = $contact;
            $sponsorObj->personne_reference = $personne_reference;
            $sponsorObj->adresse = $adresse;
            $sponsorObj->save();

            return array("status" => "success", "message" => "Votre sponsor a été mit à jour avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of create Diffusion
    
    // create Diffusion
    public static function getListSponsor()
    {
        try {
            $listSponsor = Sponsor::all();

            return array("status" => "success", "message" => "", "data" => $listSponsor);
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of create Diffusion

    
       // delete sponsor
       public function deleteSponsor($id)
       {
   
           try {
               $searchSponsor = Sponsor::where("id", "=", $id)->get();
               if ($searchSponsor->isEmpty()) {
                   return array("status" => "error", "message" => "Votre sponsor n'existe pas. Veuillez réessayer.", "data" => "");
               }
               $foundLigneFinance = $searchSponsor->first();
   
               $foundLigneFinance->delete();   
   
               return array("status" => "success", "message" => "Votre sponsor a été supprimé avec succès", "data" => "");
           } catch (\Illuminate\Database\QueryException $ex) {
   
               // throw $ex;
           } catch (\Exception $ex) {
               // throw $ex;
           }
       }
    
    // create Diffusion

    //////// End Sponsor ///////////////////

    public static function updateAfterVisualisation($id,$type)
    {
        try {
            $searchPartage = TypePartage::where("code", "like", $type)->get();

            if ($searchPartage->isEmpty()) {
                return array("status" => "error", "message" => "ce type de partage n'existe pas veuillez réessayer", "data" => "");
            } 
            $valeur = $searchPartage->first()->valeur;


            $searchPubSolidaire = PubSolidaire::where("id", "like", $id)->get();

            if ($searchPubSolidaire->isEmpty()) {
                return array("status" => "error", "message" => "cette publicité solidaire n'existe pas veuillez réessayer", "data" => "");
            } 
            $pubSolidaire = $searchPubSolidaire->first();
            $montant_visualisation = $searchPubSolidaire->first()->montant_visualisation;
            $total_vues = $searchPubSolidaire->first()->total_vues;

            $newMontant = $montant_visualisation + $valeur;
            $newVue = $total_vues + 1;

            $pubSolidaire->montant_visualisation = $newMontant;
            $pubSolidaire->total_vues = $newVue;
            $pubSolidaire->save();

            return array("status" => "success", "message" => "Votre publicité solidaire a été mise à jour avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end updateAfterVisualisation

    ////// Publicité solidaire ///////////////
  
    // create Diffusion
    public static function createPubSolidaire($lien_video,$montant_projet,$titre, $fileName, $description)
    {
        try {
            $valeuradmin = true;
            $searchUser = User::where("est_admin", "like", $valeuradmin)->get();

            if ($searchUser->isEmpty()) {
                return array("status" => "error", "message" => "ce profil n'existe pas veuillez réessayer", "data" => "");
            } 
            $created_by_id = $searchUser->first()->id;

            $newModePaiement = new PubSolidaire();
            $newModePaiement->lien_video = $lien_video;
            $newModePaiement->total_vues = 0;
            $newModePaiement->montant_projet = $montant_projet;
            $newModePaiement->titre = $titre;
            $newModePaiement->lien_image_projet = $fileName;
            $newModePaiement->description = $description;
            $newModePaiement->created_by_id = $created_by_id;
            $newModePaiement->save();

            return array("status" => "success", "message" => "Votre publicité solidaire a été mise à jour avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of create Diffusion
    
    // create Diffusion
    public static function editPubSolidaire($id,$lien_video,$montant_projet,$titre, $description)
    {
        try {
            $searchPubSolidaire = PubSolidaire::where("id", "like", $id)->get();

            if ($searchPubSolidaire->isEmpty()) {
                return array("status" => "error", "message" => "La publicité solidaire n'existe pas veuillez réessayer", "data" => "");
            } 
            $pubSolidaireObj = $searchPubSolidaire->first();
            $pubSolidaireObj->lien_video = $lien_video;
            $pubSolidaireObj->montant_projet = $montant_projet;
            $pubSolidaireObj->titre = $titre;
            $pubSolidaireObj->description = $description;
            $pubSolidaireObj->save();

            return array("status" => "success", "message" => "Votre publicité solidaire a été mise à jour avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of create Diffusion
    
    // create Diffusion
    public static function getListPubSolidaire()
    {
        try {
            $listSponsor = PubSolidaire::all();

            return array("status" => "success", "message" => "", "data" => $listSponsor);
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of create Diffusion

    
       // delete sponsor
       public function deletePubSolidaire($id)
       {
   
           try {
               $searchPubSolidaire = PubSolidaire::where("id", "=", $id)->get();
               if ($searchPubSolidaire->isEmpty()) {
                   return array("status" => "error", "message" => "Votre publicité solidaire n'existe pas. Veuillez réessayer.", "data" => "");
               }
               $foundLignesearchPubSolidaire = $searchPubSolidaire->first();
   
               $foundLignesearchPubSolidaire->delete();   
   
               return array("status" => "success", "message" => "Votre publicité solidaire a été supprimé avec succès", "data" => "");
           } catch (\Illuminate\Database\QueryException $ex) {
   
               // throw $ex;
           } catch (\Exception $ex) {
               // throw $ex;
           }
       }
    
    // create Diffusion

    //////// End publicité solidaire ///////////////////


    ////// Financement sponsor ///////////////
    // create Diffusion
    public static function createFinancementSponsor($sponsor_id,$pub_id,$montant_apport)
        {
        try {

            $searchSponsor = Sponsor::where("id", "like", $sponsor_id)->get();

            if ($searchSponsor->isEmpty()) {
                return array("status" => "error", "message" => "Ce sponsor n'existe pas. Veuillez réessayer", "data" => "");
            } 

            $searchPub = PubSolidaire::where("id", "like", $pub_id)->get();

            if ($searchPub->isEmpty()) {
                return array("status" => "error", "message" => "Cette publicité solidaire n'existe pas. Veuillez réessayer", "data" => "");
            } 

            $newModePaiement = new FinancementSponsor();
            $newModePaiement->sponsor_id = $sponsor_id;
            $newModePaiement->pub_id = $pub_id;
            $newModePaiement->montant_apport = $montant_apport;
            $newModePaiement->save();

            return array("status" => "success", "message" => "Votre publicité solidaire a été mise à jour avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end createFinancementSponsor
    
    // create Diffusion
    public static function editFinancementSponsor($id,$sponsor_id,$pub_id,$montant_apport)
    {
        try {

            $searchSponsor = Sponsor::where("id", "like", $sponsor_id)->get();

            if ($searchSponsor->isEmpty()) {
                return array("status" => "error", "message" => "Ce sponsor n'existe pas. Veuillez réessayer", "data" => "");
            } 

            $searchPub = PubSolidaire::where("id", "like", $pub_id)->get();

            if ($searchPub->isEmpty()) {
                return array("status" => "error", "message" => "Cette publicité solidaire n'existe pas. Veuillez réessayer", "data" => "");
            } 

            $searchFinancementSponsor = FinancementSponsor::where("id", "like", $id)->get();

            if ($searchFinancementSponsor->isEmpty()) {
                return array("status" => "error", "message" => "Le financement sponsor n'existe pas veuillez réessayer", "data" => "");
            } 
            $FinancementSponsorObj = $searchFinancementSponsor->first();
            $FinancementSponsorObj->sponsor_id = $sponsor_id;
            $FinancementSponsorObj->pub_id = $pub_id;
            $FinancementSponsorObj->montant_apport = $montant_apport;
            $FinancementSponsorObj->save();

            return array("status" => "success", "message" => "Votre financement sponsor a été mit à jour avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of create Diffusion
    
    // create Diffusion
    public static function getListFinancementSponsor()
    {
        try {
            $listSponsor = FinancementSponsor::with('sponsor', 'pub_solidaire')->get();

            return array("status" => "success", "message" => "", "data" => $listSponsor);
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of create Diffusion

    
       // delete sponsor
       public function deleteFinancementSponsor($id)
       {
   
           try {
               $searchFinancementSponsor = FinancementSponsor::where("id", "=", $id)->get();
               if ($searchFinancementSponsor->isEmpty()) {
                   return array("status" => "error", "message" => "Votre financement sponsor n'existe pas. Veuillez réessayer.", "data" => "");
               }
               $foundLignesearchFinancementSponsor = $searchFinancementSponsor->first();
   
               $foundLignesearchFinancementSponsor->delete();   
   
               return array("status" => "success", "message" => "Votre financement sponsor a été supprimé avec succès", "data" => "");
           } catch (\Illuminate\Database\QueryException $ex) {
   
               // throw $ex;
           } catch (\Exception $ex) {
               // throw $ex;
           }
       }
    
    // create Diffusion

    //////// End Financement sponsor ///////////////////

    // create Diffusion
    public static function getListSoutienSolidaire()
    {
        try {
            $listSponsor = FinancementSponsor::with('pub_solidaire')->get();

            return array("status" => "success", "message" => "", "data" => $listSponsor);
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end getListSoutienSolidaire

    public static function createCategorie($nom,$icone,$reference)
    {
        try {

            $searchCommission = Categorie::where("nom", "like", $nom)->get();

            if (!$searchCommission->isEmpty()) {
                return array("status" => "error", "message" => "Ce nom est déjà utilisé veuillez corriger puis réésayer à nouveau", "data" => "");
            } 

            $newModePaiement = new Categorie();
            $newModePaiement->nom = $nom;
            $newModePaiement->reference = $reference;
            $newModePaiement->icone = $icone;
            $newModePaiement->save();

            return array("status" => "success", "message" => "Votre catégorie a été enregistrée avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of create Diffusion

       // delete Profil
       public function deleteCategorie($id)
       {
   
           try {
               $searchFinance = Categorie::where("id", "=", $id)->get();
               if ($searchFinance->isEmpty()) {
                   return array("status" => "error", "message" => "Votre catégorie n'existe pas. Veuillez réessayer.", "data" => "");
               }
               $foundLigneFinance = $searchFinance->first();
   
               $foundLigneFinance->delete();
   
   
               return array("status" => "success", "message" => "Votre catégorie a été supprimée avec succès", "data" => "");
           } catch (\Illuminate\Database\QueryException $ex) {
   
               // throw $ex;
           } catch (\Exception $ex) {
               // throw $ex;
           }
       }


    // get List Commentaire
    public static function getListCommentaire($projetId)
    {
        try {
            $getListCommentaire = Commentaire::where("projet_id", "=", $projetId)
            ->with("profil")
            ->get();

            return $getListCommentaire;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get List Commentaire

    //get list projects
    public function getListProject()
    {
        try {

            $publishedProjectStatus = ParamsFactory::$PROJECT_STATUS_PUBLIE;
            $searchProjetStatut = StatutProjet::where("code", "like", $publishedProjectStatus)->get();
            if ($searchProjetStatut->isEmpty()) {
                throw new WazindoException("La mise à jour du statut du projet n'a pas abouti");
            }
            $statutProjetId = $searchProjetStatut->first()->id;

            \Log::error($statutProjetId);


            $listProject = Projet::where("statut_projet_id", "=", $statutProjetId)->with("profil")->get();

            return $listProject;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of list projects

    //get stats
    public static function getStatsByProjet($projet)
    {
        try {
            \Log::error($projet);
            $searchProject = Projet::where('reference', 'like', $projet)->get();

            if ($searchProject->isEmpty()) {
                return array("status" => "error", "message" => "Les informations sur le projet ne sont pas correct. Veuillez réesayer", "data" => "");
            } else {
                \Log::error($projet);

                $montant_total = $searchProject->first()->montant_a_collecte;
                $projetId = $searchProject->first()->id;
            }

            $summontant = ContributionProjet::where('projet_id', 'like', $projetId)->sum('montant');
            $nombrecontribution = ContributionProjet::where('projet_id', 'like', $projetId)->count();

            $stats = array("montant_projet" => $montant_total, "montant_total_contribution" => $summontant, "nombre_de_contribution" => $nombrecontribution);
            return $stats;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    } //end of getStatsByProjet


    //get stats
    public static function getListProjetStats()
    {
        try {
            $listProjet = Projet::all();
            $i = 0;
            $projet = array();
            foreach ($listProjet as $list) {

                $summontant = ContributionProjet::where('projet_id', 'like', $list['id'])->sum('montant');
                $nombrecontribution = ContributionProjet::where('projet_id', 'like', $list['id'])->count();
                $projet[$i] = ["titre" => $list['titre'], "montant_projet" => $list['montant_a_collecte'], "montant_total_contribution" => $summontant, "nombre_de_contribution" => $nombrecontribution];
                $i++;
            }

            return $projet;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    } //end of getListProjetStats


    //get stats
    public static function getListProjetCommissionStats($dateDebut,$dateFin,$projet)
    {
        try {
           
  //check if email already used
  $val = 0;
  $listProjet = Projet::with("categorie")->where("id","!=",$val);

  if ($projet) {

      $listProjet =  $listProjet -> where("id","=",$projet);
  }
  if ($dateFin) {

      $listProjet = $listProjet -> where("created_at","<=",$dateFin);
  }
  if ($dateDebut) {

      $listProjet = $listProjet -> where("created_at",">=",$dateDebut);
  }  

  return $listProjet -> get();

// \Log::error($listProjet);

            // $i = 0;
            // $projet = array();
            // foreach ($listProjet as $itemProjet) {
            //     $summontant = $itemProjet['montant_collecte'] *($commissionValeur/100);
            //     $projet[$i] = ["titre" => $itemProjet['titre'], "montant_projet" => $itemProjet['montant_a_collecte'], "montant_commission" => $summontant, "valeur_commission" => $commissionValeur];
            //     $i++;
            // }

            return $projet;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    } //end of getListProjetStats

    //get stats
    public static function getStats()
    {
        try {

            $countproject = Projet::whereRaw('montant_collecte >= montant_a_collecte')->count();
            $summontant = Projet::whereRaw('montant_collecte >= montant_a_collecte')->sum('montant_collecte');
            $nombreMembres = User::count();
            $stats = array("nombre_membres" => $nombreMembres, "total_projets_finances" => $countproject, "montant_total_leve" => $summontant);
            return $stats;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of stats

    //get List Project By Categories
    public static function getListProjectByCategories()
    {
        try {

            // $idCats=Categorie::select('id','nom as nom_categorie','reference')->get();
            // dd($idCats);

            // foreach ($idCats as $cats)
            // {
            //     $cats['nombre_projets']=Projet::where('projet.categorie_id',$cats['id'])->count();
            // }


            // foreach ($idCats as $cats) {
            //     $projects=new OperationService()->getListProject($cats['id']);
            //     $j=0;
            //     $projects_sorted=array();
            //     if($cats['nombre_projets']!=0)
            //     {
            //         foreach($projects as $project)
            //     {
            //         $auteur=Profil::where('profil.id',$project['porteur_id'])->select('nom','prenom')->first();
            //         $projects_sorted[$j]=array('reference'=>$project['reference'],'titre'=>$project['titre'],
            //         'description'=>$project['description'],'resume'=>$project['resume'],'auteur'=>'Unicef',
            //         'image'=>$project['photo_mini'],'categorie'=>$cats['montant_a_collecte'],
            //         'porteur'=>$auteur['nom'].' '.$auteur['prenom'],'montant_a_collecter'=>$project['montant_a_collecte']);
            //          $j++;
            //     }
            //     }

            //     $list[$i]=array('nom_categorie'=>$cats['nom_categorie'],'reference'=>$cats['reference'],
            //     'nombre_projets'=>$cats['nombre_projets'],"projets"=>$projects_sorted);
            //     $i++;
            // }

            $service = new OperationService();
            $listProjects = $service->getListProject();


            return array("status" => "success", "message" => "", "data" => $listProjects);
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get List Project By Categories


    //get List Commune By Departement
    public static function getListCommuneByDepartement($idDepartement)
    {
        try {
            $searchDepartement = Departement::where("id", "like", $idDepartement)->get();

            if ($searchDepartement->isEmpty()) {
                return array("status" => "error", "message" => "Les informations sur le departement ne sont pas correct. Veuillez réesayer", "data" => "");
            } else {
                $departementId = $searchDepartement->first()->id;
            }

            $searchCommune = Commune::where("departement_id", "like", $departementId)->get();


            return array("status" => "success", "message" => "", "data" => $searchCommune);
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get List Commune By Departement

    // get List Departement Country
    public static function getListDepartementCountry($nom)
    {
        try {
            $searchPays = Pay::where("nom", "like", $nom)->get();

            if ($searchPays->isEmpty()) {
                return array("status" => "error", "message" => "Les informations sur le pays ne sont pas correct. Veuillez réesayer", "data" => "");
            } else {
                $paysId = $searchPays->first()->id;
            }

            $searchDepartement = Departement::where("pays_id", "like", $paysId)->get();


            return array("status" => "success", "message" => "", "data" => $searchDepartement);
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    } //end of get List Departement Country





    //get Organisation Projet
    public static function getOrganisationProjet()
    {
        try {

            $searchOrganisation = TypeOrganisation::all();


            return array("status" => "success", "message" => "", "data" => $searchOrganisation);
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get Organisation Projet


    // get Categorie Projet
    public static function getCategorieProjet()
    {
        try {

            $searchCategorie = Categorie::all();


            return array("status" => "success", "message" => "", "data" => $searchCategorie);
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get Categorie Projet


    //get List Contribution By Projet
    public static function getListContributionByProfil($email)
    {
        try {

            $searchProfil = User::where("email", "like", $email)->get();

            if ($searchProfil->isEmpty()) {
                return array("status" => "error", "message" => "Les informations sur le profil sont incorrects. Veuillez réesayer", "data" => "");
            } else {
                $profilId = $searchProfil->first()->id;
            }

            $searchContribution = ContributionProjet::where("contributeur_id", "like", $profilId)->get();


            return array("status" => "success", "message" => "", "data" => $searchContribution);
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get List Contribution By Projet


    //get List Contribution By Projet
    public static function getListContributionByProjet($email)
    {
        try {
\Log::error($email);
            $searchProfil = User::where("email", "like", $email)->get();

            if ($searchProfil->isEmpty()) {
                return array("status" => "error", "message" => "Les informations sur le projet sont incorrects. Veuillez réesayer", "data" => "");
            } else {
                $profilId = $searchProfil->first()->id;
            }

            $searchContribution = ContributionProjet::where("contributeur_id", "like", $profilId)->with('projet', 'paiement.mode_paiement')->get();


            return array("status" => "success", "message" => "", "data" => $searchContribution);
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get List Contribution By Projet


    //get List Diffusion
    public static function getListDiffusion($email_address)
    {
        try {

            $searchUser = User::where("email", "like", $email_address)->get();

            if ($searchUser->isEmpty()) {
                return array("status" => "error", "message" => "Vos identifiants sont incorrects. Veuillez vous connecter puis réésayer à nouveau", "data" => "");
            } else {
                $userId = $searchUser->first()->id;
            }

            $searchDiffusion = ListeDiffusionPorteur::where("profil_id", "like", $userId)->get();


            return array("status" => "success", "message" => "", "data" => $searchDiffusion);
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get List Diffusion

    //get List Diffusion
    public static function getListMessage($email, $projet)
    {
        try {

            $searchUser = User::where("email", "like", $email)->get();

            if ($searchUser->isEmpty()) {
                return array("status" => "error", "message" => "Vos identifiants sont incorrects. Veuillez vous connecter puis réésayer à nouveau", "data" => "");
            } else {
                $userId = $searchUser->first()->id;
            }

            if ($projet !== null) {
                $searchProjet = Projet::where("reference", "like", $projet)->get();

                if ($searchProjet->isEmpty()) {
                    return array("status" => "error", "message" => "Les identifiants du projet sont incorrects. Veuillez réésayer à nouveau", "data" => "");
                } else {
                    $projetId = $searchProjet->first()->id;
                }
                $searchDiffusion = Message::where("porteur_id", "like", $userId)
                    ->where("projet_id", "like", $projetId)
                    ->with("projet")
                    ->get();
            } else {
                $searchDiffusion = Message::where("porteur_id", "like", $userId)->get();
            }

            return array("status" => "success", "message" => "", "data" => $searchDiffusion);
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get List Diffusion

    //get List Diffusion
    public static function saveListeDiffusion($email, $contact, $nom_contact, $nombre_contact)
    {
        try {

            $searchUser = User::where("email", "like", $email)->get();

            if ($searchUser->isEmpty()) {
                return array("status" => "error", "message" => "Vos identifiants sont incorrects. Veuillez vous connecter puis réésayer à nouveau", "data" => "");
            } else {
                $userId = $searchUser->first()->id;
            }
            $newDiffusion = new ListeDiffusionPorteur();
            $newDiffusion->nom = $nom_contact;
            $newDiffusion->nombre_contact = $nombre_contact;
            $newDiffusion->profil_id = $userId;
            $newDiffusion->save();

            foreach ($contact as $detail) {
                $newDetailDiffusion = new DetailListeDiffusionPorteur();
                $newDetailDiffusion->nom = $detail['nom'];
                $newDetailDiffusion->telephone = $detail['telephone'];
                $newDetailDiffusion->email = $detail['email'];
                $newDetailDiffusion->liste_diffusion_porteur_id = $newDiffusion->id;
                $newDetailDiffusion->save();
            }

            return array("status" => "success", "message" => "Votre liste de diffusion a été crée avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get List Diffusion


    // create Diffusion
    public static function createDiffusion($nom_diffusion, $id, $details_diffusion)
    {
        try {

            $searchUser = User::where("id", "like", $id)->get();

            if ($searchUser->isEmpty()) {
                return array("status" => "error", "message" => "Vos identifiants sont inconrrects. Veuillez vous connecter puis réésayer à nouveau", "data" => "");
            } else {
                $userId = $searchUser->first()->id;
            }
            $searchNameDiffusion = User::where("nom", "like", $nom_diffusion)->get();
            if (!$searchNameDiffusion->isEmpty()) {
                return array("status" => "error", "message" => "Ce nom de diffusion existe déjà !", "data" => "");
            }

            $newDiffusion = new Diffusion();
            $newDiffusion->nom = $nom_diffusion;
            $newDiffusion->save();


            foreach ($details_diffusion as $detail) {
                if ($detail['est_telephone'] === true) {
                    $searchProfile = DetailDiffusion::where("telephone", "like", $detail['est_telephone'])
                        ->where('diffusion_id', 'like', $newDiffusion->id)->get();
                    if (!$searchProfile->isEmpty()) {
                        return array("status" => "error", "message" => "Ce numéro de téléphone existe déjà !", "data" => "");
                    }
                } else {
                    $searchProfile = DetailDiffusion::where("adresse_mail", "like", $detail['email'])
                        ->where('diffusion_id', 'like', $newDiffusion->id)->get();
                    if (!$searchProfile->isEmpty()) {
                        return array("status" => "error", "message" => "Cette adresse_mail existe déjà !", "data" => "");
                    }
                }
                $newDetailDiffusion = new DetailDiffusion();
                $newDetailDiffusion->nom = $detail['nom_contact'];
                $newDetailDiffusion->telephone = $detail['telephone'];
                $newDetailDiffusion->adresse_email = $detail['email'];
                $newDetailDiffusion->diffusion_id = $newDiffusion->id;
                $newDetailDiffusion->est_telephone = $detail['est_telephone'];
                $newDetailDiffusion->save();
            }

            return array("status" => "success", "message" => "Votre liste de diffusion a été crée avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of create Diffusion


    // create Diffusion
    public static function updateCommission($valeur,$libelle, $id)
    {
        try {

            $searchCommission = Parametre::where("id", "like", $id)->get();

            if ($searchCommission->isEmpty()) {
                return array("status" => "error", "message" => "Vos identifiants sont inconrrects. Veuillez vous connecter puis réésayer à nouveau", "data" => "");
            } 

            $commissionObj = $searchCommission->first();
            $commissionObj->code = $libelle;
            $commissionObj->valeur = $valeur;
            $commissionObj->save();

            return array("status" => "success", "message" => "Votre commission a été mise à jour avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of create Diffusion


    // create Diffusion
    public static function createCommentaire($commente_par_id, $contenu, $projet_id)
    {
        try {

            $searchUser = User::where("email", "like", $commente_par_id)->get();

            if ($searchUser->isEmpty()) {
                return array("status" => "error", "message" => "Vos identifiants sont inconrrects. Veuillez vous connecter puis réésayer à nouveau", "data" => "");
            }
            $userId = $searchUser->first()->id;
            $dateCommentaire = Carbon::now();
            $commentaire = new Commentaire();
            $commentaire->commente_par_id = $userId;
            $commentaire->contenu = $contenu;
            $commentaire->projet_id = $projet_id;
            $commentaire->date_commentaire = $dateCommentaire;
            $commentaire->save();



            return array("status" => "success", "message" => "Votre commentaire a été crée avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of create Diffusion


    // create Diffusion
    public static function createActualite($titre, $description, $projet_id)
    {
        try {

            $dateActualite = Carbon::now();
            $actu = new Actualite();
            $actu->titre = $titre;
            $actu->description = $description;
            $actu->projet_id = $projet_id;
            $actu->date_actualite = $dateActualite;
            $actu->save();



            return array("status" => "success", "message" => "Votre actualité a été crée avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of create Diffusion


    // create Message
    public static function saveMessage($projet, $titre, $description, $porteur)
    {
        try {

            \Log::error($porteur);

            $searchUser = User::where("email", "like", $porteur)->get();

            if ($searchUser->isEmpty()) {
                return array("status" => "error", "message" => "Vos identifiants sont inconrrects. Veuillez vous connecter puis réésayer à nouveau", "data" => "");
            }
            $userId = $searchUser->first()->id;

            $searchProjet = Projet::where("reference", "like", $projet)->get();

            if ($searchProjet->isEmpty()) {
                return array("status" => "error", "message" => "Les identifiants du projet sont inconrrects. Veuillez vous connecter puis réésayer à nouveau", "data" => "");
            }
            $projetId = $searchProjet->first()->id;
            $dateMessage = Carbon::now();
            $message = new Message();
            $message->titre = $titre;
            $message->description = $description;
            $message->porteur_id = $userId;
            $message->projet_id = $projetId;
            $message->date_envoi = $dateMessage;
            $message->save();

            return array("status" => "success", "message" => "Votre message a été enregistré avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of create message




    // get List Project By User
    public static function getListProjectByUser($emailAddress, $statut)
    {
        try {
            $userId = 0;
            $searchProjet = array();

            //check
            if ($statut === '' || $statut === null) {
                $searchUser = User::where("email", "like", $emailAddress)->get();
                if ($searchUser->isEmpty()) {
                    throw new WazindoException("Impossible de récupérer le porteur de ce projet");
                } else {
                    $userId = $searchUser->first()->id;
                }
                $searchProjet = Projet::where("porteur_id", "=", $userId)->with("statut_projet")->get();
            } else {
                //get statut
                $statutId = 0;
                $searchStatut = StatutProjet::where("nom", "like", $statut)->get();
                if ($searchStatut->isEmpty()) {
                    throw new WazindoException("Paramètres de statut incorrect");
                } else {
                    $statutId = $searchStatut->first()->id;
                }

                //get profile
                $id = 0;
                $searchUser = User::where("id", "=", $id)->get();
                if ($searchUser->isEmpty()) {
                    throw new WazindoException("Paramètres incorrects");
                } else {
                    $userId = $searchUser->first()->id;
                }

                $searchProjet = Projet::where("porteur_id", "=", $userId)
                    ->where("statut_projet_id", "like", $statutId)->with("statut_projet", "profil")
                    ->get();
            }

            return array("status" => "success", "message" => "", "data" => $searchProjet);
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get List Project By User



    //get List Contributeur By Projet
    public static function getListContributeurByProjet($id)
    {
        try {

            $searchProjet = Projet::where("id", "like", $id)->get();

            if ($searchProjet->isEmpty()) {
                return array("status" => "error", "message" => "Vos données sur le projet sélectionné ne sont pas correctes. Veuillez réesayer.", "data" => "");
            } else {
                $projetId = $searchProjet->first()->id;
            }

            $searchprojetByContributeur = ContributionProjet::where("projet_id", "like", $projetId)->with('projet', 'profil', 'paiement')->get();


            return array("status" => "success", "message" => "", "data" => $searchprojetByContributeur);
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get List Contributeur By Projet

    //get List Latest Project
    public static function getListPorteurProjet()
    {
        try {

            $listData = User::all();
            return $listData;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end get List Latest Project

    //get List Latest Project
    public static function getListLatestProject()
    {
        try {
            $listProject = Projet::with('profil')->latest()
                ->take(5)->get();
            return $listProject;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end get List Latest Project


    //get List published Project
    public static function getListLatestPublishedProject($categorie, $nom_projet, $pays, $nom_porteur, $montant_maximum, $montant_minimum, $date_de_debut, $date_de_fin)
    {
        try {

            //get project status
            $statutId = 0;
            $statutProject = ParamsFactory::$PROJECT_STATUS_PUBLIE;
            $searchStatut = StatutProjet::where("nom", "like", $statutProject)->get();
            if ($searchStatut->isEmpty()) {
                throw new WazindoException("Le statut indiqué n'est pas valide");
            } else {
                $statutId = $searchStatut->first()->id;
            }

            //
            $listProject = Projet::where("statut_projet_id", "=", $statutId);

            if ($categorie) {

                $listProject = $listProject->where("categorie_id", "=", $categorie);
            }

            if ($pays) {

                $listProject = $listProject->where("pays_id", "=", $pays);
            }

            return $listProject->with("profil", 'categorie', 'pays')->take(30)->get();
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end get List published Project


    //get List published Project
    public static function PaymentServiceContribution($projetid,$email, $reference, $montant)
    {
        try {
            //get project status
            $searchContributeur = User::where("email", "like", $email)->get();
            if ($searchContributeur->isEmpty()) {
                throw new WazindoException("Le profil indiqué n'est pas valide");
            } else {
                $contributeurId = $searchContributeur->first()->id;
            }

            //get project status
            $searchProjet = Projet::where("id", "like", $projetid)->get();
            if ($searchProjet->isEmpty()) {
                throw new WazindoException("Le statut indiqué n'est pas valide");
            } else {
                $projetObj = $searchProjet->first();
            }
            $montantTotal = $projetObj->montant_collecte + $montant;
            $projetObj->montant_collecte = $montantTotal;
            $projetObj->save();

            $saveContribution = new ContributionProjet();
            $saveContribution->contributeur_id = $contributeurId;
            $saveContribution->projet_id = $projetid;
            $saveContribution->montant = $montant;
            $saveContribution->est_public = true;
            $saveContribution->transaction_id = $reference;
            $saveContribution->date_contrib = Carbon::now();
            $saveContribution->save();
            return array("status" => "success", "message" => "La transaction a été créee avec succès", "data" => "");

        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end get List published Project


    //create Pubs
    public function createPubs($titre, $description, $projet_reference, $login)
    {
        try {


            $searcher = new ParameterService();
            $found_id = $searcher->getProjet($projet_reference);
            $createpub = new VideoProjet();
            $createpub->titre = $titre;
            $createpub->projet_id = $found_id['id'];
            $createpub->description = $description;
            $createpub->save();

            return array("status" => "success", "message" => "La publicité a été créee avec succès", "data" => "");
        } catch (WazindoException $e) {
            throw $e;
        } catch (\Illuminate\Database\QueryException $ex) {
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la publicité", "data" => "");
        }
    }
    // end create Pubs

    // get List Latest Pubs
    public static function getListLatestPubs()
    {

        try {
            $listVideo = VideoProjet::latest()->take(5)->get();
            $i = 0;
            $videos = array();
            foreach ($listVideo as $list) {
                $videos[$i] = ["reference" => $list['reference'], "titre" => $list['titre'], "nombre_vues" => "1000", "nombre_partages" => "10", "montant_collecte" => "100000", "jour_restant" => "7",  "finance_par" => "UNICEF"];
                $i++;
            }

            return $videos;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }

    public static function getListPubs()
    {
        try {
            $listVideo = VideoProjet::all();
            $i = 0;
            $videos = array();
            foreach ($listVideo as $list) {
                $videos[$i] = ["reference" => $list['reference'], "titre" => $list['titre'], "nombre_vues" => "1000", "nombre_partages" => "10", "montant_collecte" => "100000", "jour_restant" => "7",  "finance_par" => "UNICEF"];
                $i++;
            }

            return $videos;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    // end get List Latest Pubs

    //get Projects Categories
    public static function getProjectsCategories()
    {
        try {
            // récupération des catégories
            $searchCategories = Categorie::get();

            //ajout du nombre de projet par catégorie
            foreach ($searchCategories as $cats) {
                $cats['nombre_projets'] = Projet::where('projet.categorie_id', $cats['id'])->count();
            }

            return array("status" => "success", "message" => "", "data" => $searchCategories);
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get Projects Categories

    // get Lastest Projects
    public static function getLastestProjects()
    {
        try {
            // récupération des 6 dernier projet
            $searchLastestProjects = Projet::orderBy("id")->take(6)->with("profil")->get();

            return array("status" => "success", "message" => "", "data" => $searchLastestProjects);
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of get Lastest Projects



    //reject project 
    public static function rejectProject($emailAddress, $projectReference)
    {
        try {
            //check user
            $searchUser = User::orderBy("id")->take(6)->with("profil")->get();

            //check project

            //set project status

            return array("status" => "success", "message" => "", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of reject Project



    //update project 
    public static function updateStatusProjet($reference, $email_address)
    {
        try {


            $searchStatut = Projet::where("reference", "like", $reference)->get();
            if ($searchStatut->isEmpty()) {
                throw new WazindoException("La référence du projet n'est pas valide. Veuillez réessayer");
            }
            $projetObj = $searchStatut->first();


            //next status
            $currentProjetStatutSearch = StatutProjet::where("id", "=", $projetObj->statut_projet_id)->get();
            if ($currentProjetStatutSearch->isEmpty()) { //si current statu
                throw new WazindoException("le statut actuel n'a pas été trouvé");
            }

            $nextProjectStatus = "";
            if ($currentProjetStatutSearch->first()->code === ParamsFactory::$PROJECT_STATUS_VALIDE_INIT) {
                $nextProjectStatus = ParamsFactory::$PROJECT_STATUS_PUBLIE; //PROJECT_STATUS_EN_LIGNE
            } else {
                return array("status" => "error", "message" => "Vous ne pouvez pas mettre à jour le statut de votre projet", "data" => "");
            }

            $searchProjetStatut = StatutProjet::where("code", "like", $nextProjectStatus)->get();
            if ($searchProjetStatut->isEmpty()) {
                throw new WazindoException("La mise à jour du statut du projet n'a pas abouti");
            }

            $statutProjetId = $searchProjetStatut->first()->id;

            //update project
            $projetObj->statut_projet_id = $statutProjetId;
            $projetObj->save();

            return array("status" => "success", "message" => "Vous avez mis à jour le statut de votre projet avec succès", "data" => "");
        } catch (WazindoException $e) {
            throw $e;
        } catch (\Exception $ex) {
            \Log::error($ex);

            return array("status" => "error", "message" => "Une erreur est survenue lors de la mise à jour du statut du projet", "data" => "");
        }
    }
    //end of update Project


    //update project 
    public static function updateBibliographie($phone, $porteur, $biographie, $youtube, $reference, $twitter, $residence, $linkedln, $facebook, $email)
    {
        try {


            $searchProjet = Projet::where("reference", "like", $reference)->get();
            if ($searchProjet->isEmpty()) {
                throw new WazindoException("La référence du projet n'est pas valide. Veuillez réessayer");
            }
            $projetObj = $searchProjet->first();

            //update project
            $projetObj->url_twitter = $twitter;
            $projetObj->url_facebook = $facebook;
            $projetObj->url_youtube = $youtube;
            $projetObj->url_linkedin = $linkedln;
            $projetObj->bibliographie = $biographie;
            $projetObj->adresse = $residence;
            $projetObj->telephone = $phone;
            $projetObj->adresse_email = $email;
            $projetObj->save();


            $searchProfil = User::where("email", "like", $porteur)->get();
            if ($searchProfil->isEmpty()) {
                throw new WazindoException("Le porteur du projet n'est pas valide. Veuillez réessayer");
            }
            $profilObj = $searchProfil->first();
            $profilObj->url_twitter = $twitter;
            $profilObj->url_facebook = $facebook;
            $profilObj->url_youtube = $youtube;
            $profilObj->url_linkedin = $linkedln;
            $profilObj->bibliographie = $biographie;
            $profilObj->save();

            return array("status" => "success", "message" => "Vous avez mis à jour le statut de votre bibliographie avec succès", "data" => "");
        } catch (WazindoException $e) {
            throw $e;
        } catch (\Exception $ex) {
            \Log::error($ex);

            return array("status" => "error", "message" => "Une erreur est survenue lors de la mise à jour du statut du projet", "data" => "");
        }
    }
    //end of update Project


    //update project 
    public static function updateProject($categorie, $description_projet, $duree_campagne, $email, $montant_collecter, $pays, $reference, $resume, $titre_projet, $type_organisation)
    {
        try {

            //get profil by email
            $searchProfilByEmail = User::where("email", "=", $email)->get();
            if ($searchProfilByEmail->isEmpty()) {
                return array("status" => "error", "message" => "Cette adresse email n'existe pas", "data" => "");
            }
            $profilObj = $searchProfilByEmail->first();

            \Log::error($reference);

            //search projet
            $searchProjectByEmail = Projet::where("reference", "=", $reference)->get();
            if ($searchProjectByEmail->isEmpty()) {
                return array("status" => "error", "message" => "Cette reference de projet n'existe pas", "data" => "");
            }
            $profilObj = $searchProjectByEmail->first();

            //update projet

            $profilObj->categorie_id = $categorie;
            $profilObj->description = $description_projet;
            $profilObj->duree_campagne = $duree_campagne;
            $profilObj->montant_a_collecte = $montant_collecter;
            $profilObj->resume = $resume;
            $profilObj->titre = $titre_projet;
            $profilObj->type_organisation_id = $type_organisation;

            $profilObj->save();

            return array("status" => "success", "message" => "Votre projet a été mis a jour avec avec succès.", "data" => "");
        } catch (WazindoException $e) {
            throw $e;
        } catch (\Exception $ex) {
            \Log::error($ex);

            return array("status" => "error", "message" => "Une erreur est survenue lors de la mise à jour du projet", "data" => "");
        }
    }
    //end of update Project

    //create ligne finance
    public function createLigneFinance($projet, $ligne_finance, $montant, $commentaire, $date_mise_en_oeuvre, $deadline)
    {
        try {
            $date_mise_oeuvre_format = ParamsFactory::convertToDateTime($date_mise_en_oeuvre);
            $deadline_format = ParamsFactory::convertToDateTime($deadline);
            \Log::error($date_mise_oeuvre_format);
            \Log::error($deadline_format);

            $lignecreate = new LigneFinanceProjet();
            $lignecreate->ligne_finance = $ligne_finance;
            $lignecreate->montant = $montant;
            $lignecreate->commentaire = $commentaire;
            $lignecreate->projet_id = $projet;
            $lignecreate->date_mise_en_oeuvre = $date_mise_oeuvre_format;
            $lignecreate->deadline = $deadline_format;
            $lignecreate->save();

            return array("status" => "success", "message" => "La ligne de finance a été créee avec succès", "data" => "");
        } catch (WazindoException $e) {
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la ligne de finance", "data" => "");


            throw $e;
        } catch (\Exception $ex) {
            \Log::error($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la ligne de finance", "data" => "");
        }
    }
    // end createLigneFinance

    //get list ligne finance by projet
    public function getListLigneFinance($id)
    {
        try {


            $ListLigneFinance = LigneFinanceProjet::where("projet_id", "=", $id)->get();
            \Log::error($ListLigneFinance);

            return $ListLigneFinance;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {
            \Log::error($ex);
            throw $ex;
        }
    } //end of get list ligne finance by projet


    // delete Profil
    public function deleteListFinance($id)
    {

        try {
            $searchFinance = LigneFinanceProjet::where("id", "=", $id)->get();
            if ($searchFinance->isEmpty()) {
                return array("status" => "error", "message" => "Votre ligne de finance n'existe pas. Veuillez réessayer.", "data" => "");
            }
            $foundLigneFinance = $searchFinance->first();

            $foundLigneFinance->delete();


            return array("status" => "success", "message" => "Votre ligne de finance a été supprimée avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            // throw $ex;
        } catch (\Exception $ex) {
            // throw $ex;
        }
    }


    //create ligne finance
    public function createContrepartie($fileName, $projet, $description, $montant, $quantite_limite, $date_de_livraison)
    {
        try {
            $qte_totale = 0;
            $qte_cde = 0;
            $contrepartiecreate = new ContrepartieProjet();
            $contrepartiecreate->description = $description;
            $contrepartiecreate->mt_min = $montant;
            $contrepartiecreate->mt_max = $montant;
            $contrepartiecreate->qte_totale = $qte_totale;
            $contrepartiecreate->qte_cde = $qte_cde;
            $contrepartiecreate->est_illimite = $quantite_limite;
            $contrepartiecreate->projet_id = $projet;
            $contrepartiecreate->date_liv_est = $date_de_livraison;
            $contrepartiecreate->image = $fileName;
            $contrepartiecreate->save();

            return array("status" => "success", "message" => "La contrepartie a été créee avec succès", "data" => "");
        } catch (WazindoException $e) {
            throw $e;
        } catch (\Exception $ex) {
            \Log::error($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la contrepartie", "data" => "");
        }
    }
    // end createContrepartie


    //create ligne finance
    public function adDocument($urlLinkedln, $urlTwitter, $urlYoutube, $urlfacebook, $fileName, $projet)
    {
        try {
            $searchProject = Projet::where("id", "=", $projet)->get();
            if ($searchProject->isEmpty()) {
                return array("status" => "error", "message" => "Cette information du projet n'existe pas", "data" => "");
            }
            $projetObj = $searchProject->first();

            //update projet

            $projetObj->photo_mini = $fileName;
            $projetObj->url_twitter = $urlTwitter;
            $projetObj->url_facebook = $urlfacebook;
            $projetObj->url_youtube = $urlYoutube;
            $projetObj->url_linkedin = $urlLinkedln;
            $projetObj->save();

            return array("status" => "success", "message" => "Le document a été crée avec succès", "data" => "");
        } catch (WazindoException $e) {
            throw $e;
        } catch (\Exception $ex) {
            \Log::error($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la contrepartie", "data" => "");
        }
    }
    // end createContrepartie


    //get list ligne finance by projet
    public static function getListContrepartie($projetId)
    {
        try {
            $getListContrepartie = ContrepartieProjet::where("projet_id", "=", $projetId)->get();

            return $getListContrepartie;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    } //end of get list ligne finance by projet

    // delete Profil
    public function deleteContrepartie($id)
    {

        try {
            $searchContrepartie = ContrepartieProjet::where("id", "like", $id)->get();
            if ($searchContrepartie->isEmpty()) {
                return array("status" => "error", "message" => "Votre contrepartie n'existe pas. Veuillez réessayer.", "data" => "");
            }
            $foundContrepartie = $searchContrepartie->first();

            //remove now
            $foundContrepartie->delete();


            return array("status" => "success", "message" => "Votre contrepartie a été supprimée avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            // throw $ex;
        } catch (\Exception $ex) {

            // throw $ex;
        }
    }





    //get project details
    public function getProjectDetails($projectReference)
    {
        try {

            //check reference
            $projectDetails = Projet::where("reference", "like", $projectReference)
                ->with(
                    "categorie",
                    "ligne_finance_projets",
                    "contributions",
                    "commentaires",
                    "actualites",
                    "type_organisation",
                    "categorie",
                    "pays",
                    "contreparties",
                    "profil"
                )
                ->first();

            $dataProject = array("project" => $projectDetails, "pourcentage_collecte" => "80");

            return $dataProject;
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {
            throw $ex;
        }
    } //end getProjectDetails




}
