<?php
namespace App\Services;

use App\Exceptions\WazindoException;
use App\Models\Profil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;



class PaymentService
{
                    protected $baseUrl;
                    protected $clientHttp;
                    protected $headers;

                    public function __construct($baseUrl)
                    {
                        $this->baseUrl = $baseUrl;
                        
                        $this->clientHttp = new Client(['base_uri' => $this->baseUrl ]);
                        $this->headers = [
                            'cache-control' => 'no-cache',
                            'Accept' => 'application/json',
                            'Content-Type' =>   "application/json",
                        ];
                    }

                    //detect network type: moov or mtn
                    public function detectNetworkType($phoneNumber)
                {
                    try {

                        //network keys
                        $networkPrefix = collect(array(
                            //mtn keys
                            "51" => "MTN", "52" => "MTN","61" => "MTN","62" => "MTN","66" => "MTN",
                            "67" => "MTN", "69" => "MTN","90" => "MTN","91" => "MTN","96" => "MTN",
                            "97" => "MTN", 

                            //moov keys
                            "60" => "MOOV", "63" => "MOOV","64" => "MOOV","65" => "MOOV","68" => "MOOV",
                            "94" => "MOOV", "95" => "MOOV","98" => "MOOV","99" => "MOOV",
                        ));

                        //check phone length

                        //get very first letter if phone length is ok
                        $phonePrefix = substr($phoneNumber, 0, 2);

                        //

                        //if mtn: array()
                        //$searchPhone = $networkPrefix::where("$phonePrefix")
                        // if(array_key_exists($phonePrefix, $networkPrefix)){
                            
                        // }

                        //else

                    }  catch(\Exception $ex) {
                        return array("status" => "false", "error" => $ex->getMessage() );
                    }
                }//end detectNetworkType




                    //request payment on momo platform
                    public function requestPaymentOnMobilePaymentGateway($operationUrlAction, $phoneNumber, $amount, $firstName, $lastName, 
                        $transRef, $clientId, $userName, $password)
                    {
                    try {
                        
                        //payment gateway param
                        $paymentParam = array(
                            "msisdn" => $phoneNumber,
                            "amount" => $amount,
                            "firstname" => $firstName,
                            "lastname" => $lastName,
                            "transref" => $transRef,
                            "clientid" => $clientId,
                        );

                        //'Basic ' + btoa(unescape(encodeURIComponent(YOUR_USERNAME + ':' + YOUR_PASSWORD))))

                        \Log::error("url" . $this->baseUrl . "/requestpayment");
    
                        //calling validation ws
                        $request = $this->clientHttp->post($this->baseUrl . $operationUrlAction, [
                            'headers' => $this->headers,
                            'timeout'         => 300,  'http_errors' => true,// 'connect_timeout' => true,
                            'body' => json_encode($paymentParam), 
                            'config' => [	'curl' => [	CURLOPT_SSL_VERIFYPEER => false,	CURLOPT_SSL_VERIFYHOST => false  ]	],
                            'allow_redirects' => [	'max'             => 10,	'strict'          => true,
                            'referer'         => true, 	'protocols'       => ['https'],  'track_redirects' => true ],
                            'auth' => [$userName, $password]
                        ]);

                        \Log::error("entree ici 2");
    
                        $response = null;  $status = null;
                        if ($request != null) {
                            $response = $request->getBody()->getContents();
                            $status = $request->getStatusCode();
                        }

                        \Log::error("entree ici 3");
                        \Log::error($response);
                        \Log::error($status);
                        
                        if ($response && $status === 200 && $response !== 'null') {
    
                            $validationResult = (object)json_decode(utf8_encode($response));
                            
                            \Log::error($response);

                            \Log::error($validationResult->responsecode);
                            
                            //\Log::error($validationResult);

                            //if transaction succesfull
                            $confirmationResult = array();
                            if(true){
                                $confirmationResult = $this->getTransactionStatus($operationUrlAction, $transRef, $clientId, 
                                $userName, $password);
                            }

                            return array("status" => "false", "request_result" => $validationResult, "confirm_result" => $confirmationResult );  
                            
                           
                        } else { //le ws coman ets inoignable: envoyer un mail
                            //TODO
                            //\Log::error("Retour avec erreur");
                            return array("status" => "false", "data" => "" );  
                        }
                        
                    }
                    catch(\Exception $ex) {
                     
                        return array("status" => "false", "error" => $ex->getMessage() );
                    }
    
                    }//end requestPaymentOnMobilePaymentGateway



                    //get transaction status from api
                    public function getTransactionStatus($operationUrlAction,   $transRef, $clientId, $userName, $password)
                    {
                    try {
                        
                        //payment gateway param
                        $paymentParam = array(
                            "transref" => $transRef,
                            "clientid" => $clientId,
                        );
    
                        //calling validation ws
                        $request = $this->clientHttp->post($this->baseUrl . $operationUrlAction, [
                            'headers' => $this->headers,
                            'timeout'         => 300,  'http_errors' => true,// 'connect_timeout' => true,
                            'body' => json_encode($paymentParam), 
                            'config' => [	'curl' => [	CURLOPT_SSL_VERIFYPEER => false,	CURLOPT_SSL_VERIFYHOST => false  ]	],
                            'allow_redirects' => [	'max'             => 10,	'strict'          => true,
                            'referer'         => true, 	'protocols'       => ['https'],  'track_redirects' => true ],
                            'auth' => [$userName, $password]
                        ]);
    
                        $response = null;  $status = null;
                        if ($request != null) {
                            $response = $request->getBody()->getContents();
                            $status = $request->getStatusCode();
                        }

                        \Log::error("confirmation ici 3");
                        \Log::error($response);
                        \Log::error($status);
                        
                        if ($response && $status === 200 && $response !== 'null') {
    
                            $validationResult = (object)json_decode(utf8_encode($response));
                            
                            \Log::error($response);

                            return array("status" => "false", "data" => $validationResult );  
                            
                           
                        } else { //le ws coman ets inoignable: envoyer un mail
                            //TODO
                            //\Log::error("Retour avec erreur");
                            return array("status" => "false", "data" => "" );  
                        }
                    }
                    catch(\Exception $ex) {
                     
                        return array("status" => "false", "error" => $ex->getMessage() );
                    }
    
                    }//end getTransactionStatus
    
    
    
}
