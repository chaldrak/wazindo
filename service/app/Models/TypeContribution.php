<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class TypeContribution
 * 
 * @property int $id
 * @property string|null $nom
 * @property string|null $code
 *
 * @package App\Models
 */
class TypeContribution extends Model
{
	protected $table = 'type_contribution';
	public $timestamps = false;
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $fillable = [
		'nom',
		'code'
	];
}
