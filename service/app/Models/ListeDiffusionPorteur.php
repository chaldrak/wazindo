<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ListeDiffusionPorteur
 * 
 * @property int $id
 * @property string|null $nom
 * @property int|null $profil_id
 * @property int|null $nombre_contact
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property User|null $user
 * @property Collection|DetailListeDiffusionPorteur[] $detail_liste_diffusion_porteurs
 *
 * @package App\Models
 */
class ListeDiffusionPorteur extends Model
{
	protected $table = 'liste_diffusion_porteur';

	protected $casts = [
		'profil_id' => 'int',
		'nombre_contact' => 'int',
	];

	protected $fillable = [
		'nom',
		'nombre_contact',
		'profil_id'
	];

	public function user()
	{
		return $this->belongsTo(User::class, 'profil_id');
	}

	public function detail_liste_diffusion_porteurs()
	{
		return $this->hasMany(DetailListeDiffusionPorteur::class);
	}
}
