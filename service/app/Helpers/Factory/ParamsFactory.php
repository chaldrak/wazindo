<?php

namespace App\Helpers\Factory;

use Input;
use Request;
use App\Models\Profil;
use App\Models\Projet;
use App\Mail\ContactMail;
// use Mail;
// use Illuminate\Support\Facades\Mail;
use App\Models\VideoProjet;



use App\Models\ModePaiement;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use App\Models\TypeContribution;
use Illuminate\Support\Facades\Log;
use App\Exceptions\WazindoException;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;



class ParamsFactory {


    private static $menuRoles =  array(
        array("role"=>"administrateur", "attribs" => array("dashb", "op_main", "consul_day", "rensei_day", "presc_day", "ven_day", "enc_day", "visiteurs",
            "rech_main", "visites", "presc_all", "ven_all", "stats_main", "stat_glob", "visites", "presc_all", "ven_all", "stats_main", "stat_glob", "stat_bur",
            "param_main", "bur", "vill", "comm", "depart", "prod", "cat_prod", "info_main", "objets", "type_obj", "regis", "secu_main" , "profil", "role" 	)),

        array("role"=>"accueil", "attribs" => array("dashb", "op_main", "consul_day", "rensei_day", "presc_day", "ven_day", "enc_day", "visiteurs")),
        array("role"=>"caissier", "attribs" => array("op_main", "enc_day"))
    ); //liste des menus par role

        //tableau des nombres de 1 à 31
 public static $numbersTab = array( 1 => "premier", 2 => "deux", 3 => "trois", 4 => "quatre", 5 => "cinq",
  6 => "six", 7 => "sept", 8 => "huit", 9 => "neuf",  10 => "dix", 11 => "onze",
  12 => "douze", 13 => "treize", 14 => "quatorze", 15 => "quinze",
  16 => "seize", 17 => "dix-sept", 18 => "dix-huit", 19 => "dix-neuf", 20 => "vingt", 21 => "vingt et un",
  22 => "vingt-deux", 23 => "vingt-trois", 24 => "vingt-quatre", 25 => "vingt-cinq",  26 => "vingt-six",
  27 => "vingt-sept", 28 => "vingt-huit", 29 => "vingt-neuf", 30 => "trente",  31 => "trente et un");

 public static $monthsTab = array( 1 => "janvier", 2 => "février", 3 => "mars", 4 => "avril", 5 => "mai",
  6 => "juin", 7 => "juillet", 8 => "août", 9 => "septembre",  10 => "octobre", 11 => "novembre",  12 => "décembre" );

 public static $defaultYear = "quinze";
 public static $defaultDay = "";
 public static $defaultMonth = "";

 //account params
 public static $defaultGeeceeteeUserId = 1;
 public static $defaultGeeceeteeAccountId = 1;
 public static $geeceeteeDocPath = ""; //
 public static $defaultEmailSender = "noreply@geeceetee.com";
 public static $defaultEmailReceiver = "noreply@gmail.com";
 public static $defaultDelayBannishment = 1; //1 minutes for test , 48h for production
 
 public static $PROJECT_STATUS_PROPOSE		= "PROPOSE";
 public static $PROJECT_STATUS_VALIDE_INIT  = "VALIDE_INIT";
 public static $PROJECT_STATUS_EN_LIGNE 	= "EN_LIGNE";
 public static $PROJECT_STATUS_PUBLIE 		= "PUBLIE";
 public static $PROJECT_STATUS_CLOTURE 		= "CLOTURE";
		 

