<?php

namespace App\Exceptions;

use Exception;

class WazindoException extends Exception
{
    /**
     * Report the exception.
     *
     * @return void
     */
    public function report()
    {
        \Log::debug('Une erreur est survenue dans l\'exécution de votre application');
    }

    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function render($request)
    {
        return response()->view('error', [], 500);
    }
}
