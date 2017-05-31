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

// Home Routes
Route::get('/', 'HomeController@index');

// Documentation Routes
Route::get('/docs/about', 'DocumentController@about');
Route::get('/docs/terms', 'DocumentController@terms');
Route::get('/docs/privacy', 'DocumentController@policy');
Route::get('/docs/faq', 'DocumentController@faq');


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
Route::get('/observations', 'ObservationsController@index');
Route::get('/web/observation/{id}', 'ObservationsController@ajaxShow');

// Users
Route::get('/user/status', 'UsersController@status');
Route::post('/user/subscribe', 'UsersController@subscribe');

// Authenticated User Routes
Route::group(['middleware' => ['auth']], function () {
    Route::get('/user', 'UsersController@show');
    Route::put('/user', 'UsersController@update');
    Route::patch('/user/password', 'UsersController@updatePassword');
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

    // All other react routes
    Route::get('/{react?}', 'AdminController@index')->where(['react' => '(.*)']);
});

// Authenticated Users Only
Route::group(['middleware' => ['auth']], function() {
    Route::get('/account', 'HomeController@index');
});

// Other React Routes
// (All react routes go to the index method of the Home Controller)
Route::get('/{react?}', 'HomeController@index')->where(['react' => '(.*)']);
