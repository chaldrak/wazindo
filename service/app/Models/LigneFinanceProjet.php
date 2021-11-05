<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class LigneFinanceProjet
 * 
 * @property int $id
 * @property string|null $ligne_finance
 * @property string|null $montant
 * @property string|null $commentaire
 * @property int|null $projet_id
 * @property Carbon|null $date_mise_en_oeuvre
 * @property Carbon|null $deadline
 * @property Carbon|null $updated_at
 * @property Carbon|null $created_at
 * 
 * @property Projet|null $projet
 *
 * @package App\Models
 */
class LigneFinanceProjet extends Model
{
	protected $table = 'ligne_finance_projet';
	public $incrementing = false;
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $casts = [
		'id' => 'int',
		'projet_id' => 'int'
	];

	protected $dates = [
		'date_mise_en_oeuvre',
		'deadline'
	];

	protected $fillable = [
		'ligne_finance',
		'montant',
		'commentaire',
		'projet_id',
		'date_mise_en_oeuvre',
		'deadline'
	];

	public function projet()
	{
		return $this->belongsTo(Projet::class);
	}
}
