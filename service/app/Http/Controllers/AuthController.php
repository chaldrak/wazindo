<?php

namespace App\Http\Controllers;

use App\Models\Profil;
use Illuminate\Support\Facades\Crypt;
use App\Helpers\Factory\ParamsFactory; 
use App\Helpers\Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:55',
            'email' => 'email|required|unique:users',
            'password' => 'required|confirmed'
        ]);

        $validatedData['password'] = bcrypt($request->password);

        $user = User::create($validatedData);

        $accessToken = $user->createToken('authToken')->accessToken;

        return response([ 'user' => $user, 'access_token' => $accessToken]);
    }

    public function login(Request $request)
    {
        $loginData = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if (!auth()->attempt($loginData)) {
            return response(['message' => 'Invalid Credentials']);
        }

        $accessToken = auth()->user()->createToken('authToken')->accessToken;

        return response(['user' => auth()->user(), 'access_token' => $accessToken]);

    }

     
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
                        $codeCript = Crypt::encryptString($code);
    
                        //send new code to user
                        try{
                            $mailJob = (new \App\Jobs\RegisterMessage($name, $surname, $receiverMail, $objet, $codeCript))
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


}