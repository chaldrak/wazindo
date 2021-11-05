<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DetailListeDiffusionPorteur
 * 
 * @property int $id
 * @property string|null $nom
 * @property string|null $telephone
 * @property string|null $email
 * @property int|null $liste_diffusion_porteur_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property ListeDiffusionPorteur|null $liste_diffusion_porteur
 *
 * @package App\Models
 */
class DetailListeDiffusionPorteur extends Model
{
	protected $table = 'detail_liste_diffusion_porteur';

	protected $casts = [
		'liste_diffusion_porteur_id' => 'int'
	];

	protected $fillable = [
		'nom',
		'telephone',
		'email',
		'liste_diffusion_porteur_id'
	];

	public function liste_diffusion_porteur()
	{
		return $this->belongsTo(ListeDiffusionPorteur::class);
	}
}
