<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactResetMessage extends Mailable
{
    public  $objet;
    public  $contenu;
    public  $email;



    /**
     * Create a new message instance.
     *
     * @return void
     */

    public function __construct($_contenu, $_objet,$_email)
    {
        //

        $this->contenu = $_contenu;
        $this->objet = $_objet;
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