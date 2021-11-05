<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DeleteProfilMessage extends Mailable
{
    public  $objet;
    public  $email;
    public  $motif;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($_objet,$_motif, $_email)
    {
        //

        $this->objet = $_objet;
        $this->motif = $_motif;
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
        ->from($this->email)->view('emails.deleteprofilmessage');
    }
}
