<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/test/{id}', 'CollectionsController@show');

// Home Routes
Route::get('/', 'HomeController@index');

// Documentation Routes
Route::get('/docs/about', 'DocumentController@about');
Route::get('/docs/terms', 'DocumentController@terms');
Route::get('/docs/privacy', 'DocumentController@policy');
Route::get('/docs/faq', 'DocumentController@faq');
Route::get('/docs/trees', 'DocumentController@trees');

// Contact
Route::post('/contact', 'ContactController@send');

/**
 * Auth Routes:
 * Login: /login
 * Logout: /logout
 * Register: /register
 * Reset Password: /password/reset
 */
Auth::routes();
Route::get('/logout', function () {
    Auth::logout();

    return redirect('/');
});

// Observations
Route::get('/observations/categories', 'ObservationsController@getCategories');
Route::get('/observations/{limit?}', 'ObservationsController@index');
Route::get('/web/observation/{id}', 'ObservationsController@ajaxShow');

// Users
Route::get('/user/status', 'UsersController@status');
Route::post('/user/subscribe', 'UsersController@subscribe');

// Filters
Route::post('/api/filter/count', 'FiltersController@count');
Route::get('/api/filters', 'FiltersController@index');

// CSRF
Route::get('/api/_token', 'CSRFController@index');

// Authenticated Users Only (could be admin, scientist or user)
Route::group(['middleware' => ['auth']], function () {
    // Filters
    Route::post('/api/filters', 'FiltersController@create');
    Route::delete('/api/filter/{id}', 'FiltersController@delete');
    Route::get('/api/filter/{id}', 'FiltersController@show');

    // Users controller
    Route::get('/user', 'UsersController@show');
    Route::put('/user', 'UsersController@update');
    Route::patch('/user/password', 'UsersController@updatePassword');

    // Allow only authenticated users to access Account Page
    Route::get('/account', 'HomeController@index');

    // Collections
    Route::get('/collections/{paired?}', 'CollectionsController@index');
    Route::post('/collections', 'CollectionsController@create');
    Route::get('/collection/{id}', 'CollectionsController@show');
    Route::post('/collection/attach', 'CollectionsController@attach');
    Route::delete('/collection/detach', 'CollectionsController@detach');
    Route::delete('/collection/delete', 'CollectionsController@delete');
    Route::post('/collection/share', 'CollectionsController@share');
    Route::delete('/collection/unshare', 'CollectionsController@unshare');

    // Flags
    Route::post('/flag', 'FlagsController@create');
    Route::delete('flag/{id}', 'FlagsController@delete');
});

// Admin Route Group
Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => ['admin']], function () {
    // Users
    Route::get('/api/users', 'UsersController@index');
    Route::get('/api/user/{id}', 'UsersController@show');
    Route::put('/api/user/{id}', 'UsersController@update');

    // Groups
    Route::get('/api/groups', 'GroupsController@index');
    Route::post('/api/groups', 'GroupsController@create');
    Route::get('/api/group/{id}', 'GroupsController@show');
    Route::delete('/api/group/detach', 'GroupsController@detach');
    Route::post('/api/group/attach', 'GroupsController@attach');
    Route::get('/api/group/allowed/users/{id}', 'GroupsController@getAllowedUsers');

    // Roles
    Route::get('/api/roles', 'RolesController@index');

    // Analytics
    Route::get('/api/analytics/users/count', 'AnalyticsController@usersCount');
    Route::get('/api/analytics/users/trained/count', 'AnalyticsController@usersTrainedCount');
    Route::get('/api/analytics/users/trained/percentage', 'AnalyticsController@usersTrainedPercentage');
    Route::get('/api/analytics/observations/count', 'AnalyticsController@observationsCount');
    Route::get('/api/analytics/observations/distribution', 'AnalyticsController@observationsDistribution');

    // Flags
    Route::get('/api/flags', 'FlagsController@index');

    // Cache
    Route::get('/clear-cache', 'CacheController@clearCache');
});

// Admin or Scientist Only Route Group
Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => ['scientist']], function () {
    // Groups
    Route::get('/api/groups', 'GroupsController@index');
    Route::post('/api/groups', 'GroupsController@create');
    Route::get('/api/group/{id}', 'GroupsController@show');
    Route::delete('/api/group/detach', 'GroupsController@detach');
    Route::post('/api/group/attach', 'GroupsController@attach');
    Route::get('/api/group/allowed/users/{id}', 'GroupsController@getAllowedUsers');

    // Contact Controller
    Route::post('/api/contact/user', 'ContactController@contactUser');

    // Confirmations Controller
    Route::get('/api/confirmations', 'ConfirmationsController@index');
    Route::post('/api/confirmations', 'ConfirmationsController@create');
    Route::delete('/api/confirmation/{id}', 'ConfirmationsController@delete');

    // All other react routes
    Route::get('/{react?}', 'AdminController@index')->where(['react' => '(.*)']);
});

// Other React Routes
// (All react routes go to the index method of the Home Controller)
Route::get('/{react?}', 'HomeController@index')->where(['react' => '(.*)']);
