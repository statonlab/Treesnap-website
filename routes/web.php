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
Route::get('/', function () {
    return view('landing');
});

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
Route::get('/observation/{id}', 'ObservationsController@show');
Route::get('/web/observation/{id}', 'ObservationsController@ajaxShow');

// Users
Route::get('/user/status', 'UsersController@status');

/**
 * Admin Routes
 */
Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => ['admin']], function () {
    Route::get('/api/users', 'UsersController@index');
    Route::get('/api/user/{id}', 'UsersController@show');
    Route::put('/api/user/{id}', 'UsersController@update');

    Route::get('/api/groups', 'GroupsController@index');
    Route::post('/api/groups', 'GroupsController@create');

    Route::get('/api/roles', 'RolesController@index');

    // All other react routes
    Route::get('/{react?}', 'AdminController@index')->where(['react' => '(.*)']);
});