    //reset mail
    public static function sendMail($file,$type_organisation,$titre_projet,$porteur,$pays,$email,$departement,$commune,$categorie,$montant_collecter,$duree_campagne,$description_projet,$contrepartie){
        try{
            \Log::error($porteur);

            //date du jour
            $dateJour = new Carbon();
          
            $emailreceiver = "info@wazindo.com";
            $mailSubject = "Soumission de projet de M./Mme ". $porteur ." sur WAZINDO";
            $mailData = array(
                "type_organisation" => $type_organisation,
        "titre_projet" => $titre_projet,
        "porteur" => $porteur,
        "pays" => $pays,
        "file" => $file,
        "departement" => $departement,
        "commune" => $commune,
        "categorie" => $categorie,
        "montant_collecter" => $montant_collecter,
        "duree_campagne" => $duree_campagne,
        "description_projet" => $description_projet,
        "contrepartie" => $contrepartie,
             "email" => $email,
                "subject" => $mailSubject,
                
            );
            //met le message dans une file d'attente
            \Log::error($mailSubject);
            \Log::error($email);

            Mail::to($emailreceiver)
            ->cc($email)
            ->queue(new \App\Mail\ContactMail($file,$mailSubject,$email, $type_organisation,$titre_projet,$porteur,$pays,$departement,$commune,$categorie,$montant_collecter,$duree_campagne,$description_projet,$contrepartie));
            \Log::error("envoi");

            return true;

        }catch(\Exception $ex){
            \Log::error($ex->getMessage());
            \Log::error($email);

            \Log::error("erreur d'envoi");
            return false;
        }
    }//sendResetMail



 //genere un code pr compte
 public static function generatePasswordCode($paramLen) {
    $mdp = ""; $nbAlea = ""; //$paramLen = 10;
    $catalogue= '1234567890abcdefghijklmngopqrstuvwxyz@#=';
    // Initialise le générateur
    srand(((int)((double)microtime()*1000003)) );
    for ($i = 0; $i < $paramLen; $i++) {
        $nbAlea = rand(0, (strlen($catalogue) -1));
        $mdp .= $catalogue[$nbAlea] ;
    }
    $result = strtolower($mdp);
    return $result;
}//fin generatePasswordCode


  //reset mail
  public static function resetPassword($objet,$mdp,$email, $login){
    try{
  
        //date du jour
        $dateJour = new Carbon();
      
        $mailData = array(
            "mdp" => $mdp,
            "objet" => $objet,
            "email" => $email,
            "login" => $login,
            
        );
        //met le message dans une file d'attente
     

        Mail::to($email)->queue(new \App\Mail\ResetPassword($objet,$mdp, $email, $login));
        \Log::error("envoi");

        return true;

    }catch(\Exception $ex){
        \Log::error($ex->getMessage());
        \Log::error($email);

        \Log::error("erreur d'envoi");
        return false;
    }
}//sendResetMail

  //reset mail
  public static function sendMessageRegister($objet,$prenom,$nom,$email,$code){
    try{
  
        //date du jour
        $dateJour = new Carbon();
      
        $emailSender = "info@wazindo.com";
        $mailData = array(
            "nom" => $nom,
    "prenom" => $prenom,
    "objet" => $objet,
    "code" => $code,
         "email" => $email,
            
        );
        //met le message dans une file d'attente
     

        Mail::to($email)->queue(new \App\Mail\RegisterMessage($objet,$prenom,$nom,$emailSender,$code));
        \Log::error("envoi");

        return true;

    }catch(\Exception $ex){
        \Log::error($ex->getMessage());
        \Log::error($email);

        \Log::error("erreur d'envoi");
        return false;
    }
}//sendResetMail

  //reset mail
  public static function sendMessageDeleteProfil($objet,$motif,$email){
    try{
  
        //date du jour
        $dateJour = new Carbon();
      
        $emailSender = "info@wazindo.com";
        $mailData = array(
            "nom" => $nom,
    "prenom" => $prenom,
    "objet" => $objet,
    "code" => $code,
         "email" => $email,
            
        );
        //met le message dans une file d'attente
     

        Mail::to($emailSender)->queue(new \App\Mail\DeleteProfilMessage($objet,$motif,$email));
        \Log::error("envoi");

        return true;

    }catch(\Exception $ex){
        \Log::error($ex->getMessage());
        \Log::error($email);

        \Log::error("erreur d'envoi");
        return false;
    }
}//sendResetMail
     

