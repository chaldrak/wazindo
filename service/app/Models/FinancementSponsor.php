<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class FinancementSponsor
 * 
 * @property int $id
 * @property int|null $sponsor_id
 * @property int|null $pub_id
 * @property string|null $montant_apport
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Sponsor|null $sponsor
 * @property PubSolidaire|null $pub_solidaire
 *
 * @package App\Models
 */
class FinancementSponsor extends Model
{
	protected $table = 'financement_sponsor';
	// protected $dateFormat = 'j. F Y H:i:s';

	protected $casts = [
		'sponsor_id' => 'int',
		'pub_id' => 'int'
	];

	protected $fillable = [
		'sponsor_id',
		'pub_id',
		'montant_apport'
	];

	public function sponsor()
	{
		return $this->belongsTo(Sponsor::class);
	}

	public function pub_solidaire()
	{
		return $this->belongsTo(PubSolidaire::class, 'pub_id');
	}
}
