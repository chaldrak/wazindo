<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Helpers\Factory\ParamsFactory;

class Contact implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $nom;
    protected  $prenom;
    protected  $objet;
    protected  $message;
    protected  $email;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($_nom, $_prenom, $_objet, $_email, $_message)
    {

        $this->message = $_message;
        $this->objet = $_objet;
        $this->prenom = $_prenom;
        $this->nom = $_nom;
        $this->email = $_email;

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try{
            \App\Helpers\Factory\ParamsFactory::sendMailContact( $this->message,$this->objet,$this->prenom,$this->nom,$this->email);

}
     catch(\Exception $ex){
         \Log::error($ex);
    ParamsFactory::logException($ex, null);
}
}
}
