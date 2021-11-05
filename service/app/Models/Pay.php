<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Pay
 * 
 * @property int $id
 * @property int $indicatif
 * @property string $code
 * @property string $nom
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @package App\Models
 */
class Pay extends Model
{
	protected $table = 'pays';
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $casts = [
		'indicatif' => 'int'
	];

	protected $fillable = [
		'indicatif',
		'code',
		'nom'
	];
}
