<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMessage extends Mailable
{
    public $nom;
    public  $prenom;
    public  $objet;
    public  $contenu;
    public  $email;
    public  $telephone;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($_contenu, $_objet,$_prenom, $_nom,  $_email, $_telephone)
    {
        //

        $this->contenu = $_contenu;
        $this->objet = $_objet;
        $this->prenom = $_prenom;
        $this->telephone = $_telephone;
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

        return $this->subject($this->objet)
        ->from($this->email)->view('emails.contactmessage');
    }
}
