<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Paiement
 * 
 * @property int $id
 * @property int|null $mode_paiement_id
 * @property int|null $montant_paye
 * @property string|null $statut
 * @property Carbon|null $date_paiement
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * 
 * @property ModePaiement|null $mode_paiement
 *
 * @package App\Models
 */
class Paiement extends Model
{
	protected $table = 'paiement';
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $casts = [
		'mode_paiement_id' => 'int',
		'montant_paye' => 'int'
	];

	protected $dates = [
		'date_paiement'
	];

	protected $fillable = [
		'mode_paiement_id',
		'montant_paye',
		'statut',
		'date_paiement'
	];

	public function mode_paiement()
	{
		return $this->belongsTo(ModePaiement::class);
	}
}
