<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\OperationService;
use App\Exceptions\WazindoException;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use App\Helpers\Factory\ParamsFactory;
use App\Models\Parametre;

class OperationController extends Controller
{
    // create Proposition Projet
    public function createPropositionProjet(Request $request)

    {
        try {

            //check data
            if (!(empty($request->get('data')['email']) &&  empty($request->get('data')['type_organisation']) && empty($request->get('data')['titre_projet']) && empty($request->get('data')['pays']) && empty($request->get('data')['categorie']) && empty($request->get('data')['montant_collecter']) && empty($request->get('data')['duree_campagne']) && empty($request->get('data')['description_projet']) && empty($request->get('data')['contrepartie']))) {
                return array("status" => "error", "message" => "Veuillez renseigner toutes les informations du projet", "data" => "");
            }

            $inputArray = json_decode($request->get('data'));


            //recupère les champs fournis 

            $type_organisation = $inputArray->type_organisation;
            $titre_projet = $inputArray->titre_projet;
            $pays = $inputArray->pays;


            $email = $inputArray->email;

            $departement = isset($inputArray->departement) ? '$inputArray->departement ' : '';
            $commune  = isset($inputArray->commune) ? '$inputArray->commune' : '';


            $categorie = $inputArray->categorie;
            $montant_collecter = $inputArray->montant_collecter;
            $duree_campagne = $inputArray->duree_campagne;
            $description_projet = $inputArray->description_projet;
            $contrepartie = $inputArray->contrepartie;

            $baseUrl = env('IMAGE_BASE_URL'); //
            $extension  = "";
            $fileName = "";
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                \Log::error($file);
                $extension = $file->getClientOriginalExtension();
                \Log::error($extension);

                $fileName = date('Ymd') . '_' . time() . '_' . mt_rand(1000, 1000000) . '.' . $extension;  //'_' .time().'_'.mt_rand(1000, 1000000)
                \Log::error($fileName);
                $pathName = '/fichier/soumission/' . $fileName; //public_path().

                Storage::disk('local')->put($pathName,  File::get($file));
                $fileName =  $baseUrl . '/api/v1/live/operations/imageurl/' . $fileName;
            }

            \Log::error($fileName);

            $operationService = new OperationService();
            $createPropositionProjet = $operationService->createPropositionProjet(
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
            );

            return array("status" => $createPropositionProjet['status'], "message" => $createPropositionProjet['message'], "data" => $createPropositionProjet['data']);
        } catch (WazindoException $ex) {
            ParamsFactory::logException($ex);
            return $ex->getMessage();
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la proposition du projet", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la proposition du projet", "data" => "");
        }
    }
    // end of create Proposition Projet

    // create Contribution
    public function createContribution(Request $request)


    {
        try {
            if (
                empty($request->input('projet_reference')) && empty($request->input('montant')) && empty($request->input('login')) &&
                empty($request->input('mode_paiement_reference'))
            ) {
                return array("status" => "error", "message" => "Veuillez renseigner tout les champs", "data" => "");
            }
            $projet_reference = $request->input('projet_reference');
            $montant = $request->input('montant');
            $login = $request->input('login');
            $mode_paiement_reference = $request->input('mode_paiement_reference');
            $operationService = new OperationService();
            $resultCreateContribution = $operationService->createContribution($projet_reference, $montant, $login, $mode_paiement_reference);

            return array("status" => $resultCreateContribution['status'], "message" => $resultCreateContribution['message'], "data" => $resultCreateContribution['data']);
        } catch (WazindoException $ex) {
            ParamsFactory::logException($ex);
            return $e->getMessage();
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la publicité", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la publicité", "data" => "");
        }
    }
    //End of create Contribution

    // create Contribution Video
    public function createContributionVideo(Request $request)
    {
        try {
            if (
                empty($request->input('projet_reference')) && empty($request->input('montant')) && empty($request->input('login')) &&
                empty($request->input('video_reference'))
            ) {
                return array("status" => "error", "message" => "Veuillez renseigner tout les champs", "data" => "");
            }
            $projet_reference = $request->input('projet_reference');
            $montant = $request->input('montant');
            $login = $request->input('login');
            $video_reference = $request->input('video_reference');
            $operationService = new OperationService();
            $resultCreateContribution = $operationService->createContributionVideo($projet_reference, $montant, $login, $video_reference);

            return array("status" => $resultCreateContribution['status'], "message" => $resultCreateContribution['message'], "data" => $resultCreateContribution['data']);
        } catch (WazindoException $ex) {

            ParamsFactory::logException($ex);
            return $e->getMessage();
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la publicité", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la publicité", "data" => "");
        }
    }
    //end of create Contribution Video

    // get List Contribution
    public function getListContribution($projet_id)
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListContribution($projet_id);

            return array("status" => "success", "message" => "", "data" => $resultList);
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des contributions. Veuillez réessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des contributions. Veuillez réessayer");

            return $error;
        }
    }
    // end of get List Contribution



    // get List Actualites
    public function getListActualites($projet_id)
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListActualites($projet_id);

            return array("status" => "success", "message" => "", "data" => $resultList);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des actualités. Veuillez réessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des actualités. Veuillez réessayer");

            return $error;
        }
    }
    //  end of get List Actualites

    // get List Commentaire
    public function getListCommentaire($projet_id)
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListCommentaire($projet_id);

            return array("status" => "success", "message" => "", "data" => $resultList);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des commentaires. Veuillez réessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des commentaires. Veuillez réessayer");

            return $error;
        }
    }
    // end of get List Commentaire

    // get List Commentaire
    public function getListCommentaireLimit($projet_id)
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListCommentaireLimit($projet_id);

            return array("status" => "success", "message" => "", "data" => $resultList);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des actualités. Veuillez réessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des actualités. Veuillez réessayer");

            return $error;
        }
    }
    // end of get List Commentaire

    // get List Commentaire
    public function getListActualite($projet_id)
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListActualite($projet_id);

            return array("status" => "success", "message" => "", "data" => $resultList);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des commentaires. Veuillez réessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des commentaires. Veuillez réessayer");

            return $error;
        }
    }
    // end of get List Commentaire


    // get List Project
    public function getStatsProjetPublishedByCategorie()
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getStatsProjectPublishedByCategorie();
            return array("status" => "success", "message" => "", "data" => $resultList);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des statistiques. Veuillez réessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des statistiques. Veuillez réessayer");

            return $error;
        }
    }
    //end of getListProjetPublishByCategorie


    // get List Project
    public function getListProject($categorie_id)
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListProject($categorie_id);

            return array("status" => "success", "message" => "", "data" => $resultList);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer");

            return $error;
        }
    }
    //end of get List Project


    // get List Project
    public function getListCommission()
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListCommission();

            return array("status" => "success", "message" => "", "data" => $resultList);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer");

            return $error;
        }
    }
    //end of get List Project


    // create Diffusion
    public function updateCommission(request $request)
    {
        try {

            $libelle = $request->input('libelle');
            $valeur = $request->input('valeur');
            $id = $request->input('id');


            $operationService = new OperationService();
            $resultList = $operationService->updateCommission($valeur, $libelle, $id);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => '');
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création de votre commentaire. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création de votre commentaire. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end of create Diffusion

    // get List Project
    public function getListModePaiement()
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListModePaiement();

            return array("status" => "success", "message" => "", "data" => $resultList);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer");

            return $error;
        }
    }
    //end of get List Project



    // create Diffusion
    public function editModePaiement(request $request)
    {
        try {

            $nom = $request->input('nom');
            $code = $request->input('code');
            $id = $request->input('id');


            $operationService = new OperationService();
            $resultList = $operationService->editModePaiement($nom, $code, $id);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => '');
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création de votre commentaire. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création de votre commentaire. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end of create Diffusion


    // create Diffusion
    public function createModePaiement(request $request)
    {
        try {

            $nom = $request->input('nom');
            $code = $request->input('code');


            $operationService = new OperationService();
            $resultList = $operationService->createModePaiement($nom, $code);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => '');
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création de votre commentaire. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création de votre commentaire. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end of create Diffusion



    //delete ligne finance
    public function deleteModePaiement(request $request)
    {
        try {
            $id = $request->input('id');
            $operationService = new OperationService();
            $resultList = $operationService->deleteModePaiement($id);
            return array("status" => $resultList['status'], "message" => $resultList['message'], "data" => '');
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            \Log::error($error);

            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la suppression de la liste de finance", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la suppression de la liste de finance", "data" => "");
        }
    }
    // end of ligne finance



    // get List Project
    public function getListCategorie()
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListCategorie();

            return array("status" => "success", "message" => "", "data" => $resultList);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer");

            return $error;
        }
    }
    //end of get List Project



    // create Diffusion
    public function editCategorie(request $request)
    {
        try {

            $nom = $request->input('nom');
            $reference = $request->input('reference');
            $icone = $request->input('icone');
            $id = $request->input('id');

            $operationService = new OperationService();
            $resultList = $operationService->editCategorie($nom, $icone, $reference, $id);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => '');
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création de votre commentaire. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création de votre commentaire. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end of create Diffusion


    // create Diffusion
    public function createCategorie(request $request)
    {
        try {
            $inputArray = json_decode($request->get('data'));

            //recupère les champs fournis 
            $nom = $inputArray->nom;
            $reference = $inputArray->reference;

            $baseUrl = env('IMAGE_BASE_URL'); //
            $extension  = "";
            $fileName = "";
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $extension = $file->getClientOriginalExtension();
                $fileName = date('Ymd') . '_' . time() . '_' . mt_rand(1000, 1000000) . '.' . $extension;  //'_' .time().'_'.mt_rand(1000, 1000000)
                $pathName = '/fichier/soumission/' . $fileName; //public_path().
                Storage::disk('local')->put($pathName,  File::get($file));
                $fileName =  $baseUrl . '/api/v1/live/operations/imageurl/' . $fileName;
            }

            $operationService = new OperationService();
            $resultList = $operationService->createCategorie($nom, $fileName, $reference);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => '');
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création de votre commentaire. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création de votre commentaire. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end of create Diffusion

    ////////////////////// Sponsor ///////////////////////////////////////////

    // create Diffusion
    public function createSponsor(request $request)
    {
        try {
            $nom = $request->input('nom');
            $adresse = $request->input('adresse');
            $contact = $request->input('contact');
            $personne_reference = $request->input('personne_reference');

            $operationService = new OperationService();
            $resultList = $operationService->createSponsor($personne_reference, $adresse, $contact,$nom);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => '');
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création du sponsor. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création du sponsor. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end of create Diffusion


    // create Diffusion
    public function editSponsor(request $request)
    {
        try {
            $nom = $request->input('nom');
            $adresse = $request->input('adresse');
            $contact = $request->input('contact');
            $personne_reference = $request->input('personne_reference');
            $id = $request->input('id');


            $operationService = new OperationService();
            $resultList = $operationService->editSponsor($id,$personne_reference, $adresse, $contact,$nom);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => '');
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de l'édition du sponsor. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de l'édition du sponsor. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end of create Diffusion


    // create Diffusion
    public function getListSponsor(request $request)
    {
        try {
           
            $operationService = new OperationService();
            $resultList = $operationService->getListSponsor();
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du listing des sponsor. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du listing des sponsor. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end of create Diffusion

    //delete ligne finance
    public function deleteSponsor(request $request, $id)
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->deleteSponsor($id);
            return array("status" => $resultList['status'], "message" => $resultList['message'], "data" => '');
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            \Log::error($error);

            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la suppression du sponsor", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la suppression du sponsor", "data" => "");
        }
    }
    // end of ligne finance

    //////////////////////////////// End Sponsor ///////////////////////

    ////////////////////// Financement sponsor ///////////////////////////////////////////

    // create Diffusion
    public function createFinancementSponsor(request $request)
    {
        try {
            $sponsor_id = $request->input('sponsor_id');
            $pub_id = $request->input('pub_id');
            $montant_apport = $request->input('montant_apport');

            $operationService = new OperationService();
            $resultList = $operationService->createFinancementSponsor($sponsor_id,$pub_id,$montant_apport);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => '');
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création du financement sponsor. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création du financement sponsor. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end of create Diffusion


    // create Diffusion
    public function editFinancementSponsor(request $request)
    {
        try {
            $sponsor_id = $request->input('sponsor_id');
            $pub_id = $request->input('pub_id');
            $montant_apport = $request->input('montant_apport');
            $id = $request->input('id');


            $operationService = new OperationService();
            $resultList = $operationService->editFinancementSponsor($id,$sponsor_id,$pub_id,$montant_apport);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => '');
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de l'édition du financement sponsor. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de l'édition du financement sponsor. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end of create Diffusion


    // create Diffusion
    public function getListFinancementSponsor(request $request)
    {
        try {
           
            $operationService = new OperationService();
            $resultList = $operationService->getListFinancementSponsor();
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du listing des financements sponsor. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du listing des financements sponsor. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end of create Diffusion

    //delete ligne finance
    public function deleteFinancementSponsor(request $request, $id)
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->deleteFinancementSponsor($id);
            return array("status" => $resultList['status'], "message" => $resultList['message'], "data" => '');
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            \Log::error($error);

            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la suppression du financement sponsor", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la suppression du financement sponsor", "data" => "");
        }
    }
    // end of ligne finance

    //////////////////////////////// End financement sponsor ///////////////////////

    ////////////////////// pub solidaire ///////////////////////////////////////////

    // create Diffusion
    public function createPubSolidaire(request $request)
    {
        try {

            $inputArray = json_decode($request->get('data'));

            //recupère les champs fournis 
            $titre = $inputArray->titre;
            $description = $inputArray->description;
            $lien_video = $inputArray->lien_video;
            $montant_projet = $inputArray->montant_projet;

            $baseUrl = env('IMAGE_BASE_URL'); //
            $extension  = "";
            $fileName = "";
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $extension = $file->getClientOriginalExtension();
                $fileName = date('Ymd') . '_' . time() . '_' . mt_rand(1000, 1000000) . '.' . $extension;  //'_' .time().'_'.mt_rand(1000, 1000000)
                $pathName = '/fichier/soumission/' . $fileName; //public_path().
                Storage::disk('local')->put($pathName,  File::get($file));
                $fileName =  $baseUrl . '/api/v1/live/operations/imagepuburl/' . $fileName;
            }

            $operationService = new OperationService();
            $resultList = $operationService->createPubSolidaire($lien_video,$montant_projet,$titre, $fileName, $description);

            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => '');
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création du sponsor. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création du sponsor. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end of create Diffusion


    // create Diffusion
    public function editPubSolidaire(request $request)
    {
        try {
            $titre = $request->input('titre');
            $description = $request->input('description');
            $lien_video = $request->input('lien_video');
            $id = $request->input('id');
            $montant_projet = $request->input('montant_projet');

            $operationService = new OperationService();
            $resultList = $operationService->editPubSolidaire($id,$lien_video,$montant_projet,$titre, $description);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => '');
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de l'édition de la publicité solidaire. Veuillez réessayer", "data" => $ex);
            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de l'édition de la publicité solidaire. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end of create Diffusion


    // create Diffusion
    public function getListPubSolidaire(request $request)
    {
        try {
           
            $operationService = new OperationService();
            $resultList = $operationService->getListPubSolidaire();
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du listing des publicités solidaires. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du listing des publicités solidaires. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end getListSoutienSolidaire

    //delete ligne finance
    public function deletePubSolidaire(request $request, $id)
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->deletePubSolidaire($id);
            return array("status" => $resultList['status'], "message" => $resultList['message'], "data" => '');
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            \Log::error($error);

            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la suppression de la publicité solidaire", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la suppression de la publicité solidaire", "data" => "");
        }
    }
    // end of ligne finance

    //////////////////////////////// End pub solidaire ///////////////////////



    // create Diffusion
    public function getListSoutienSolidaire(request $request)
    {
        try {
           
            $operationService = new OperationService();
            $resultList = $operationService->getListSoutienSolidaire();
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du listing des sponsor. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du listing des sponsor. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end getListSoutienSolidaire

    //delete ligne finance
    public function deleteCategorie(request $request)
    {
        try {
            $id = $request->input('id');
            $operationService = new OperationService();
            $resultList = $operationService->deleteCategorie($id);
            return array("status" => $resultList['status'], "message" => $resultList['message'], "data" => '');
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            \Log::error($error);

            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la suppression de la liste de finance", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la suppression de la liste de finance", "data" => "");
        }
    }
    // end of ligne finance


    //get Organisation Projet
    public function getOrganisationProjet()
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getOrganisationProjet();

            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des organisations de projets. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des organisations de projets. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    //end of get Organisation Projet

    // get Categorie Projet
    public function getCategorieProjet()
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getCategorieProjet();

            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des catégories de projets. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des catégories de projets. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end of get Categorie Projet

    // get List Project By Categories
    public function getListProjectByCategories()
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListProjectByCategories();

            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end of get List Project By Categories



    // get List Project By User
    public function getListProjectByUser(request $request)
    {
        try {
            if (empty($request->input('email_address'))) {
                return array("status" => "error", "message" => "Veuillez renseigner tout les champs", "data" => "");
            }

            $emailAddress = $request->input('email_address');
            $statut = $request->input('statut');
            $operationService = new OperationService();
            $resultList = $operationService->getListProjectByUser($emailAddress, $statut);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    //  end of get List Project By User

    ///get diffusion list 
    public function getListDiffusion(request $request, $email_address)
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListDiffusion($email_address);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de la liste des diffusions. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de la liste des diffusions. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    //end of get diffusion list 


    //get Stats
    public function getListProjetStats()
    {
        try {
            $operationService = new OperationService();
            $result = $operationService->getListProjetStats();

            return array("status" => "success", "message" => "", "data" => $result);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des statistiques. Veuillez réessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des statistiques. Veuillez réessayer");

            return $error;
        }
    } //end of get getStatsByProjet


    //get Stats
    public function getListProjetCommissionStats(request $request)
    {
        try {
            $dateDebut = $request->input('dateDebut');
            $dateFin = $request->input('dateFin');
            $projet = $request->input('projet');

         
            $operationService = new OperationService();
            $result = $operationService->getListProjetCommissionStats($dateDebut,$dateFin,$projet);

            $commissionNom = 'Commission';
            $searchCommission = Parametre::where("code", "like", $commissionNom)->get();

            if ($searchCommission->isEmpty()) {
                return array("status" => "error", "message" => "Les informations sur la commision ne sont pas correct. Veuillez réesayer", "data" => "");
            } else {
                $commissionValeur = $searchCommission->first()->valeur;
            }
  $i = 0;
            $projet = array();
            foreach ($result as $itemProjet) {
                $summontant = floor($itemProjet['montant_collecte'] *($commissionValeur/100));
                $projet[$i] = ["titre" => $itemProjet['titre'], "montant_projet" => $itemProjet['montant_a_collecte'], "montant_commission" => $summontant];
                $i++;
            }

            return array("status" => "success", "message" => "", "data" => $projet);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des statistiques. Veuillez réessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des statistiques. Veuillez réessayer");

            return $error;
        }
    } //end of get getStatsByProjet


    //get Stats
    public function getStatsByProjet($projet)
    {
        try {
            $operationService = new OperationService();
            $result = $operationService->getStatsByProjet($projet);

            return array("status" => "success", "message" => "", "data" => $result);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des statistiques. Veuillez réessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des statistiques. Veuillez réessayer");

            return $error;
        }
    } //end of get getStatsByProjet


    ///get diffusion list 
    public function getListMessage(request $request)
    {
        try {
            $email = $request->input('email');
            $projet = $request->input('projet');

            $operationService = new OperationService();
            $resultList = $operationService->getListMessage($email, $projet);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de la liste des diffusions. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de la liste des diffusions. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    //end of get diffusion list 


    ///get diffusion list 
    public function saveListeDiffusion(request $request)
    {
        try {
            $email = $request->input('email');
            $contact = $request->input('contact');
            $nom_contact = $request->input('nom_contact');
            $nombre_contact = $request->input('nombre_contact');

            $operationService = new OperationService();
            $resultList = $operationService->saveListeDiffusion($email, $contact, $nom_contact, $nombre_contact);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de la liste des diffusions. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de la liste des diffusions. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    //end of get diffusion list 

    // create Diffusion
    public function createDiffusion(request $request)
    {
        try {

            if (empty($request->input('nom')) && empty($request->input('nom_contact')) && empty($request->input('est_telephone')) && empty($request->input('userId'))) {
                return array("status" => "error", "message" => "Veuillez renseigner tout les champs", "data" => "");
            }
            $nom_diffusion = $request->input('nom');
            $nom_contact = $request->input('nom_contact');
            $est_telephone = $request->input('est_telephone');
            $telephone = $request->input('telephone');
            $email = $request->input('email');
            $userId = $request->input('userId');

            $operationService = new OperationService();
            $resultList = $operationService->createDiffusion($telephone, $email, $userId, $nom_diffusion, $nom_contact, $est_telephone);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création de la liste de diffusion. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création de la liste de diffusion. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end of create Diffusion


    // create Diffusion
    public function createCommentaire(request $request)
    {
        try {

            $commente_par_id = $request->input('commente_par_id');
            $contenu = $request->input('contenu');
            $projet_id = $request->input('projet_id');


            $operationService = new OperationService();
            $resultList = $operationService->createCommentaire($commente_par_id, $contenu, $projet_id);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création de votre commentaire. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création de votre commentaire. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end of create Diffusion


    // create Diffusion
    public function createActualite(request $request)
    {
        try {

            $titre = $request->input('titre');
            $description = $request->input('description');
            $projet_id = $request->input('projet_id');


            $operationService = new OperationService();
            $resultList = $operationService->createActualite($titre, $description, $projet_id);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création de votre actualité. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création de votre actualité. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // end of create Diffusion

    // send Mail
    public function saveMessage(Request $request)
    {
        try {
            //recupère les champs fournis dans ton code et adapte les valeurs

            $description = $request->input('description');
            $titre = $request->input('titre');
            $projet = $request->input('projet');
            $porteur = $request->input('porteur');

            $operationService = new OperationService();
            $resultList = $operationService->saveMessage($projet, $titre, $description, $porteur);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Erreur dans le try catch 1 controlleur");
            ParamsFactory::logException($ex, $request);
            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            \Log::error($ex);
            $error = array("status" => "error", "message" => "Erreur dans le try catch 2 controlleur");

            return $error;
        }
    } // end saveMessage

    // get List Contribution By Projet
    public function getListContributionByProfil(request $request, $email)
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListContributionByProfil($email);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de la liste des contribtions par projet. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de la liste des contributions par projet. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // endo of get List Contribution By Projet

    // get List Contribution By Projet
    public function getListContributionByProjet(request $request, $email)
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListContributionByProjet($email);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de la liste des contribtions par projet. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de la liste des contributions par projet. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    // endo of get List Contribution By Projet

    //get List Contributeur By Projet
    public function getListContributeurByProjet(request $request, $userId)
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListContributeurByProjet($userId);
            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de la liste des contributeurs par projet. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de la liste des contributeurs par projet. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    //end of get List Contributeur By Projet

    //get List Latest Project
    public function getListPorteurProjet()
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListPorteurProjet();

            return array("status" => "success", "message" => "", "data" => $resultList);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez reessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer");

            return $error;
        }
    } //END OF get List Latest Project

    //get List Latest Project
    public function getListLatestProject()
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListLatestProject();

            return array("status" => "success", "message" => "", "data" => $resultList);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez reessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer");

            return $error;
        }
    } //END OF get List Latest Project

    //get List published Project
    public function getListPublishedProject(Request $request)
    {
        try {

            $categorie = $request->input('categorie');
            $nom_projet = $request->input('nom_projet');
            $pays = $request->input('pays');
            $nom_porteur = $request->input('nom_porteur');
            $montant_maximum = $request->input('montant_maximum');
            $montant_minimum = $request->input('montant_minimum');
            $date_de_debut = $request->input('date_de_debut');
            $date_de_fin = $request->input('date_de_fin');

            $operationService = new OperationService();
            $resultList = $operationService->getListLatestPublishedProject($categorie, $nom_projet, $pays, $nom_porteur, $montant_maximum, $montant_minimum, $date_de_debut, $date_de_fin);

            return array("status" => "success", "message" => "", "data" => $resultList);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez reessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer");

            return $error;
        }
    } //END OF get List published Project

    //get List published Project
    public function PaymentServiceContribution(Request $request)
    {
        try {

            $email = $request->input('useremail');
            $reference = $request->input('transactionid');
            $projetid = $request->input('projetid');
            $montant = $request->input('montant');
          

            $operationService = new OperationService();
            $resultCreateContribution = $operationService->PaymentServiceContribution($projetid,$email, $reference, $montant);
            return array("status" => $resultCreateContribution['status'], "message" => $resultCreateContribution['message'], "data" => $resultCreateContribution['data']);

        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de l'enregistrement de la transaction. Veuillez reessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de l'enregistrement de la transaction. Veuillez réessayer");

            return $error;
        }
    } //END OF get List published Project



    //create Pubs
    public function createPubs(Request $request)
    {
        try {
            if (
                empty($request->input('titre')) && empty($request->input('description')) && empty($request->input('projet_reference')) &&
                empty($request->input('login'))
            ) {
                return array("status" => "error", "message" => "Veuillez renseigner tous les champs", "data" => "");
            }
            $titre = $request->input('titre');
            $description = $request->input('description');
            $projet_reference = $request->input('projet_reference');
            $login = $request->input('login');
            $operationService = new OperationService();
            $resultCreatePubs = $operationService->createPubs($titre, $description, $projet_reference, $login);

            return array("status" => $resultCreatePubs['status'], "message" => $resultCreatePubs['message'], "data" => $resultCreatePubs['data']);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la publicité", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la publicité", "data" => "");
        }
    }
    // end of create Pubs



    // get List Pubs
    public function getListPubs()
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListPubs();

            return array("status" => "success", "message" => "", "data" => $resultList);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des pubs. Veuillez reessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des pubs. Veuillez réessayer");

            return $error;
        }
    }
    // end of get List Pubs

    // get List Latest Pubs
    public function getListLatestPubs()
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListLatestPubs();

            return array("status" => "success", "message" => "", "data" => $resultList);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des pubs. Veuillez reessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des pubs 2. Veuillez réessayer");

            return $error;
        }
    }
    // end of  get List Latest Pubs




    // get Lastest Projects ;
    public function getLatestProjects()
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getLastestProjects();

            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer", "data" => $ex);

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer", "data" => $ex);

            return $error;
        }
    }
    //  get Latest Projects ;


    //rejeter un projet 
    public function rejectProject(Request $request)
    {
        try {

            if (empty($request->input('email_address'))  && empty($request->input('projet_reference'))) {
                return array("status" => "error", "message" => "Veuillez renseigner tous les champs", "data" => "");
            }

            //get data
            $emailAddress = $request->input('email_address');
            $projetReference = $request->input('projet_reference');

            //service
            $operationService = new OperationService();
            $resultProjectRejection = $operationService->rejectProject($emailAddress, $projetReference);

            return array("status" => $resultProjectRejection['status'], "message" => $resultProjectRejection['message'], "data" => $resultProjectRejection['data']);
        } catch (WazindoException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue. Veuillez réessayer", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de l'opération. Veuillez réeessayer'", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de l'opération. Veuillez réeessayer", "data" => "");
        }
    } //end of reject Project


    //update project as porteur
    public function updateStatusProjet(Request $request)
    {
        try {
            if (empty($request->input('email_address'))  && empty($request->input('reference'))) {
                return array("status" => "error", "message" => "Veuillez renseigner tous les champs", "data" => "");
            }
            //get data
            $email_address = $request->input('email_address');
            $reference = $request->input('reference');

            //service
            $operationService = new OperationService();
            $resultProjectUpdate = $operationService->updateStatusProjet($reference, $email_address);

            return array("status" => $resultProjectUpdate["status"], "message" => $resultProjectUpdate["message"], "data" => "");
        } catch (WazindoException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue. Veuillez réessayer", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de l'opération. Veuillez réeessayer'", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de l'opération. Veuillez réeessayer", "data" => "");
        }
    } //end of update project


    //update project as porteur
    public function updateBibliographie(Request $request)
    {
        try {
            if (empty($request->input('email_address'))  && empty($request->input('reference'))) {
                return array("status" => "error", "message" => "Veuillez renseigner tous les champs", "data" => "");
            }
            //get data
            $biographie = $request->input('biographie');
            $youtube = $request->input('youtube');
            $reference = $request->input('reference');
            $twitter = $request->input('twitter');
            $residence = $request->input('residence');
            $linkedln = $request->input('linkedln');
            $facebook = $request->input('facebook');
            $email = $request->input('email');
            $porteur_id = $request->input('porteur');
            $phone = $request->input('phone');

            //service
            $operationService = new OperationService();
            $resultProjectUpdate = $operationService->updateBibliographie($phone, $porteur_id, $biographie, $youtube, $reference, $twitter, $residence, $linkedln, $facebook, $email);

            return array("status" => $resultProjectUpdate["status"], "message" => $resultProjectUpdate["message"], "data" => "");
        } catch (WazindoException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue. Veuillez réessayer", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de l'enregistrement de la bibliographie. Veuillez réeessayer'", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de l'enregistrement de la bibliographie. Veuillez réeessayer", "data" => "");
        }
    } //end of update project


    //update project as porteur
    public function updateProjectAsPorteur(Request $request)
    {
        try {

            if (empty($request->input('email'))  && empty($request->input('reference'))) {
                return array("status" => "error", "message" => "Veuillez renseigner tous les champs", "data" => "");
            }

            //get data
            $categorie = $request->input('categorie');
            $description_projet = $request->input('description_projet');
            $duree_campagne = $request->input('duree_campagne');
            $email = $request->input('email');
            $montant_collecter = $request->input('montant_collecter');
            $pays = $request->input('pays');
            $reference = $request->input('reference');
            $resume = $request->input('resume');
            $titre_projet = $request->input('titre_projet');
            $type_organisation = $request->input('type_organisation');

            //service
            $operationService = new OperationService();
            $resultProjectUpdate = $operationService->updateProject($categorie, $description_projet, $duree_campagne, $email, $montant_collecter, $pays, $reference, $resume, $titre_projet, $type_organisation);

            return array("status" => $resultProjectUpdate['status'], "message" => $resultProjectUpdate['message'], "data" => $resultProjectUpdate['data']);
        } catch (WazindoException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue. Veuillez réessayer", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de l'opération. Veuillez réeessayer'", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de l'opération. Veuillez réeessayer", "data" => "");
        }
    } //end of update project


    //create ligne finance
    public function createLigneFinance(Request $request)
    {
        try {

            $ligne_finance = $request->input('ligne_financer');
            $montant = $request->input('montant');
            $projet = $request->input('projet');
            $commentaire = $request->input('commentaire');
            $date_mise_en_oeuvre = $request->input('date_mise_en_oeuvre');
            $deadline = $request->input('deadline');


            $operationService = new OperationService();
            $resultCreateLigneFinance = $operationService->createLigneFinance($projet, $ligne_finance, $montant, $commentaire, $date_mise_en_oeuvre, $deadline);

            return array("status" => $resultCreateLigneFinance['status'], "message" => $resultCreateLigneFinance['message'], "data" => $resultCreateLigneFinance['data']);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => " Une erreur est survenue lors de la création de la publicité", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la publicité", "data" => "");
        }
    }
    // end of ligne finance


    //create ligne finance
    public function updateAfterVisualisation(Request $request)
    {
        try {

            $id = $request->input('id');
            $type = $request->input('type');

            $operationService = new OperationService();
            $resultCreateLigneFinance = $operationService->updateAfterVisualisation($id, $type);

            return array("status" => $resultCreateLigneFinance['status'], "message" => $resultCreateLigneFinance['message'], "data" => $resultCreateLigneFinance['data']);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => " Une erreur est survenue lors de la création de la publicité", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la publicité", "data" => "");
        }
    }
    // end of ligne finance


    //liste ligne finance
    public function getListLigneFinance($id, request $request)
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListLigneFinance($id);
            \Log::error($resultList);
            return array("status" => "success", "message" => "", "data" => $resultList);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la publicité", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la publicité", "data" => "");
        }
    }
    // end of ligne finance

    //delete ligne finance
    public function deleteLigneFinance($id)
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->deleteListFinance($id);
            return array("status" => $resultList['status'], "message" => $resultList['message'], "data" => '');
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            \Log::error($error);

            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la suppression de la liste de finance", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la suppression de la liste de finance", "data" => "");
        }
    }
    // end of ligne finance


    //create ligne finance
    public function createDocument(Request $request)
    {
        try {
            $inputArray = json_decode($request->get('data'));


            //recupère les champs fournis 

            $projet = $inputArray->projet;
            $urlfacebook = $inputArray->urlfacebook;
            $urlYoutube = $inputArray->urlYoutube;
            $urlTwitter = $inputArray->urlTwitter;
            $urlLinkedln = $inputArray->urlLinkedln;

            $baseUrl = env('IMAGE_BASE_URL'); //
            $extension  = "";
            $fileName = "";
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                \Log::error($file);
                $extension = $file->getClientOriginalExtension();
                \Log::error($extension);

                $fileName = date('Ymd') . '_' . time() . '_' . mt_rand(1000, 1000000) . '.' . $extension;  //'_' .time().'_'.mt_rand(1000, 1000000)
                \Log::error($fileName);
                $pathName = '/fichier/documentprojet/' . $fileName; //public_path().
                \Log::error($pathName);

                Storage::disk('local')->put($pathName,  File::get($file));
                $fileName =  $baseUrl . '/api/v1/live/operations/imageurl/' . $fileName;
            }


            $operationService = new OperationService();
            $resultCreateDocument = $operationService->adDocument($urlLinkedln, $urlTwitter, $urlYoutube, $urlfacebook, $fileName, $projet);

            return array("status" => $resultCreateDocument['status'], "message" => $resultCreateDocument['message'], "data" => $resultCreateDocument['data']);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création du document", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création du document", "data" => "");
        }
    }
    // end of ligne finance


    //get image url or send a default image
    public static function  getImageUrl($name, Request $request)
    {
        try {
            $fileName = storage_path('app/fichier/documentprojet' . '/' . $name);
            \Log::error($fileName);
            if (Storage::disk('local')->exists('fichier/documentprojet' . '/' . $name)) {
                return response()->file($fileName);
            }
        } catch (\Illuminate\Database\QueryException $ex) {
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de votre image.");
            ParamsFactory::logException($ex, $request);
        } catch (\Exception $ex) {
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de votre image.");
            ParamsFactory::logException($ex, $request);
        }
    } //end getImageUrl

    //get image url or send a default image
    public static function  getImagePubUrl($name, Request $request)
    {
        try {
            $fileName = storage_path('app/fichier/soumission' . '/' . $name);
            \Log::error($fileName);
            if (Storage::disk('local')->exists('fichier/soumission' . '/' . $name)) {
                return response()->file($fileName);
            }
        } catch (\Illuminate\Database\QueryException $ex) {
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de votre image.");
            ParamsFactory::logException($ex, $request);
        } catch (\Exception $ex) {
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de votre image.");
            ParamsFactory::logException($ex, $request);
        }
    } //end getImageUrl



    //create ligne finance
    public function createContrepartie(Request $request)
    {
        try {
            $inputArray = json_decode($request->get('data'));


            //recupère les champs fournis 

            $description = $inputArray->description;
            $montant = $inputArray->montant;
            $projet = $inputArray->projet;
            $quantite_limite = $inputArray->quantite_limite;
            $date_de_livraison = $inputArray->date_de_livraison;
            \Log::error($montant);
            \Log::error($quantite_limite);

            $baseUrl = env('IMAGE_BASE_URL'); //
            $extension  = "";
            $fileName = "";
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                \Log::error($file);
                $extension = $file->getClientOriginalExtension();
                \Log::error($extension);

                $fileName = date('Ymd') . '_' . time() . '_' . mt_rand(1000, 1000000) . '.' . $extension;  //'_' .time().'_'.mt_rand(1000, 1000000)
                \Log::error($fileName);
                $pathName = '/fichier/documentprojet/' . $fileName; //public_path().
                \Log::error($pathName);

                Storage::disk('local')->put($pathName,  File::get($file));
                $fileName =  $baseUrl . '/api/v1/live/operations/imageurl/' . $fileName;
            }


            $operationService = new OperationService();
            $resultCreateContrepartie = $operationService->createContrepartie($fileName, $projet, $description, $montant, $quantite_limite, $date_de_livraison);

            return array("status" => $resultCreateContrepartie['status'], "message" => $resultCreateContrepartie['message'], "data" => $resultCreateContrepartie['data']);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la contrepartie", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la contrepartie", "data" => "");
        }
    }
    // end of ligne finance


    //liste ligne finance
    public function getListContrepartie($id)
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getListContrepartie($id);
            return array("status" => "success", "message" => "", "data" => $resultList);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors du listing des contreparties", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors du listing des contreparties", "data" => "");
        }
    }
    // end of ligne finance

    //delete ligne finance
    public function deleteContrepartie($lignefinance_id)
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->deleteContrepartie($lignefinance_id);
            return array("status" => "success", "message" => "", "data" => $resultList['data']);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la suppression de la contrepartie", "data" => "");
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la suppression de la contrepartie", "data" => "");
        }
    }
    // end of ligne finance




    // get details for project
    public function getProjectDetails($reference)
    {
        try {
            $operationService = new OperationService();
            $resultList = $operationService->getProjectDetails($reference);

            return array("status" => "success", "message" => "", "data" => $resultList);
        } catch (WazindoException $ex) {
            $error = array("status" => "error", "message" => $ex->getMessage());
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Illuminate\Database\QueryException $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des données du projet. Veuillez réessayer");

            return $error;
        } catch (\Exception $ex) {
            ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des données du projet. Veuillez réessayer");

            return $error;
        }
    }
    //  end getProjectDetails




}
