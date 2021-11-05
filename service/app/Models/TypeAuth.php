<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TypeAuth
 * 
 * @property int $id
 * @property string $nom
 * @property string $code
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * 
 * @property Collection|Profil[] $profils
 *
 * @package App\Models
 */
class TypeAuth extends Model
{
	protected $table = 'type_auth';
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $fillable = [
		'nom',
		'code'
	];

	public function profils()
	{
		return $this->hasMany(User::class);
	}
}
