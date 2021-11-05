<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Categorie
 * 
 * @property int $id
 * @property string $nom
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string|null $reference
 * @property string|null $icone
 * 
 * @property Collection|Projet[] $projets
 *
 * @package App\Models
 */
class Categorie extends Model
{
	protected $table = 'categorie';
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $fillable = [
		'nom',
		'reference',
		'icone'
	];

	public function projets()
	{
		return $this->hasMany(Projet::class);
	}
}
