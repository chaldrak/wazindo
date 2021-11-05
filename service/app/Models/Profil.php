<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * Class Profil
 * 
 * @property int $id
 * @property string $nom
 * @property string $prenom
 * @property string $login
 * @property string $mot_de_passe
 * @property string $email
 * @property string $bibliographie
 * @property string|null $telephone
 * @property int|null $pays_id
 * @property string $url_facebook
 * @property string $url_twitter
 * @property string $url_youtube
 * @property string $url_linkedin
 * @property int|null $type_auth_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property boolean $est_actif
 * @property string $code_activation
 * @property TypeAuth|null $type_auth
 * @property Collection|Commentaire[] $commentaires
 * @property Collection|Contribution[] $contributions
 * @property Collection|Diffusion[] $diffusions
 * @property Collection|Projet[] $projets
 *
 * @package App\Models
 */
class Profil extends Authenticatable
{


	protected $table = 'profil';
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $casts = [
		'pays_id' => 'int',
		'type_auth_id' => 'int',
		'est_actif' => 'boolean',
	];

	protected $fillable = [
		'nom',
		'prenom',
		'login',
		'mot_de_passe',
		'email',
		'bibliographie',
		'telephone',
		'url_twitter',
		'url_facebook',
		'url_youtube',
		'url_linkedin',
		'pays_id',
		'type_auth_id',
		'code_activation',
		'est_actif'
	];

	public function type_auth()
	{
		return $this->belongsTo(TypeAuth::class);
	}

	public function commentaires()
	{
		return $this->hasMany(Commentaire::class, 'commente_par_id');
	}

	public function contributions()
	{
		return $this->hasMany(Contribution::class, 'contributeur_id');
	}

	public function diffusions()
	{
		return $this->hasMany(Diffusion::class);
	}

	public function projets()
	{
		return $this->hasMany(Projet::class, 'porteur_id');
	}
}