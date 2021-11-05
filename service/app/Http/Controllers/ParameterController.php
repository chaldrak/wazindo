<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ParameterService;
use App\Services\OperationService;
use App\Helpers\Factory\ParamsFactory; 
use App\Exceptions\WazindoException;

class ParameterController extends Controller
{


            // get List Pays
	public function getListPays()
    {
        try {
            $paramService = new ParameterService();
            $resultList = $paramService->getListCountries();

            return array("status" => "success", "message" => "", "data" => $resultList);
        } 
		
		    catch (WazindoException $ex)
        {
            $error = array("status" => "error", "message" => $ex->getMessage() );
            ParamsFactory::logException($ex);
            return $error;

    }
		
		catch (\Illuminate\Database\QueryException $ex) {
			 ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de la liste des pays. Veuillez réessayer","data"=>$ex);
          
            return $error;
        } catch (\Exception $ex) {
			 ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de la liste des pays. Veuillez réessayer", "data"=>$ex);
         
            return $error;
        }
    }
	 // end of get List Pays

     

    	 // get List Departement Country
         public function getListDepartementCountry()
         {
             try {
                 $nomPays = 'Benin';
     
                 $operationService = new OperationService();
                 $resultList = $operationService->getListDepartementCountry($nomPays);
     
                 return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
             } 
                 catch (WazindoException $ex)
             {
                 $error = array("status" => "error", "message" => $ex->getMessage() );
                 ParamsFactory::logException($ex);
                 return $error;
     
         }
             
             catch (\Illuminate\Database\QueryException $ex) {
                  ParamsFactory::logException($ex);
                 $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de la liste des départements. Veuillez réessayer","data"=>$ex);
              
                 return $error;
             } catch (\Exception $ex) {
                  ParamsFactory::logException($ex);
                 $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de la liste des départements. Veuillez réessayer", "data"=>$ex);
             
                 return $error;
             }
         } 	 
          // end of get List Departement Country



        // get List Commune By Departement
	public function getListCommuneByDepartement($id)
    {
        try {
            $departementId = $id;

            $operationService = new OperationService();
            $resultList = $operationService->getListCommuneByDepartement($departementId);

            return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
        } 
		
		    catch (WazindoException $ex)
        {
            $error = array("status" => "error", "message" => $ex->getMessage() );
            ParamsFactory::logException($ex);
            return $error;

    }
		catch (\Illuminate\Database\QueryException $ex) {
			 ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de la liste des communes. Veuillez réessayer","data"=>$ex);
          
            return $error;
        } catch (\Exception $ex) {
			 ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement de la liste des communes. Veuillez réessayer", "data"=>$ex);
           
            return $error;
        }
    }
    //end of  get List Commune By Departement


    	//  get Projects Categories ;
	 public function getProjectsCategories()
     {
         try {
             $operationService = new OperationService();
             $resultList = $operationService->getProjectsCategories();
 
             return array("status" => $resultList["status"], "message" => $resultList["message"], "data" => $resultList["data"]);
         }
     catch (WazindoException $ex)
         {
             $error = array("status" => "error", "message" => $ex->getMessage() );
             ParamsFactory::logException($ex);
             return $error;
 
     }		catch (\Illuminate\Database\QueryException $ex) {
              ParamsFactory::logException($ex);
             $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer","data"=>$ex);
            
             return $error;
         } catch (\Exception $ex) {
              ParamsFactory::logException($ex);
             $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer", "data"=>$ex);
   
             return $error;
         }
     }
     // end of get Projects Categories



    //Categorie
    public function getListCategories()
    {
        try {

			$parameterService = new ParameterService();
            $resultList = $parameterService->getListCategories();

            return array("status" => "success", "message" => "", "data" => $resultList);

        }
    catch (WazindoException $ex)
        {
            $error = array("status" => "error", "message" => $ex->getMessage() );
            ParamsFactory::logException($ex);
            return $error;

    }		catch (\Illuminate\Database\QueryException $ex) {
			
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des categories. Veuillez réessayer");
             ParamsFactory::logException($ex);
            return $error;
        } catch (\Exception $ex) {
			   
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des categories. Veuillez réessayer");
            ParamsFactory::logException($ex);
            return $error;
        }
    }//end of get List Categories
	
	// create Categorie
    public function createCategorie(Request $request)
    {
        try {
            if (empty($request->input('nom'))) {
                return array("status" => "error", "message" => "Veuillez entrer le nom de la catégorie", "data" => "");
            }
            $nom = $request->input('nom');
            $parameterService = new ParameterService();
            $resultCreateCategorie = $parameterService->createCategorie($nom);

            return array("status" => $resultCreateCategorie['status'], "message" => $resultCreateCategorie['message'], "data" => $resultCreateCategorie['data']);
        }
    catch (WazindoException $ex)
        {
            $error = array("status" => "error", "message" => $ex->getMessage() );
            ParamsFactory::logException($ex);
            return $error;

    }		catch (\Illuminate\Database\QueryException $ex) {
			   ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la catégorie", "data" => $ex);
        } catch (\Exception $ex) {
			   ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création de la catégorie", "data" => $ex);
        }
    }
	// end of create Categorie
	
