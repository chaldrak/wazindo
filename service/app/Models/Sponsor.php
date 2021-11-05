<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Sponsor
 * 
 * @property int $id
 * @property string|null $nom
 * @property string|null $adresse
 * @property string|null $contact
 * @property string|null $personne_reference
 * @property Carbon|null $updated_at
 * @property Carbon|null $created_at
 * 
 * @property Collection|FinancementSponsor[] $financement_sponsors
 *
 * @package App\Models
 */
class Sponsor extends Model
{
	protected $table = 'sponsor';
	// protected $dateFormat = 'j. F Y H:i:s';

	protected $fillable = [
		'nom',
		'adresse',
		'contact',
		'personne_reference'
	];

	public function financement_sponsors()
	{
		return $this->hasMany(FinancementSponsor::class);
	}
}
