<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Helpers\Factory\ParamsFactory;

class ResetPassword implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $mdp;
    protected  $objet;
    protected  $email;
    protected  $login;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($_mdp, $_email, $_objet, $_login)
    {
        $this->mdp = $_mdp;
        $this->email = $_email;
        $this->objet = $_objet;
        $this->login = $_login;

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try{
            \App\Helpers\Factory\ParamsFactory::resetPassword( $this->objet, $this->mdp, $this->email, $this->login);

            }
     catch(\Exception $ex){
         \Log::error($ex);
    ParamsFactory::logException($ex, null);
}
}
}