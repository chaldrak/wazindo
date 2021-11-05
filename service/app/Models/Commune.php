<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Commune
 * 
 * @property int $id
 * @property string|null $nom
 * @property int|null $departement_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Departement|null $departement
 * @property Collection|Projet[] $projets
 *
 * @package App\Models
 */
class Commune extends Model
{
	protected $table = 'commune';
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $casts = [
		'departement_id' => 'int'
	];

	protected $fillable = [
		'nom',
		'departement_id'
	];

	public function departement()
	{
		return $this->belongsTo(Departement::class);
	}

	public function projets()
	{
		return $this->hasMany(Projet::class);
	}
}
