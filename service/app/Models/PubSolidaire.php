<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PubSolidaire
 * 
 * @property int $id
 * @property string $titre
 * @property string $description
 * @property int $created_by_id
 * @property string|null $lien_image_projet
 * @property string|null $lien_video
 * @property int|null $total_vues
 * @property string|null $montant_soutien
 * @property string|null $montant_projet
 * @property string|null $montant_visualisation
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property User $user
 * @property Collection|FinancementSponsor[] $financement_sponsors
 * @property Collection|SoutienSolidaire[] $soutien_solidaires
 *
 * @package App\Models
 */
class PubSolidaire extends Model
{
	protected $table = 'pub_solidaire';
	// protected $dateFormat = 'j. F Y H:i:s';

	protected $casts = [
		'created_by_id' => 'int',
		'total_vues' => 'int'
	];

	protected $fillable = [
		'titre',
		'description',
		'created_by_id',
		'lien_image_projet',
		'lien_video',
		'total_vues',
		'montant_soutien',
		'montant_projet',
		'montant_visualisation'
	];

	public function user()
	{
		return $this->belongsTo(User::class, 'created_by_id');
	}

	public function financement_sponsors()
	{
		return $this->hasMany(FinancementSponsor::class, 'pub_id');
	}

	public function soutien_solidaires()
	{
		return $this->hasMany(SoutienSolidaire::class, 'pub_id');
	}
}
