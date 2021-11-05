<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SoutienSolidaire
 * 
 * @property int $id
 * @property Carbon|null $date_visualisation
 * @property int|null $pub_id
 * @property string|null $user_agent
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property PubSolidaire|null $pub_solidaire
 *
 * @package App\Models
 */
class SoutienSolidaire extends Model
{
	protected $table = 'soutien_solidaire';
	// protected $dateFormat = 'j. F Y H:i:s';

	protected $casts = [
		'pub_id' => 'int'
	];

	protected $dates = [
		'date_visualisation'
	];

	protected $fillable = [
		'date_visualisation',
		'pub_id',
		'user_agent'
	];

	public function pub_solidaire()
	{
		return $this->belongsTo(PubSolidaire::class, 'pub_id');
	}
}
