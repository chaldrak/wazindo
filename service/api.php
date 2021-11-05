<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return "good"; // $request->user();
});

Route::prefix('v1/live/')->group(function () {

            //ws de parametrages
            //categories de projets
            Route::get('params/categories', 'ParameterController@getListCategories');
            Route::post('params/categorie', 'ParameterController@createCategorie');
            Route::put('params/categorie', 'ParameterController@updateCategorie');
            Route::delete('params/categories/{id}', 'ParameterController@removeCategorie');

            //pays
            Route::get('params/countries', 'ParameterController@getListCountries');
            Route::post('params/countrie', 'ParameterController@createCountrie');
            Route::post('params/countrie', 'ParameterController@updateCountrie');

            //pays / departements / communes
            Route::get('params/country/{id}/departments', 'ParameterController@getListDepartements');
            Route::post('params/country/departments', 'ParameterController@createDepartement');
            Route::get('operations/payslist', 'ParameterController@getListPays');
            Route::get('operations/listdepartementbypays', 'ParameterController@getListDepartementCountry');
            Route::get('operations/listcommunebydepartement/{id}', 'ParameterController@getListCommuneByDepartement');


            //ws d'operations
            //pour projet specifique
            Route::get('operations/projects/{id}/contributions', 'OperationController@getListContribution');
            Route::post('operations/project/contribute', 'OperationController@createContribution');
            Route::get('operations/projects/{id}/counterparts', 'OperationController@getListContrepartie');
            Route::get('operations/projects/{id}/news', 'OperationController@getListActualites');
            Route::get('operations/projects/{id}/comments', 'OperationController@getListCommentaire');
            Route::get('operations/category/{id}/projects', 'OperationController@getListProject');
            
            Route::put('operations/project/', 'OperationController@updateProjectAsPorteur');


            //publicites solidaires
            Route::get('operations/pubs/list', 'OperationController@getListPubs');
            Route::get('operations/pub/latest', 'OperationController@getListLatestPubs');
            Route::post('operations/pub/create', 'OperationController@createPubs');
            Route::post('operations/pub/watch', 'OperationController@createContributionVideo');

            //recherche projets et filtres associes
            Route::get('operations/projectsbycategories', 'OperationController@getListProjectByCategories');
            Route::get('operations/projects/categories', 'ParameterController@getProjectsCategories');
            Route::get('operations/projects/lastest', 'OperationController@getLatestProjects');
            
            Route::get('operations/projects/latest', 'OperationController@getListLatestProject');


            Route::post('operations/lignefinancer/create', 'OperationController@createLigneFinance');
            Route::get('operations/lignefinancer/list/{id}', 'OperationController@getListLigneFinance');
            Route::get('operations/lignefinancer/delete/{id}', 'OperationController@deleteLigneFinance');


            Route::post('operations/projet/updatestatus', 'OperationController@updateStatusProjet');

            Route::post('operations/document/create', 'OperationController@createDocument');


            Route::post('operations/contrepartie/create', 'OperationController@createContrepartie');
            Route::get('operations/contrepartie/list/{id}', 'OperationController@getListContrepartie');
            Route::get('operations/contrepartie/delete/{id}', 'OperationController@deleteContrepartie');

            Route::get('operations/categorieprojetlist', 'OperationController@getCategorieProjet');
            Route::get('operations/oganisationprojetlist', 'OperationController@getOrganisationProjet');


            //interface contact
            Route::post('params/contact/sendmessage',  'ContactjobController@sendMail');
            Route::post('params/contact/messagecontact',  'ContactjobController@ContactMail');
            Route::post('operation/sendmailprojet',  'ContactjobController@sendmailprojet');

            Route::post('operation/savepropositionprojet',  'OperationController@createPropositionProjet');

            Route::get('operations/contributionbyprojet/{id}', 'OperationController@getListContributionByProjet');
            Route::get('operations/contributeurbyprojet/{id}', 'OperationController@getListContributeurByProjet');
            Route::post('operations/projectsbyuser', 'OperationController@getListProjectByUser');

            Route::get('operations/message/list/{email_address}', 'OperationController@getListMessage');


            Route::get('operations/diffusion/list/{email_address}', 'OperationController@getListDiffusion');
            Route::post('operations/diffusion/create/', 'OperationController@CreateDiffusion');

            //ws d'authentifications
            Route::post('auth/register', 'AuthenticationController@registerUser');
            Route::post('auth/login', 'AuthenticationController@loginUser');
            Route::post('auth/updateProfil', 'AuthenticationController@updateProfil');
            Route::post('auth/deleteProfil', 'AuthenticationController@deleteProfil');

            //stats
            Route::get('operations/stats/global', 'StatsController@getPublicHomeStats');

});


//interface admin
Route::prefix('admin/live/')->group(function () {

    //operations
    Route::post('operations/listproject', 'AdminController@getListProjectAdmin');
    Route::post('operations/project/reject', 'OperationController@rejectProject');
    Route::post('operations/campagnes', 'OperationController@getListProjectAdmin');
    Route::post('operations/porteurs', 'OperationController@getListProjectAdmin');

    Route::post('operations/projets', 'AdminController@getListProjectAdmin');
    Route::post('operations/updatestatusprojet', 'AdminController@updateProjectStatus');
    

    //statistiques
    Route::post('stats/statistiquesgenerales', 'OperationController@getListProjectAdmin');

    //parametres
    Route::post('parameters/categories', 'ParameterController@getListProjectAdmin');
    Route::post('parameters/sliders', 'ParameterController@getListProjectAdmin');
    Route::post('parameters/modespaiement', 'ParameterController@getListProjectAdmin');
    Route::post('parameters/commissions', 'ParameterController@getListProjectAdmin');
    Route::post('parameters/notifications', 'ParameterController@getListProjectAdmin');

});
