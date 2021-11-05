<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Actualite
 * 
 * @property int $id
 * @property string $titre
 * @property string $description
 * @property int $projet_id
 * @property Carbon $date_actualite
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * 
 * @property Projet $projet
 *
 * @package App\Models
 */
class Actualite extends Model
{
	protected $table = 'actualite';
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $casts = [
		'projet_id' => 'int'
	];

	protected $dates = [
		'date_actualite'
	];

	protected $fillable = [
		'titre',
		'description',
		'projet_id',
		'date_actualite'
	];

	public function projet()
	{
		return $this->belongsTo(Projet::class);
	}
}
