<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Parametre
 * 
 * @property int $id
 * @property string|null $type
 * @property string|null $code
 * @property string|null $valeur
 * @property Carbon|null $updated_at
 * @property Carbon|null $created_at
 *
 * @package App\Models
 */
class Parametre extends Model
{
	protected $table = 'parametre';
	protected $dateFormat = 'j. F Y H:i:s';

	protected $fillable = [
		'type',
		'code',
		'valeur'
	];
}
