<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Departement
 * 
 * @property int $id
 * @property string $nom
 * @property int $pays_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * 
 * @property Collection|Commune[] $communes
 *
 * @package App\Models
 */
class Departement extends Model
{
	protected $table = 'departement';
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $casts = [
		'pays_id' => 'int'
	];

	protected $fillable = [
		'nom',
		'pays_id'
	];

	public function communes()
	{
		return $this->hasMany(Commune::class);
	}
}
