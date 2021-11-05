<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMail extends Mailable
{
   
    public $subject;
    public  $type_organisation;
    public  $titre_projet;
    public  $porteur;
    public  $pays;
    public  $departement;
    public  $commune;
    public  $categorie;
    public  $montant_collecter;
    public  $duree_campagne;
    public  $description_projet ;
    public  $contrepartie;
    public  $email;
    public  $file;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($_file,$_subject,$_email, $_type_organisation,$_titre_projet,$_porteur,$_pays,$_departement,$_commune,$_categorie,$_montant_collecter,$_duree_campagne,$_description_projet,$_contrepartie)
    {
        //

        // \Log::error("on est la");

        $this->type_organisation = $_type_organisation;
        $this->titre_projet = $_titre_projet;
        $this->porteur = $_porteur;
        $this->pays = $_pays;
        $this->file = $_file;
        $this->departement = $_departement;
        $this->commune = $_commune;
        $this->categorie = $_categorie;
        $this->montant_collecter = $_montant_collecter;
        $this->duree_campagne = $_duree_campagne;
        $this->description_projet = $_description_projet;
        $this->contrepartie = $_contrepartie;
        $this->subject = $_subject;
        $this->email = $_email;
        


    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $urlFichier = storage_path('app/fichier/soumission/'. $this->file);
        // $urlFichier = 'http://127.0.0.1/wazindo_officiel/service/storage/app/fichier/soumission/'. $this->file;
        \Log::error("on est a lenvoi");
        \Log::error($urlFichier);

        return $this->subject($this->subject)
        ->from($this->email)->view('emails.contact')
        ->attach($urlFichier);
    }
}
