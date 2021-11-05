<?php

namespace App\Services;

use App\Exceptions\WazindoException;
use App\Models\Profil;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use SebastianBergmann\Environment\Console;
use App\Helpers\Carbon\Carbon;

class AuthenticationService
{
    public function __construct()
    {
    }
    //update Profil
    public function updateProfil($email, $biographie, $prenom, $nom, $facebook, $twitter, $youtube, $linkedln)
    {

        try {
            $searchProfile = User::where("email", "like", $email)->get();
            if ($searchProfile->isEmpty()) {
                return array("status" => "error", "message" => "Votre compte n'existe pas. Veuillez réessayer.", "data" => "");
            }
            $foundProfil = $searchProfile->first();
            $foundProfil->prenom = $prenom;
            $foundProfil->nom = $nom;
            $foundProfil->email = $email;
            $foundProfil->url_twitter = $twitter;
            $foundProfil->url_facebook = $facebook;
            $foundProfil->url_youtube = $youtube;
            $foundProfil->url_linkedin = $linkedln;
            $foundProfil->bibliographie = $biographie;
            $foundProfil->save();


            return array("status" => "success", "message" => "Votre compte a été modifié avec succès", "data" => $foundProfil);
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    }
    //end of  update Profil

    // delete Profil
    public function deleteProfil($email)
    {

        try {
            $searchProfile = User::where("email", "like", $email)->get();
            if (!$searchProfile->isEmpty()) {
                return array("status" => "error", "message" => "Votre compte n'existe pas. Veuillez réessayer.", "data" => "");
            }
            $foundProfil = $searchProfile->first();

            //remove now
            $foundProfil->delete();


            return array("status" => "success", "message" => "Votre compte a été supprimé avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            // throw $ex;
        } catch (\Exception $ex) {

            // throw $ex;
        }
    }
    //end of delete Profil

    //register User			
    public function registerUser($code, $email, $mdp, $nom, $prenom, $telephone, $pays)
    {

        try {
            $searchProfile = User::where("email", "like", $email)->get();
            if (!$searchProfile->isEmpty()) {
                return array("status" => "error", "message" => "Cette adresse email existe déjà !", "data" => "");
            }

            $hashedPassword = Hash::make($mdp);
            $newProfile = new User();
            $newProfile->email = $email;
            $newProfile->login = $email;
            $newProfile->password = $hashedPassword;

            $newProfile->nom = $nom;
            $newProfile->prenom = $prenom;
            $newProfile->code_activation = $code;
            $newProfile->telephone = $telephone;

            $newProfile->pays_id = $pays;

            $newProfile->save();

            return array("status" => "success", "message" => "Votre compte a été créé avec succès", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {
            throw $ex;
        } catch (\Exception $ex) {
            throw $ex;
        }
    }
    //end of register User	


    //authenticate user
    public function authenticateUser($email, $mdp)
    {
        try {
            $searchProfile = User::where("email", "like", $email)->get();

            if ($searchProfile->isEmpty()) {
                throw new WazindoException("Vos paramètres de connexion sont incorrects ou vous n'avez pas les droits requis pour accéder à cet espace. Veuillez réessayer");
            } else {
                $foundProfile = $searchProfile->first();
                $ckeckStatus = $searchProfile->first()->est_actif;
                $ckeckSt = $searchProfile->first()->telephone;


                if ($foundProfile->est_actif === false) {
                    return array("status" => "error", "message" => "Ce compte n'est pas encore actif. Merci de consulter tes mails pour le valider", "data" => '');
                }

                if (!Hash::check($mdp, $foundProfile->password)) {
                    return array("status" => "error", "message" => "Vos paramètres de connexion sont incorrects. Veuillez les corriger puis réessayer", "data" => '');
                } else {

                    $hasProjectSupported = true;

                    //profil object
                    $profileObject = array(
                        "email" => $foundProfile->email, "nom" => $foundProfile->nom, "prenom" => $foundProfile->prenom, "est_admin" => $foundProfile->est_admin,
                        "has_project_supported" => $hasProjectSupported, "bibliographie" => $foundProfile->bibliographie, "url_youtube" => $foundProfile->url_youtube, "url_twitter" => $foundProfile->url_twitter, "url_facebook" => $foundProfile->url_facebook, "url_linkedin" => $foundProfile->url_linkedin,
                    );

                    $foundProfile->mdp = "";
                    return array("status" => "success", "message" => "", "data" => $profileObject);
                }
            }

            // return array("status" => "success", "message" => "Veuillez vous connecter", "data" => "");

        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    } //end of authenticate User

    //reset User
    public function resetUser($email)
    {
        try {

            $searchProfile = User::where("email", "like", $email)->get();

            if ($searchProfile->isEmpty()) {
                throw new WazindoException("Votre email de connexion est incorrecte ou vous n'avez pas les droits requis pour accéder à cet espace. Veuillez réessayer");
            }

            return array("status" => "success", "message" => "Veuillez vous connecter", "data" => "");
        } catch (\Illuminate\Database\QueryException $ex) {

            throw $ex;
        } catch (\Exception $ex) {

            throw $ex;
        }
    } //end of authenticate User



    // update Categorie
    public function resetPassword($mdp, $email, $objet)
    {
        try {

            //check if email already used
            $searchUtilisateurByEmail = User::where("email", "like", "$email")->get();
            if ($searchUtilisateurByEmail->isEmpty()) {
                throw new WazindoException("Cette adresse email n'existe pas");
            }

            $searchFirst =  $searchUtilisateurByEmail->first();
            $hashedPassword = Hash::make($mdp);

            $searchFirst->mdp = $hashedPassword;
            $searchFirst->save();

            try {
                $mailJob = (new \App\Jobs\ResetPassword($mdp, $email, $objet, $searchFirst->login))
                    ->delay(Carbon::now()->addSeconds(60));
                dispatch($mailJob);
            } catch (\Illuminate\Database\QueryException $ex) {
                return array("status" => "error", "data" => "",  "message" => "Votre mail n'a pas été envoyé");
            }

            return true;
        } catch (\Illuminate\Database\QueryException $e) {
            throw $e;
        } catch (\Exception $e) {
            throw $e;
        }
    }
    // end of update Utilisateur




}