    //reset mail
    public static function sendMailContact($message,$objet,$prenom,$nom,$email){
        try{
      
            //date du jour
            $dateJour = new Carbon();
          
            $emailreceiver = "info@wazindo.com";
            $mailData = array(
                "nom" => $nom,
        "prenom" => $prenom,
        "objet" => $objet,
        "message" => $message,
             "email" => $email,
                
            );
            //met le message dans une file d'attente
         

            Mail::to($emailreceiver)->queue(new \App\Mail\Contact($message,$objet,$prenom,$nom,$email));
            \Log::error("envoi");

            return true;

        }catch(\Exception $ex){
            \Log::error($ex->getMessage());
            \Log::error($email);

            \Log::error("erreur d'envoi");
            return false;
        }
    }//sendResetMail

    //reset compte
    public static function sendMessageReset($message,$objet,$email){
        try{
      
            //date du jour
            $dateJour = new Carbon();
          
            $emailreceiver = "info@wazindo.com";
            $mailData = array(
        
        "objet" => $objet,
        "message" => $message,
             "email" => $email,
                
            );
            //met le message dans une file d'attente
         

            Mail::to($emailreceiver)->queue(new \App\Mail\ContactResetMessage($message,$objet,$email));
            \Log::error("envoi");

            return true;

        }catch(\Exception $ex){
            \Log::error($ex->getMessage());
            \Log::error($email);

            \Log::error("erreur d'envoi");
            return false;
        }
    }//sendResetMail
    //reset mail
    public static function sendMessageContact($message,$objet,$prenom,$nom,$email, $telephone){
        try{
      
            //date du jour
            $dateJour = new Carbon();
          
            $emailreceiver = "info@wazindo.com";
            $mailData = array(
                "nom" => $nom,
        "prenom" => $prenom,
        "telephone" => $telephone,
        "objet" => $objet,
        "message" => $message,
             "email" => $email,
                
            );
            //met le message dans une file d'attente
         

            Mail::to($emailreceiver)->queue(new \App\Mail\ContactMessage($message,$objet,$prenom,$nom,$email,$telephone));
            \Log::error("envoi");

            return true;

        }catch(\Exception $ex){
            \Log::error($ex->getMessage());
            \Log::error($email);

            \Log::error("erreur d'envoi");
            return false;
        }
    }//sendResetMail

    //fonctions statiques de recherche



    	//log une exception
        public static function logException($ex, $request=null) {
            try{
                $appException = new \Exception();
                $appException = $ex;
                $message = "Message: ". $appException->getMessage() . " Trace: ". $appException->getTraceAsString().
                    " Fichier: ".   $appException->getFile();
                \Log::error("");
                \Log::error($message);
                \Log::error("");
    
                //ip
                if($request !== undefined || $request !== null){
                    $ip = $request->ip();
                    $userAgent = $request->header('User-Agent');
                    $more = $request->header('User-Agent');
    
                    $log = new LogAction();
                    $log->date_action = time();
                    $log->code_user = "UNKNOWN";
                    $log->action = $message;
                    $log->user_ip = $ip;
                    $log->user_agent = $userAgent;
                    $log->user_more = $message;
                    $log->save();
                }
    
            }catch(\Exception $e){    }
        }//fin logException
    

//formate une date en datetime
public static function convertToDateTime($obj) {
    try{
        //get parts from dates
        $beninTimeZone = 'Africa/Porto-Novo';
        //start date
        $dateResult = new Carbon;
        if ($obj !== ""){
            $dayDebut = substr($obj,8,2);
            $monthDebut = substr($obj,5,2);
            $yearDebut = substr($obj,0,4);

            $hourDebut = 00;
            $minuteDebut = 00;

            $dateResult = Carbon::create($yearDebut, $monthDebut, $dayDebut, $hourDebut, $minuteDebut, 00, $beninTimeZone);

        }
        return $dateResult;
    }catch(\Exception $ex){
        \Log::error($ex->getMessage());
        return date("Y/m/d");
    }
}//fin convertToDateTime


}//fin ParamsFactory