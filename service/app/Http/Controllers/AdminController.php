<?php

namespace App\Http\Controllers;

use App\Mail\Contact;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Mail;
use App\Http\Requests\ContactRequest;
use Illuminate\Support\Facades\Validator;
use App\Helpers\Factory\ParamsFactory; 
use App\Services\OperationService;
use App\Services\AdminService;
use App\Exceptions\WazindoException;

class AdminController extends Controller
{

        //update project status
        public function updateProjectStatus(request $request)
         {
             try {
                if (empty($request->input('project_reference')) && empty($request->input('email_address'))) {
                    return array("status" => "error", "message" => "Veuillez fournir toutes les informations du projet", "data" => "");
                }

                 $refProjet = $request->input('project_reference');
                 $porteurAddress = $request->input('email_address');

                 \Log::error("ceci est ". $refProjet);
                 \Log::error("cala est ". $porteurAddress);

                 $adminService = new AdminService();
                 $resultList = $adminService->updateProjectStatus($refProjet, $porteurAddress);
                 return array("status" => "success", "message" => "Le statut du projet a été mis à jour avec succès", "data" => "");
             }
     
         catch (WazindoException $ex)
             {
                 $error = array("status" => "error", "message" => $ex->getMessage() );
                 ParamsFactory::logException($ex);
                 return $error;
     
         }
     
             catch (\Illuminate\Database\QueryException $ex) {
                  ParamsFactory::logException($ex);
                 $error = array("status" => "error", "message" => "Une erreur est survenue lors de la mise à jour du projet. Veuillez réessayer","data"=>$ex);
              
                 return $error;
             } catch (\Exception $ex) {
                  ParamsFactory::logException($ex);
                 $error = array("status" => "error", "message" => "Une erreur est survenue lors de la mise à jour du projet. Veuillez réessayer", "data"=>$ex);
            
                 return $error;
             }
         }//end updateProjectStatus

    	 // get List Project Admin
         public function getListProjectAdmin(request $request)
         {
             try {
                 $statut = $request->input('statut');
                 $adminService = new AdminService();
                 $resultList = $adminService->getListProjectAdmin($statut);
                 
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
                 $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer","data"=>$ex);
              
                 return $error;
             } catch (\Exception $ex) {
                  ParamsFactory::logException($ex);
                 $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer", "data"=>$ex);
            
                 return $error;
             }
         }
              //end of get List Project Admin

    	 // get List Project Admin
         public function getListProject(request $request)
         {
             try {
             
                 $adminService = new AdminService();
                 $resultList = $adminService->getListProject();
                 
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
                 $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer","data"=>$ex);
              
                 return $error;
             } catch (\Exception $ex) {
                  ParamsFactory::logException($ex);
                 $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des projets. Veuillez réessayer", "data"=>$ex);
            
                 return $error;
             }
         }
              //end of get List Project Admin
	

}
