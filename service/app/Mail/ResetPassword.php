<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPassword extends Mailable
{


    public  $objet;
    public  $email;
    public  $mdp;
    public  $login;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($_objet,$_mdp, $_email, $_login)
    {
        //

        $this->objet = $_objet;
        $this->mdp = $_mdp;
        $this->email = $_email;
        $this->login = $_login;

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        return $this->subject($this->objet)
        ->from($this->email)->view('emails.resetpassword');
    }
}
