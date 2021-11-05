<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ModePaiement
 * 
 * @property int $id
 * @property string|null $nom
 * @property string|null $code
 * 
 * @property Collection|Contribution[] $contributions
 * @property Collection|Paiement[] $paiements
 *
 * @package App\Models
 */
class ModePaiement extends Model
{
	protected $table = 'mode_paiement';
	public $timestamps = false;
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $fillable = [
		'nom',
		'code'
	];

	public function contributions()
	{
		return $this->hasMany(Contribution::class, 'paiement_id');
	}

	public function paiements()
	{
		return $this->hasMany(Paiement::class);
	}
}
