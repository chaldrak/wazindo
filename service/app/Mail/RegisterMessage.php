<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RegisterMessage extends Mailable
{
    public $nom;
    public  $prenom;
    public  $objet;
    public  $email;
    public  $code;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($_objet,$_prenom, $_nom, $_email, $_code)
    {
        //

        $this->objet = $_objet;
        $this->prenom = $_prenom;
        $this->nom = $_nom;
        $this->code = $_code;
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
        ->from($this->email)->view('emails.registermessage');
    }
}
