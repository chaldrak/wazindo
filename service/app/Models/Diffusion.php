<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Diffusion
 * 
 * @property int $id
 * @property string|null $nom
 * @property int|null $profil_id
 * 
 * @property Profil|null $profil
 * @property Collection|DetailDiffusion[] $detail_diffusions
 *
 * @package App\Models
 */
class Diffusion extends Model
{
	protected $table = 'diffusion';
	public $timestamps = false;
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $casts = [
		'profil_id' => 'int'
	];

	protected $fillable = [
		'nom',
		'profil_id'
	];

	public function profil()
	{
		return $this->belongsTo(User::class);
	}

	public function detail_diffusions()
	{
		return $this->hasMany(DetailDiffusion::class);
	}
}
