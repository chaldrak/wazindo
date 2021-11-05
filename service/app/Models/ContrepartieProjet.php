<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ContrepartieProjet
 * 
 * @property int $id
 * @property int $projet_id
 * @property string $description
 * @property string $image
 * @property int $qte_totale
 * @property bool $est_illimite
 * @property Carbon $date_liv_est
 * @property int $qte_cde
 * @property int $mt_min
 * @property int $mt_max
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @package App\Models
 */
class ContrepartieProjet extends Model
{
	protected $table = 'contrepartie_projet';
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $casts = [
		'projet_id' => 'int',
		'qte_totale' => 'int',
		'est_illimite' => 'bool',
		'qte_cde' => 'int',
		'mt_min' => 'int',
		'mt_max' => 'int'
	];

	protected $dates = [
		'date_liv_est'
	];

	protected $fillable = [
		'projet_id',
		'description',
		'image',
		'qte_totale',
		'est_illimite',
		'date_liv_est',
		'qte_cde',
		'mt_min',
		'mt_max'
	];
}
