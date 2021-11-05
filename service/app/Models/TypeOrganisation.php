<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TypeOrganisation
 * 
 * @property int $id
 * @property string $nom
 * @property string $code
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * 
 * @property Collection|Projet[] $projets
 *
 * @package App\Models
 */
class TypeOrganisation extends Model
{
	protected $table = 'type_organisation';
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $fillable = [
		'nom',
		'code'
	];

	public function projets()
	{
		return $this->hasMany(Projet::class);
	}
}
