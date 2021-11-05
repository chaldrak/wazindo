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


    Route::post('auth/checkregister', 'AuthController@checkMailAndPhone');
    Route::get('/account/registration/retry/{email}', 'AuthController@resendRegistrationCode');
    Route::get('/account/registration/confirmation/{code}', 'AuthController@checkUserRegistrationCode');
   
            //ws de parametrages
            //categories de projets
            Route::get('params/categories', 'ParameterController@getListCategories');
            Route::get('operations/categories', 'ParameterController@getListCategories');
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
            Route::get('operations/projects/{reference}/details', 'OperationController@getProjectDetails');
            Route::get('operations/projects/{id}/contributions', 'OperationController@getListContribution');
            Route::get('operations/projects/{id}/counterparts', 'OperationController@getListContrepartie');
            Route::get('operations/projects/{id}/news', 'OperationController@getListActualites');
            Route::get('operations/projects/comments/{id}', 'OperationController@getListCommentaire');
            
            Route::get('operations/projects/commentslast/{id}', 'OperationController@getListCommentaireLimit');
            Route::get('operations/category/{id}/projects', 'OperationController@getListProject');
            Route::get('operations/pubsolidaire/listpubsolidaire', 'OperationController@getListPubSolidaire');

            //ecran daccueil interface publique
            Route::get('operations/categories/stats/projectspublished', 'OperationController@getStatsProjetPublishedByCategorie');
            
            Route::get('operations/projects/actualite/{id}', 'OperationController@getListActualite');


            //publicites solidaires
            Route::get('operations/pubs/list', 'OperationController@getListPubs');
            Route::get('operations/pub/latest', 'OperationController@getListLatestPubs');
          
            //recherche projets et filtres associes
            Route::get('operations/projectsbycategories', 'OperationController@getListProjectByCategories');
            Route::get('operations/projects/categories', 'ParameterController@getProjectsCategories');
            
            Route::get('operations/projects/latest', 'OperationController@getListLatestProject');
            Route::post('operations/projects/published', 'OperationController@getListPublishedProject');


            Route::get('operations/lignefinancer/list/{id}', 'OperationController@getListLigneFinance');

            Route::get('operations/imageurl/{name}', 'OperationController@getImageUrl');
            Route::get('operations/imagepuburl/{name}', 'OperationController@getImagePubUrl');

            Route::post('operations/projet/updatestatus', 'OperationController@updateStatusProjet');
           
           
            Route::post('operations/pubsolidaire/updateaftervisualisation', 'OperationController@updateAfterVisualisation');

         
            //Commentaire
         
            Route::get('operations/contrepartie/list/{id}', 'OperationController@getListContrepartie');

            Route::get('operations/categorieprojetlist', 'OperationController@getCategorieProjet');
            Route::get('operations/oganisationprojetlist', 'OperationController@getOrganisationProjet');


            //interface contact
            Route::post('params/contact/sendmessage',  'OperationController@saveMessage');
            Route::post('params/contact/messagecontact',  'ContactjobController@ContactMail');
            Route::post('operation/sendmailprojet',  'ContactjobController@sendmailprojet');


            Route::get('operations/contributionbyprojet/{email}', 'OperationController@getListContributionByProjet');
            Route::get('operations/contributionbyprofil/{email}', 'OperationController@getListContributionByProfil');
            Route::get('operations/contributeurbyprojet/{id}', 'OperationController@getListContributeurByProjet');

            //ws d'authentifications
            Route::post('auth/register', 'AuthenticationController@registerUser');
            Route::post('auth/login', 'AuthenticationController@loginUser');
          
            //stats
            Route::get('operations/stats/global', 'StatsController@getPublicHomeStats');
            Route::post('operations/listediffusion/create', 'OperationController@saveListeDiffusion');
            Route::get('operations/stats/projet/{projet}', 'OperationController@getStatsByProjet');

            //payment test
            // Route::post('operations/projects/support', 'AuthenticationController@testPaymentService');
            Route::post('operations/projects/support', 'OperationController@PaymentServiceContribution');

});