	//update Categorie
    public function updateCategorie(Request $request)
    {
        try {
            if (empty($request->input('nom'))) {
                return array("status" => "error", "message" => "Veuillez entrer le nom de la catégorie", "data" => "");
            }
            $nom = $request->input('nom');
            $id=$request->input('id');
            $parameterService = new ParameterService();
            $resultUpdateCategorie = $parameterService->updateCategorie($id,$nom);

            return array("status" =>"success", "message"=>"La catégorie a été modifiée avec succès", "data" =>"");
        }
    catch (WazindoException $ex)
        {
            $error = array("status" => "error", "message" => $ex->getMessage() );
            ParamsFactory::logException($ex);
            return $error;

    }		catch (\Illuminate\Database\QueryException $ex) {
			   ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la modification de la catégorie", "data" => "");
        } catch (\Exception $ex) {
			   ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la modification de la catégorie", "data" => "");
        }
    }
	// end of update Categorie
	
    // remove categorie
    public function removeCategorie($id)
    {
        try {

             if(!isset($id)){
                return array("status" => "error", "message" => "Veuillez fournir toutes les informations", "data" => "");
            }
           //save
			$paramService = new ParameterService();
            $resultRemove = $paramService->removeCategorie($id);
            return array("status" => $resultRemove["status"], "message" => $resultRemove["message"], "data" => $resultRemove["data"]);

        } 
		    catch (WazindoException $ex)
        {
            $error = array("status" => "error", "message" => $ex->getMessage() );
            ParamsFactory::logException($ex);
            return $error;

    }catch (\Illuminate\Database\QueryException $ex) {
			   ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la suppression de la catégorie. Veuillez réessayer");
            return $error;
        } catch (\Exception $ex) {
			   ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la suppression de la catégorie. Veuillez réessayer");
            return $error;
        }
    }//end of removeProfil


    // get List Countries
    public function getListCountries()
    {
        try {

			$parameterService = new ParameterService();
            $resultList = $parameterService->getListCountries();

            return array("status" => "success", "message" => "", "data" => $resultList);

        }
    catch (WazindoException $ex)
        {
            $error = array("status" => "error", "message" => $ex->getMessage() );
            ParamsFactory::logException($ex);
            return $error;

    }		catch (\Illuminate\Database\QueryException $ex) {
			    $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des pays. Veuillez réessayer");
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Exception $ex) {
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des pays. Veuillez réessayer");
             ParamsFactory::logException($ex);
            return $error;
        }
    }
	    // end of get List Countries
		
		// create Countrie
    public function createCountrie(Request $request)
    {
        try {
            if (empty($request->input('nom')) && empty($request->input('indicatif')) ) {
                return array("status" => "error", "message" => "Veuillez renseigner tout les champs", "data" => "");
            }
            $nom = $request->input('nom');
            $indicatif = $request->input('indicatif');
            $parameterService = new ParameterService();
            $resultCreateCountrie = $parameterService->createCountrie($nom,$indicatif);

            return array("status" => $resultCreateCountrie['status'], "message" => $resultCreateCountrie['message'], "data" => $resultCreateCountrie['data']);
        }
    catch (WazindoException $ex)
        {
            $error = array("status" => "error", "message" => $ex->getMessage() );
            ParamsFactory::logException($ex);
            return $error;

    }		catch (\Illuminate\Database\QueryException $ex) {
			   ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création du pays", "data" => "");
        } catch (\Exception $ex) {
			   ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création du pays", "data" => "");
        }
    }
	// end of create Countrie
	
	//update Countrie
    public function updateCountrie(Request $request)
    {
        try {
            if (empty($request->input('nom')) &&empty($request->input('indicatif')) ) {
                return array("status" => "error", "message" => "Veuillez renseigner tout les champs", "data" => "");
            }
            $nom = $request->input('nom');
            $indicatif = $request->input('indicatif');
            $parameterService = new ParameterService();
            $resultUpdateCategorie = $parameterService->updateCountrie($id,$nom,$indicatif);

            return array("status" =>"success", "message" =>"Le pays a été modifié avec succès", "data" => "");
        }
    catch (WazindoException $ex)
        {
            $error = array("status" => "error", "message" => $ex->getMessage() );
            ParamsFactory::logException($ex);
            return $error;

    }		catch (\Illuminate\Database\QueryException $ex) {
			   ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la modification du pays", "data" => "");
        } catch (\Exception $ex) {
			   ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la modification du pays", "data" => "");
        }
    }
		//end of update Countrie
		
