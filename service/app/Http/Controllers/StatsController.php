<?php

namespace App\Http\Controllers;

use App\Mail\Contact;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Mail;
use App\Http\Requests\ContactRequest;
use Illuminate\Support\Facades\Validator;
use App\Helpers\Factory\ParamsFactory; 
use App\Services\OperationService;
use App\Exceptions\WazindoException;

class StatsController extends Controller
{

    	//get Stats
        public function getPublicHomeStats()
        {
            try {
                $operationService = new OperationService();
                $result = $operationService->getStats();
    
                return array("status" => "success", "message" => "", "data" => $result);
            }
        catch (WazindoException $ex)
            {
                $error = array("status" => "error", "message" => $ex->getMessage() );
                ParamsFactory::logException($ex);
                return $error;
    
        }		catch (\Illuminate\Database\QueryException $ex) {
                 ParamsFactory::logException($ex);
                $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des statistiques. Veuillez réessayer");
    
                return $error;
            } catch (\Exception $ex) {
                 ParamsFactory::logException($ex);
                $error = array("status" => "error", "message" => "Une erreur est survenue lors du chargement des statistiques. Veuillez réessayer");
           
                return $error;
            }
        }
        //end of get Stats
	

}
