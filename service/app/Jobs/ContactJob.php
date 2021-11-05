<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Helpers\Factory\ParamsFactory;

class ContactJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $email;
    protected  $type_organisation;
    protected  $titre_projet;
    protected  $porteur;
    protected  $pays;
    protected  $departement;
    protected  $commune;
    protected  $categorie;
    protected  $montant_collecter;
    protected  $duree_campagne;
    protected  $description_projet ;
    protected  $contrepartie;
    protected  $file;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($_file,$_type_organisation,$_titre_projet,$_porteur,$_pays,$_email,$_departement,$_commune,$_categorie,$_montant_collecter,$_duree_campagne,$_description_projet,$_contrepartie)
    {
      

        $this->type_organisation = $_type_organisation;
        $this->titre_projet = $_titre_projet;
        $this->porteur = $_porteur;
        $this->file = $_file;
        $this->pays = $_pays;
        $this->email = $_email;
        $this->departement = $_departement;
        $this->commune = $_commune;
        $this->categorie = $_categorie;
        $this->montant_collecter = $_montant_collecter;
        $this->duree_campagne = $_duree_campagne;
        $this->description_projet = $_description_projet;
        $this->contrepartie = $_contrepartie;

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try{
            \App\Helpers\Factory\ParamsFactory::sendMail(
                $this->file,$this->type_organisation,$this->titre_projet,$this->porteur,$this->pays,$this->email,$this->departement,$this->commune,$this->categorie,$this->montant_collecter,$this->duree_campagne,$this->description_projet,$this->contrepartie);

}
     catch(\Exception $ex){
    ParamsFactory::logException($ex, null);
}
}
}
