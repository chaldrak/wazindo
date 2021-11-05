<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Helpers\Factory\ParamsFactory;

class RegisterMessage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $nom;
    protected $code;
    protected  $prenom;
    protected  $objet;
    protected  $email;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($_nom, $_prenom, $_email, $_objet, $_code)
    {

        $this->objet = $_objet;
        $this->prenom = $_prenom;
        $this->nom = $_nom;
        $this->email = $_email;
        $this->code = $_code;

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try{
            \App\Helpers\Factory\ParamsFactory::sendMessageRegister( $this->objet,$this->prenom,$this->nom,$this->email,$this->code);

}
     catch(\Exception $ex){
         \Log::error($ex);
    ParamsFactory::logException($ex, null);
}
}
}

