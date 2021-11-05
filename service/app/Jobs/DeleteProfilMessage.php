<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Helpers\Factory\ParamsFactory;

class DeleteProfilMessage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected  $motif;
    protected  $objet;
    protected  $email;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($_motif, $_email, $_objet)
    {

        $this->objet = $_objet;
        $this->motif = $_motif;
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
            \App\Helpers\Factory\ParamsFactory::sendMessageDeleteProfil( $this->objet,$this->motif,$this->email);

}
     catch(\Exception $ex){
         \Log::error($ex);
    ParamsFactory::logException($ex, null);
}
}
}

