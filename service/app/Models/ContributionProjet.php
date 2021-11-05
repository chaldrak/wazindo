<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ContributionProjet
 * 
 * @property int $id
 * @property int $contributeur_id
 * @property int $projet_id
 * @property Carbon|null $date_contrib
 * @property int|null $montant
 * @property string $transaction_id
 * @property bool|null $est_public
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property int|null $type_contrib_id
 * @property int|null $video_id
 * @property int|null $paiement_id
 *
 * @package App\Models
 */
class ContributionProjet extends Model
{
	protected $table = 'contribution_projet';
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $casts = [
		'contributeur_id' => 'int',
		'projet_id' => 'int',
		'montant' => 'int',
		'est_public' => 'bool',
		'type_contrib_id' => 'int',
		'video_id' => 'int',
		'transaction_id' => 'string',
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
		'transaction_id',
		'type_contrib_id',
		'video_id',
		'paiement_id'
	];

	public function projet()
	{
		return $this->belongsTo(Projet::class);
	}

	public function profil()
	{
		return $this->belongsTo(User::class, 'contributeur_id');
	}

	public function paiement()
	{
		return $this->belongsTo(Paiement::class);
	}
}