	//remove Countrie
    public function removeCountrie($id)
    {
        try {

             if(!isset($id)){
                return array("status" => "error", "message" => "Veuillez fournir toutes les informations", "data" => "");
            }
           //save
			$paramService = new ParameterService();
            $resultRemove = $paramService->removeCountrie($id);
            return array("status" => $resultRemove["status"], "message" => $resultRemove["message"], "data" => $resultRemove["data"]);

        }
    catch (WazindoException $ex)
        {
            $error = array("status" => "error", "message" => $ex->getMessage() );
            ParamsFactory::logException($ex);
            return $error;

    }		catch (\Illuminate\Database\QueryException $ex) {
			   ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la suppression du pays. Veuillez réessayer");
            return $error;
        } catch (\Exception $ex) {
			   ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la suppression du pays. Veuillez réessayer");
            return $error;
        }
    }
	//end of remove Countrie

    // get List Departements
    public function getListDepartements($pays_id)
    {
        try {

			$parameterService = new ParameterService();
            $resultList = $parameterService->getListDepartements($pays_id);

            return array("status" => "success", "message" => "", "data" => $resultList);

        }
    catch (WazindoException $ex)
        {
            $error = array("status" => "error", "message" => $ex->getMessage() );
            ParamsFactory::logException($ex);
            return $error;

    }		catch (\Illuminate\Database\QueryException $ex) {
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des départements. Veuillez réessayer");
            ParamsFactory::logException($ex);
            return $error;
        } catch (\Exception $ex) {
            $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des départements. Veuillez réessayer");
            ParamsFactory::logException($ex);
            return $error;
        }
    }
	
    // end of get List Departements

	// create Departement
    public function createDepartement(Request $request)
    {
        try {
            if (empty($request->input('nom')) &&empty($request->input('pays_id')) ) {
                return array("status" => "error", "message" => "Veuillez entrer le nom de la catégorie", "data" => "");
            }
            $nom = $request->input('nom');
            $pays_id = $request->input('pays_id');
            $parameterService = new ParameterService();
            $resultCreateCountrie = $parameterService->createDepartement($nom,$pays_id);
            return array("status" => $resultCreateDepartement['status'], "message" => $resultCreateDepartement['message'], "data" => $resultCreateDepartement['data']);
        }
    catch (WazindoException $ex)
        {
            $error = array("status" => "error", "message" => $ex->getMessage() );
            ParamsFactory::logException($ex);
            return $error;

    }		catch (\Illuminate\Database\QueryException $ex) {
			   ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création du departement", "data" => "");
        } catch (\Exception $ex) {
			   ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la création du departement", "data" => "");
        }
    }
	
	//end of create Departement

	//update Departement 
    public function updateDepartement(Request $request)
    {
        try {
            if (empty($request->input('nom')) &&empty($request->input('pays_id')) ) {
                return array("status" => "error", "message" => "Veuillez entrer le nom de la catégorie", "data" => "");
            }
            $nom = $request->input('nom');
            $pays_id = $request->input('pays_id');
            $parameterService = new ParameterService();
            $resultUpdateDepartement = $parameterService->updateDepartement($id,$nom,$pays_id);

            return array("status" => $resultUpdateDepartement['status'], "message" => $resultUpdateDepartement['message'], "data" => $resultUpdateDepartement['data']);
        }
    catch (WazindoException $ex)
        {
            $error = array("status" => "error", "message" => $ex->getMessage() );
            ParamsFactory::logException($ex);
            return $error;

    }		catch (\Illuminate\Database\QueryException $ex) {
			   ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la modification du département", "data" => "");
        } catch (\Exception $ex) {
			   ParamsFactory::logException($ex);
            return array("status" => "error", "message" => "Une erreur est survenue lors de la modification du département", "data" => "");
        }
    }
	
	//end of update Departement
	
	//remove Departement
    public function removeDepartement($id)
    {
        try {

             if(!isset($id)){
                return array("status" => "error", "message" => "Veuillez fournir toutes les informations", "data" => "");
            }
           //save
			$paramService = new ParameterService();
            $resultRemove = $paramService->removeDepartement($id);
            return array("status" => $resultRemove["status"], "message" => $resultRemove["message"], "data" => $resultRemove["data"]);

        }
    catch (WazindoException $ex)
        {
            $error = array("status" => "error", "message" => $ex->getMessage() );
            ParamsFactory::logException($ex);
            return $error;

    }		catch (\Illuminate\Database\QueryException $ex) {
			   ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la suppression du pays. Veuillez réessayer");
            return $error;
        } catch (\Exception $ex) {
			   ParamsFactory::logException($ex);
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la suppression du pays. Veuillez réessayer");
            return $error;
        }
    }
		//end of remove Departement
}