// Route::middleware('auth:api')->prefix('v1/live/')->group(function () {
Route::prefix('v1/live/')->group(function () {
    Route::post('operations/projectsbyuser', 'OperationController@getListProjectByUser');
    Route::post('operations/project/contribute', 'OperationController@createContribution');
    Route::put('operations/project/', 'OperationController@updateProjectAsPorteur');
    Route::post('operations/pub/create', 'OperationController@createPubs');
    Route::post('operations/pub/watch', 'OperationController@createContributionVideo');
    Route::post('operations/lignefinancer/create', 'OperationController@createLigneFinance');
    Route::get('operations/lignefinancer/delete/{id}', 'OperationController@deleteLigneFinance');
    Route::post('operations/document/create', 'OperationController@createDocument');
    Route::post('operations/projet/updatebibliographie', 'OperationController@updateBibliographie');
    Route::post('operations/commentaire/create', 'OperationController@createCommentaire');
    Route::post('operations/actualite/create', 'OperationController@createActualite');
    Route::post('operations/contrepartie/create', 'OperationController@createContrepartie');
    Route::get('operations/contrepartie/delete/{id}', 'OperationController@deleteContrepartie');
    Route::post('operation/savepropositionprojet',  'OperationController@createPropositionProjet');
    Route::post('operations/message/list', 'OperationController@getListMessage');
    Route::get('operations/diffusion/list/{email_address}', 'OperationController@getListDiffusion');
    Route::post('operations/diffusion/create/', 'OperationController@CreateDiffusion');
    Route::post('auth/reset', 'AuthenticationController@resetUser');
    Route::post('auth/updateProfil', 'AuthenticationController@updateProfil');
    Route::post('auth/deleteProfil', 'AuthenticationController@deleteProfil');
    Route::post('auth/resetpassword', 'AuthenticationController@resetPassword');

    
});



//interface admin
Route::prefix('admin/live/')->group(function () {

    //operations
    Route::post('operations/listproject', 'AdminController@getListProjectAdmin');
    Route::post('operations/project/reject', 'OperationController@rejectProject');
    Route::post('operations/campagnes', 'OperationController@getListProjectAdmin');
    Route::post('operations/porteurs', 'OperationController@getListProjectAdmin');

    Route::post('operations/projets', 'AdminController@getListProjectAdmin');
    Route::get('operations/projetlist', 'AdminController@getListProject');
    Route::post('operations/updatestatusprojet', 'AdminController@updateProjectStatus');
    
    Route::get('operations/imageurl/{name}', 'OperationController@getImageUrl');
    Route::get('operations/imagepuburl/{name}', 'OperationController@getImagePubUrl');
    //statistiques
    Route::post('stats/statistiquesgenerales', 'OperationController@getListProjectAdmin');

    // config
    Route::get('config/commissionlist', 'OperationController@getListCommission');
    Route::post('config/commissionupdate', 'OperationController@updateCommission');

    //parametres
    Route::post('parameters/categories', 'ParameterController@getListProjectAdmin');
    Route::post('parameters/sliders', 'ParameterController@getListProjectAdmin');
    Route::post('parameters/modespaiement', 'ParameterController@getListProjectAdmin');
    Route::post('parameters/commissions', 'ParameterController@getListProjectAdmin');
    Route::post('parameters/notifications', 'ParameterController@getListProjectAdmin');

    // Mode paiement
    Route::get('operations/modepaiementlist', 'OperationController@getListModePaiement');
    Route::post('operations/modepaiementcreate', 'OperationController@createModePaiement');
    Route::post('operations/modepaiementedit', 'OperationController@editModePaiement');
    Route::post('operations/modepaiementdelete', 'OperationController@deleteModePaiement');

    // categorie
    Route::get('operations/categorielist', 'OperationController@getListCategorie');
    Route::post('operations/categoriecreate', 'OperationController@createCategorie');
    Route::post('operations/categorieedit', 'OperationController@editCategorie');
    Route::post('operations/categoriedelete', 'OperationController@deleteCategorie');

    Route::get('operations/porteurprojet', 'OperationController@getListPorteurProjet');


    Route::get('operations/stats/projetlist', 'OperationController@getListProjetStats');
    Route::post('operations/stats/projetlist/commission', 'OperationController@getListProjetCommissionStats');

    //sponsor
    Route::post('operations/sponsor/createsponsor', 'OperationController@createSponsor');
    Route::post('operations/sponsor/editsponsor', 'OperationController@editSponsor');
    Route::get('operations/sponsor/listsponsor', 'OperationController@getListSponsor');
    Route::get('operations/sponsor/deletesponsor/{id}', 'OperationController@deleteSponsor');

    //pub solidaire
    Route::post('operations/pubsolidaire/createpubsolidaire', 'OperationController@createPubSolidaire');
    Route::post('operations/pubsolidaire/editpubsolidaire', 'OperationController@editPubSolidaire');
    Route::get('operations/pubsolidaire/listpubsolidaire', 'OperationController@getListPubSolidaire');
    Route::get('operations/pubsolidaire/deletepubsolidaire/{id}', 'OperationController@deletePubSolidaire');

    //soutien solidaire
    Route::get('operations/soutiensolidaire/listsoutiensolidaire', 'OperationController@getListSoutienSolidaire');

    //financement sponsor
    Route::post('operations/financementsponsor/createfinancementsponsor', 'OperationController@createFinancementSponsor');
    Route::post('operations/financementsponsor/editfinancementsponsor', 'OperationController@editFinancementSponsor');
    Route::get('operations/financementsponsor/listfinancementsponsor', 'OperationController@getListFinancementSponsor');
    Route::get('operations/financementsponsor/deletefinancementsponsor/{id}', 'OperationController@deleteFinancementSponsor');

});