<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Contact extends Mailable
{
    public $nom;
    public  $prenom;
    public  $objet;
    public  $contenu;
    public  $email;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($_contenu, $_objet,$_prenom, $_nom,  $_email)
    {
        //

        $this->contenu = $_contenu;
        $this->objet = $_objet;
        $this->prenom = $_prenom;
        $this->nom = $_nom;
        $this->email = $_email;

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
\Log::error($this->objet);
\Log::error($this->nom);
\Log::error($this->prenom);
\Log::error($this->email);
\Log::error($this->contenu);
        return $this->subject($this->objet)
        ->from($this->email)->view('emails.contactsend');
    }
}
