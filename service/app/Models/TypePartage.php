<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class TypePartage
 * 
 * @property int $id
 * @property string $code
 * @property int $valeur
 *
 * @package App\Models
 */
class TypePartage extends Model
{
	protected $table = 'type_partage';
	public $timestamps = false;
	protected $dateFormat = 'j. F Y H:i:s';

	protected $casts = [
		'valeur' => 'int'
	];

	protected $fillable = [
		'code',
		'valeur'
	];
}
