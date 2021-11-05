<?php

namespace App\Http\Controllers;

use App\Jobs\ContactJob;
use Illuminate\Http\Request;
use App\Helpers\Carbon\Carbon;
use App\Http\Controllers\Controller;
use App\Services\AuthenticationService;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ContactjobController extends Controller
{





    // send mail projet
    public function sendmailprojet(Request $request)
    {
        try {

            $inputArray = json_decode($request->get('data'));

            //recupère les champs fournis 

            $type_organisation = $inputArray->type_organisation;
            $titre_projet = $inputArray->titre_projet;
            $porteur = $inputArray->porteur;
            $pays = $inputArray->pays;
            $email = $inputArray->email;
            $departement = $inputArray->departement;
            $commune = $inputArray->commune;
            $categorie = $inputArray->categorie;
            $montant_collecter = $inputArray->montant_collecter;
            $duree_campagne = $inputArray->duree_campagne;
            $description_projet = $inputArray->description_projet;
            $contrepartie = $inputArray->contrepartie;
            \Log::error($pays);
            $extension  = "";
            $fileName = "";
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                \Log::error($file);
                $extension = $file->getClientOriginalExtension();
                \Log::error($extension);

                // $fileName = 'filename.pdf';  //'_' .time().'_'.mt_rand(1000, 1000000)
                $fileName = date('Ymd') . '.' . $extension;  //'_' .time().'_'.mt_rand(1000, 1000000)
                \Log::error($fileName);
                $pathName = '/fichier/soumission/' . $fileName; //public_path().
                // $pathName = '/'. $fileName; //public_path().
                \Log::error($pathName);

                Storage::disk('local')->put($pathName,  File::get($file));
                \Log::error("saves");
            }
            try {

                $mailJob = (new \App\Jobs\ContactJob($fileName, $type_organisation, $titre_projet, $porteur, $pays, $email, $departement, $commune, $categorie, $montant_collecter, $duree_campagne, $description_projet, $contrepartie))
                    ->delay(Carbon::now()->addSeconds(60));
                dispatch($mailJob);
            } catch (\Illuminate\Database\QueryException $ex) {
                ParamsFactory::logException($ex);
                return array("status" => "error", "data" => "",  "message" => "Votre mail n'a pas été envoyé");
            }

            //retour
            return array("status" => "error", "data" => "",  "message" => "Votre mail a été envoyé avec succès");
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
    } //end of send mail projet

  

    //Contact Mail
    public function ContactMail(Request $request)
    {
        try {
            //recupère les champs fournis dans ton code et adapte les valeurs

            $nom = $request->input('nom');
            $prenom = $request->input('prenom');
            $objet = $request->input('objet');
            $email = $request->input('email');
            $telephone = $request->input('telephone');
            $message = $request->input('message');



            try {
                $mailJob = (new \App\Jobs\ContactMessage($nom, $prenom, $objet, $email, $message, $telephone))
                    ->delay(Carbon::now()->addSeconds(60));
                dispatch($mailJob);
            } catch (\Illuminate\Database\Exception $ex) {
                ParamsFactory::logException($ex);
                return array("status" => "error", "data" => "",  "message" => "Votre mail n'a pas été envoyé");
            }

            //retour
            return array("status" => "succès", "data" => "",  "message" => "Votre mail a été envoyé avec succès");
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
    } // end of Contact Mail
}
