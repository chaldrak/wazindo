<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class VideoProjet
 * 
 * @property int $id
 * @property string|null $reference
 * @property int $projet_id
 * @property string|null $titre
 * @property string|null $url_video
 * @property string|null $description
 * @property Carbon|null $date_ajout
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * 
 * @property Collection|Contribution[] $contributions
 *
 * @package App\Models
 */
class VideoProjet extends Model
{
	protected $table = 'video_projet';
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $casts = [
		'projet_id' => 'int'
	];

	protected $dates = [
		'date_ajout'
	];

	protected $fillable = [
		'reference',
		'projet_id',
		'titre',
		'url_video',
		'description',
		'date_ajout'
	];

	public function contributions()
	{
		return $this->hasMany(Contribution::class, 'video_id');
	}
}
