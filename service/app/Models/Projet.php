<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Projet
 * 
 * @property int $id
 * @property string $titre
 * @property string $resume
 * @property string $description
 * @property int $categorie_id
 * @property int|null $commune_id
 * @property int $porteur_id
 * @property int $montant_collecte
 * @property string|null $photo_porteur
 * @property string|null $photo_mini
 * @property int $statut_projet_id
 * @property string $mot_porteur
 * @property string $url_facebook
 * @property string $url_twitter
 * @property string $url_youtube
 * @property string $url_linkedin
 * @property string $adresse
 * @property string $telephone
 * @property string $adresse_email
 * @property int $type_organisation_id
 * @property int $montant_a_collecte
 * @property int $duree_campagne
 * @property string $lien_document_projet
 * @property string $bibliographie
 * @property Carbon $created_at
 * @property Carbon|null $updated_at
 * @property string $reference
 * @property string $desc_contrepartie
 * @property int $pays_id
 * 
 * @property Categorie $categorie
 * @property Commune|null $commune
 * @property StatutProjet $statut_projet
 * @property TypeOrganisation $type_organisation
 * @property Profil $profil
 * @property Collection|Actualite[] $actualites
 * @property Collection|Commentaire[] $commentaires
 * @property Collection|Contribution[] $contributions
 * @property Collection|LigneFinanceProjet[] $ligne_finance_projets
 *
 * @package App\Models
 */
class Projet extends Model
{
	protected $table = 'projet';
	//protected $dateFormat = 'j. F Y H:i:s';

	protected $casts = [
		'categorie_id' => 'int',
		'commune_id' => 'int',
		'porteur_id' => 'int',
		'montant_collecte' => 'int',
		'statut_projet_id' => 'int',
		'type_organisation_id' => 'int',
		'montant_a_collecte' => 'int',
		'duree_campagne' => 'int',
		'pays_id' => 'int'
	];

	protected $fillable = [
		'titre',
		'resume',
		'description',
		'categorie_id',
		'commune_id',
		'porteur_id',
		'montant_collecte',
		'photo_porteur',
		'photo_mini',
		'statut_projet_id',
		'mot_porteur',
		'type_organisation_id',
		'montant_a_collecte',
		'duree_campagne',
		'lien_document_projet',
		'reference',
		'desc_contrepartie',
		'url_twitter',
		'url_facebook',
		'url_youtube',
		'url_linkedin',
		'adresse',
		'telephone',
		'adresse_email',
		'bibliographie',
		'pays_id'
	];


	public function pays()
	{
		return $this->belongsTo(Pay::class);
	}


	public function categorie()
	{
		return $this->belongsTo(Categorie::class);
	}

	public function commune()
	{
		return $this->belongsTo(Commune::class);
	}

	public function statut_projet()
	{
		return $this->belongsTo(StatutProjet::class);
	}

	public function type_organisation()
	{
		return $this->belongsTo(TypeOrganisation::class);
	}

	public function profil()
	{
		return $this->belongsTo(User::class, 'porteur_id');
	}

	public function actualites()
	{
		return $this->hasMany(Actualite::class);
	}

	public function commentaires()
	{
		return $this->hasMany(Commentaire::class);
	}

	public function contributions()
	{
		return $this->hasMany(ContributionProjet::class);
	}

	public function ligne_finance_projets()
	{
		return $this->hasMany(LigneFinanceProjet::class);
	}

	public function contreparties()
	{
		return $this->hasMany(ContrepartieProjet::class);
	}
}
