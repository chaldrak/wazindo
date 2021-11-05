<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Contribution
 * 
 * @property int $id
 * @property int $contributeur_id
 * @property int $projet_id
 * @property Carbon|null $date_contrib
 * @property int|null $montant
 * @property bool|null $est_public
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property int|null $type_contrib_id
 * @property int|null $video_id
 * @property int|null $paiement_id
 * 
 * @property Profil $profil
 * @property Projet $projet
 * @property VideoProjet|null $video_projet
 * @property ModePaiement|null $mode_paiement
 *
 * @package App\Models
 */
class Contribution extends Model
{
	protected $table = 'contribution';
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $casts = [
		'contributeur_id' => 'int',
		'projet_id' => 'int',
		'montant' => 'int',
		'est_public' => 'bool',
		'type_contrib_id' => 'int',
		'video_id' => 'int',
		'paiement_id' => 'int'
	];

	protected $dates = [
		'date_contrib'
	];

	protected $fillable = [
		'contributeur_id',
		'projet_id',
		'date_contrib',
		'montant',
		'est_public',
		'type_contrib_id',
		'video_id',
		'paiement_id'
	];

	public function profil()
	{
		return $this->belongsTo(User::class, 'contributeur_id');
	}

	public function projet()
	{
		return $this->belongsTo(Projet::class);
	}

	public function video_projet()
	{
		return $this->belongsTo(VideoProjet::class, 'video_id');
	}

	public function mode_paiement()
	{
		return $this->belongsTo(ModePaiement::class, 'paiement_id');
	}
}
