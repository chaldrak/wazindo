<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Commentaire
 * 
 * @property int $id
 * @property string $contenu
 * @property int $commente_par_id
 * @property int $projet_id
 * @property Carbon $date_commentaire
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * 
 * @property Profil $profil
 * @property Projet $projet
 *
 * @package App\Models
 */
class Commentaire extends Model
{
	protected $table = 'commentaire';
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $casts = [
		'commente_par_id' => 'int',
		'projet_id' => 'int'
	];

	protected $dates = [
		'date_commentaire'
	];

	protected $fillable = [
		'contenu',
		'commente_par_id',
		'projet_id',
		'date_commentaire'
	];

	public function profil()
	{
		return $this->belongsTo(User::class, 'commente_par_id');
	}

	public function projet()
	{
		return $this->belongsTo(Projet::class);
	}
}
