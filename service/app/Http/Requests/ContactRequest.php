<?php

namespace App\Http\Requests;

use App\Http\Requests\ContactRequest;
use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        return [
                'nom' => 'bail|required|between:1,20|alpha',
                'prenom' => 'bail|required|between:1,20|alpha',
                'telephone' => 'bail|required|between:5,20|alpha',
                'email' => 'bail|email',
                'message' => 'bail|required|max:250'
        ];
    }
}
