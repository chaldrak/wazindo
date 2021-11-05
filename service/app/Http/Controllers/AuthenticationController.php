<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthenticationService;
use App\Helpers\Factory\ParamsFactory;
use App\Exceptions\WazindoException;
use App\Jobs\ContactJob;
use App\Models\Profil;
use App\Models\User;
use App\Helpers\Carbon\Carbon;
use App\Services\PaymentService;
use Illuminate\Support\Facades\Crypt;

class AuthenticationController extends Controller
{
	
    public function registerTest(Request $request)
    {
        $email = $request->input('email');

        $searchProfile=User::where("email","like",$email)->get();
        if (!$searchProfile->isEmpty()) {
            return array( "status" => "error", "message" => "Cette adresse email existe déjà !", "data" =>"" );
        }

        $data = $request->validate([
            'nom' => 'required|max:255',
            'prenom' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'telephone' => 'required|max:100',
            'pays_id' => 'required|max:11',
            'password' => 'required|confirmed'
        ]);

        $data['password'] = bcrypt($request->password);

        $user = User::create($data);

       
        $token = $user->createToken('API Token')->accessToken;

        return response([ 'user' => $user, 'token' => $token]);
    }

    public function loginTest(Request $request)
    {
        $data = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        \Log::error($data);

        if (!auth()->attempt($data)) {
            return response(['error_message' => 'Incorrect Details. 
            Please try again']);
        }

        $token = auth()->user()->createToken('API Token')->accessToken;

        return response(['user' => auth()->user(), 'token' => $token]);

    }
    
    
    // login User
    public function loginUser(Request $request)
    {

        try {

            //check data
            if (empty($request->input('password')) && empty($request->input('email'))) {
               return array("status" => "error", "message" => "Veuillez fournir toutes les informations pour vous connecter", "data" => "");
           }

            $email = $request->input('email');
            $password = $request->input('password');
          

            //check user credentials
            $authService = new AuthenticationService();

            $serviceResult = $authService->authenticateUser($email, $password);

            //give status on project supported by user

            $data = array (
                'email' => $email,
                'password' => $password
            );

            if (!auth()->attempt($data)) {
                return response(['error_message' => 'Incorrect Details. 
                Please try again']);
            }

            $token = auth()->user()->createToken('API Token')->accessToken;

            return array("status" => $serviceResult["status"], "message" => $serviceResult["message"], "data" => $serviceResult["data"],'token' => $token,);

        }
        catch (WazindoException $ex)
        {
            \Log::error($ex);
            \Log::error("we are here");

                $error = array("status" => "error", "message" => $ex->getMessage() );
                ParamsFactory::logException($ex);
                return $error;

        }   catch (\Illuminate\Database\QueryException $ex) {

            $error = array("status" => "error", "message" => "Une erreur est survenue. Veuillez réessayer");
            ParamsFactory::logException($ex);
            return $error;
       }
       catch (\Exception $ex) {

            $error = array("status" => "error", "message" => "Impossible de vérifier vos paramètres de connexion. Veuillez les corriger puis réessayer");
            ParamsFactory::logException($ex);
            return $error;
       }
    }
	// end of login User

// reset User
public function resetUser(Request $request)
{
    try {
   

        //check data
        if (empty($request->input('email_address'))) {
           return array("status" => "error", "message" => "Veuillez fournir toutes les informations pour vous connecter", "data" => "");
       }

       $email = trim($request->input('email_address'));
       $code = ParamsFactory::generatePasswordCode(15);
       $objet = 'Inscription sur Wazindo';

        //save
        $authService = new AuthenticationService();
        $serviceResult = $authService->resetUser($email);


        $codeCript = Crypt::encryptString($code);

        \Log::error('code');
        \Log::error($email);

        \Log::error($codeCript);

                    try{
                        $mailJob = (new \App\Jobs\ResetMessage($email, $objet, $codeCript))
                            ->delay(Carbon::now()->addSeconds(60));
                        dispatch($mailJob);
        
                    }catch(\Illuminate\Database\QueryException $ex){
                        return array( "status" => "error", "data" => "",  "message" => "Votre mail n'a pas été envoyé" );
                    }
        return array("status" => $serviceResult["status"], "message" => $serviceResult["message"], "data" => $serviceResult["data"]);

   }
   catch (WazindoException $ex)
   {
           $error = array("status" => "error", "message" => $ex->getMessage() );
           ParamsFactory::logException($ex);
           return $error;

   }   catch (\Illuminate\Database\QueryException $ex) {
               $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création du compte. Veuillez réessayer");
               ParamsFactory::logException($ex);
               return $error;
   }
   catch (\Exception $ex) {
       $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création du compte. Veuillez réessayer");
       ParamsFactory::logException($ex);
       return $error;
   }
}
	// end of ResetUser

    //update user profile
    public function updateProfil(Request $request)
    {

        try {

            //check data
            if (empty($request->input('email'))) {
               return array("status" => "error", "message" => "Veuillez fournir toutes les informations pour modifier votre profil", "data" => "");
            }

            $email = $request->input('email');
            $biographie = $request->input('biographie');
            $prenom = $request->input('prenom');
            $nom = $request->input('nom');
            $facebook = $request->input('facebook');
            $twitter = $request->input('twitter');
            $linkedln = $request->input('linkedln');
            $youtube = $request->input('youtube');

            //save
            $authService = new AuthenticationService();
            $serviceResult = $authService->updateProfil($email, $biographie, $prenom, $nom, $facebook,$twitter,$youtube,$linkedln);

            return array("status" => $serviceResult["status"], "message" => $serviceResult["message"], "data" => $serviceResult["data"]);

        }
        catch (WazindoException $ex)
        {
            $error = array("status" => "error", "message" => $ex->getMessage() );
            ParamsFactory::logException($ex);
            return $error;

    }    catch (\Illuminate\Database\QueryException $ex) {
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de  création du compte. Veuillez réessayer");
              ParamsFactory::logException($ex);
              return $error;
       }
       catch (\Exception $ex) {
            $error = array("status" => "error", "message" => "Une erreur est survenue. Veuillez réessayer");
            ParamsFactory::logException($ex);
            return $error;
       }
    }
	// end of update user profile

	// delete Profil
    public function deleteProfil(Request $request)
    {

        try {

            //check data
            if (empty($request->input('email'))) {
               return array("status" => "error", "message" => "Veuillez fournir toutes les informations pour supprimer votre profil", "data" => "");
           }
            $email = $request->input('email');
            $motif = $request->input('motif');
            $objet = 'Demande de suppression de compte';


            try{
                $mailJob = (new \App\Jobs\DeleteProfilMessage($motif, $email, $objet))
                    ->delay(Carbon::now()->addSeconds(60));
                dispatch($mailJob);

            }catch(\Illuminate\Database\QueryException $ex){
                return array( "status" => "error", "data" => "",  "message" => "Votre mail n'a pas été envoyé" );
            }
return array("status" => "success", "message" => 'Votre demande de suppresion de votre profil a été envoyée avec succès.');

            //save
            // $authService = new AuthenticationService();
            // $serviceResult = $authService->deleteProfil($email);

            // return array("status" => $serviceResult["status"], "message" => $serviceResult["message"], "data" => $serviceResult["data"]);

        }
        catch (WazindoException $ex)
        {
            $error = array("status" => "error", "message" => $ex->getMessage() );
            ParamsFactory::logException($ex);
            return $error;

        }   catch (\Illuminate\Database\QueryException $ex) {
            $error = array("status" => "error", "message" => "Une erreur est survenue. Veuillez réessayer");
            ParamsFactory::logException($ex);
            return $error;
       }
       catch (\Exception $ex) {
             $error = array("status" => "error", "message" => "Impossible de créer le compte. Veuillez réessayer");
            ParamsFactory::logException($ex);
            return $error;
       }

    }
	// end of delete Profilrofil


     //register user
     public function registerUser(Request $request)
     {
         try {
        
            $data = $request->validate([
                'nom' => 'required|max:255',
                'prenom' => 'required|max:255',
                'email' => 'required|email|unique:users',
                'telephone' => 'required|max:100',
                'pays_id' => 'required|max:11',
                'password' => 'required|confirmed'
            ]);
    
            $data['password'] = bcrypt($request->password);
    
            $user = User::create($data);
    
            $token = $user->createToken('API Token')->accessToken;
    
$searchProfile=User::where("email","like",$user->email)->get();
     $code = ParamsFactory::generatePasswordCode(15);
            $objet = 'Inscription sur Wazindo';

            $searchFirst =  $searchProfile->first();
        $searchFirst -> code_activation = $code; 
        $searchFirst->date_exp = Carbon::now()->addHour(2);
        $searchFirst -> save();
        \Log::error($searchFirst);


             $codeCript = Crypt::encryptString($code);

                         try{
                             $mailJob = (new \App\Jobs\RegisterMessage($user->nom,$user->prenom, $user->email, $objet, $codeCript))
                                 ->delay(Carbon::now()->addSeconds(60));
                             dispatch($mailJob);
             
                         }catch(\Illuminate\Database\QueryException $ex){
                             return array( "status" => "error", "data" => "",  "message" => "Votre mail n'a pas été envoyé" );
                         }
             return array("status" => "success", "message" => 'Votre compte a été crée avec succès', 'token' => $token);

        }
        catch (WazindoException $ex)
        {
                $error = array("status" => "error", "message" => $ex->getMessage() );
                ParamsFactory::logException($ex);
                return $error;

        }   catch (\Illuminate\Database\QueryException $ex) {
                    $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création du compte. Veuillez réessayer");
                    ParamsFactory::logException($ex);
                    return $error;
        }
        catch (\Exception $ex) {
            $error = array("status" => "error", "message" => "Une erreur est survenue lors de la création du compte. Veuillez réessayer");
            ParamsFactory::logException($ex);
            return $error;
        }
     }
	 //end of register user


          //resend registration code test
          public function resendRegistrationCode($email){
            try{
                
                // return "Cooming soon";
                    \Log::error($email);
                    $userVerif = User::where("email", "like", "$email")->get();

                    if($userVerif->isEmpty()){
                            return array("status" => "error", "message" => "Impossible de trouver l'utilisateur");
                    }

                    $user =  $userVerif->first();
                    if($user->est_actif){
                        return view('emails.accountisalreadyactive');
                    }else{
                    $id = $user->id;
                    $name = $user->nom;
                    $surname = $user->prenom;
                    $receiverMail = $user->email;

                    $code = ParamsFactory::generatePasswordCode(15);
                    $user->code_activation = $code;
                    $user->date_exp = Carbon::now()->addHour(2);
                    $user->save();
                    $objet = 'Inscription sur Wazindo';

                    //send new code to user

                    try{
                        $mailJob = (new \App\Jobs\RegisterMessage($name, $surname, $receiverMail, $objet, $code))
                            ->delay(Carbon::now()->addSeconds(60));
                        dispatch($mailJob);
        
                    }catch(\Illuminate\Database\QueryException $ex){
                        return array( "status" => "error", "data" => "",  "message" => "Votre mail n'a pas été envoyé" );
                    }

                        return view("emails.registrationactivationnewcode");
                    //     return array("status" => "success", "data" => "$activationData");

                    }
                    }catch(\Illuminate\Database\QueryException $ex){
                            $error = array("status" => "error", "message" => "An error occured. Please try again" );
                            ParamsFactory::logException($ex);
                            return $error;
                        }catch(\Exception $ex){
                            $error = array("status" => "error", "message" => "An error occured. Please try again" );
                            ParamsFactory::logException($ex);
                            return $error;
                    }
            }
    //fin resendCode

  //update user profile
  public function resetPassword(Request $request)
  {
      
      try {
        $email = trim($request->input('email_address'));
          $objet = 'Rénitialisation du mot de passe';
          $mdp = ParamsFactory::generatePasswordCode(6);

          //save
          $authService = new AuthenticationService();
          $serviceResult = $authService->resetPassword($mdp, $email, $objet);

          return array("status" => "success", "message" => "Votre nouveau mot de passe a été envoyé à votre adresse email.", "data" => '' );

      }
      catch (\Illuminate\Database\QueryException $ex)
      {
          $error = array("status" => "error", "message" => $ex->getMessage());
          ParamsFactory::logException($ex);
          return $error;
      
      }  catch (\Illuminate\Database\QueryException $ex) {
          $error = array("status" => "error", "message" => "Une erreur est survenue. Veuillez réessayer");
          ParamsFactory::logException($ex);
          return $error;
     }
     catch (\Exception $ex) {
      $error = array("status" => "error", "message" => "Une erreur est survenue. Veuillez réessayer");
      ParamsFactory::logException($ex);
      return $error;
     }

  }
  // end resetPassword




//check user registration code
public function checkUserRegistrationCode($code,  Request $request){
try{
    
    $decrypted = Crypt::decryptString($code);
    //check activation code
    $userActivationSearch = User::where("code_activation", "like", "$decrypted")->get();
    
    //if wrong code
    if($userActivationSearch->isEmpty()){
        return view('emails.registrationcodenotfound');
    }
    $userActivation = $userActivationSearch->first();
    $email = $userActivation->email;
    $idUser = $userActivation->id;

   

    //if activation link expired
    $dateActivation = Carbon::parse($userActivation->date_exp); //expired 
    if(( $dateActivation )->lte( Carbon::now() )){
        if($userActivation->est_actif){
            return view('emails.registrationcodealreadyused')->with("email",$email);
        }else{
             return view('emails.registrationcodetimeout')->with("email",$email);
        }
       
    }

    //update user status
    $user = $userActivation;
    $user->est_actif = true;
    $user->save();

    //activation code is ok
    return view('emails.registrationok');

}catch(\Illuminate\Database\QueryException $ex){
    $error = array("status" => "error", "message" => "Une erreur vient de se produire. Veuillez réessayer" );
    ParamsFactory::logException($ex, $request);
    // return $error;
    return view('emails.defaulterrorpage'); //->with("email",$email);

}catch(\Exception $ex){
    $error = array("status" => "error", "message" => "Une erreur vient de se produire. Veuillez réessayer" );
    ParamsFactory::logException($ex, $request);
    
    return view('emails.defaulterrorpage'); //->with("email",$email);
        
    //return $error;
}
} //fin checkUserRegistrationCode




                      //test oscar service
                      public function testPaymentService() {
                        try{
            
            
                            //params for search
                        
                            //$baseUrl = ParamsFactory::$PRM_COMAN_MANUT_BASE_URL;
            
                            $baseUrl = "https://qosic.net:8443/QosicBridge/user/";
            
                           
                            //call ws coman
                            $testService = new PaymentService($baseUrl);

                            //mtn params
                            $phoneNumber = "+22966188157";
                            $amount = 1; 
                            $firstName = "Dossa";
                            $lastName = "Violetta";
                            $transRef = time();
                            $clientId = "wazindoCB7";
                            $userAccountLogin = "QSUSR231";
                            $userAccountPassword = "SWFfLJhbL49nJUg3VNri";
                            $operationUrlAction = "requestpayment";

                            //moov params
                            // $phoneNumber = "22963399996";
                            // $amount = 1; 
                            // $firstName = "Dossa";
                            // $lastName = "Violetta";
                            // $transRef = time();
                            // $clientId = "wazindoJMV";
                            // $userAccountLogin = "QSUSR231";
                            // $userAccountPassword = "SWFfLJhbL49nJUg3VNri";
                            // $operationUrlAction = "requestpaymentmv";
            
                            $resultWS = $testService->requestPaymentOnMobilePaymentGateway($operationUrlAction, $phoneNumber, $amount, $firstName, $lastName, 
                            $transRef, $clientId, $userAccountLogin, $userAccountPassword);
            
                            return $resultWS;
            
                        } catch (\Exception $ex) {
                            $error = array("status" => "error", "message" => "Une erreur est survenue. Veuillez réessayer");
                            //ParamsFactory::logException($ex, null);
                            return $error;
                        }
                    }//end testPaymentService
        

                    


}