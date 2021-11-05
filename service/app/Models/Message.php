<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Message
 * 
 * @property int $id
 * @property int $porteur_id
 * @property int $projet_id
 * @property string $titre
 * @property string $description
 * @property Carbon|null $date_envoi
 * @property bool|null $statut
 * 
 * @property User $user
 * @property Projet $projet
 *
 * @package App\Models
 */
class Message extends Model
{
	protected $table = 'message';
	

	protected $casts = [
		'porteur_id' => 'int',
		'projet_id' => 'int',
		'statut' => 'bool'
	];

	protected $dates = [
		'date_envoi'
	];

	protected $fillable = [
		'porteur_id',
		'projet_id',
		'titre',
		'description',
		'date_envoi',
		'statut'
	];

	public function user()
	{
		return $this->belongsTo(User::class, 'porteur_id');
	}

	public function projet()
	{
		return $this->belongsTo(Projet::class, 'projet_id');
	}
}
