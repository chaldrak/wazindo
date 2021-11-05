<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class StatutProjet
 * 
 * @property int $id
 * @property string $nom
 * @property string $code
 * @property int $ordre
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * 
 * @property Collection|Projet[] $projets
 *
 * @package App\Models
 */
class StatutProjet extends Model
{
	protected $table = 'statut_projet';
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $casts = [
		'ordre' => 'int'
	];

	protected $fillable = [
		'nom',
		'code',
		'ordre'
	];

	public function projets()
	{
		return $this->hasMany(Projet::class);
	}
}
