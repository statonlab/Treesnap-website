<?php
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

Route::group([
    'prefix' => 'v1',
    'namespace' => 'Api\v1',
    'middleware' => ['auth:api'],
], function () {
    // Observations Controller
    Route::get('/observations', 'ObservationsController@index');
    Route::post('/observations', 'ObservationsController@create');
    Route::get('/observation/{id}', 'ObservationsController@show');
    Route::delete('/observation/{id}', 'ObservationsController@delete');
    Route::post('/observation/{id}', 'ObservationsController@update');

    // Images Controller
    Route::post('/observation/image/{id}', 'ImagesController@create');

    // Users Controller
    Route::get('/user', 'UsersController@show');
    Route::put('/user', 'UsersController@update');
    Route::patch('/user/password', 'UsersController@updatePassword');
    Route::patch('/user', 'UsersController@patchSingleField');

    // Actions
    Route::get('/actions', 'ActionsController@index');
    Route::post('/action/completed/{action}', 'ActionsController@completed');

    Route::get('/share/observation/{id}', 'ShareTokensController@share');
});

// Shared SPA and Mobile APIs
Route::group([
    'prefix' => 'v1',
    'middleware' => ['auth:api'],
], function () {
    // Delete account requests
    Route::get('/delete-account-requests', 'DeleteAccountRequestController@myIndex');
    Route::delete('/delete-account-request/{deleteRequest}', 'DeleteAccountRequestController@delete');
    Route::post('/delete-account-requests', 'DeleteAccountRequestController@create');
});

// Methods that do not require an api_key
Route::group([
    'prefix' => 'v1',
    'namespace' => 'Api\v1',
], function () {
    Route::post('/users', 'UsersController@create');
    Route::post('/user/login', 'UsersController@login');

    Route::post('/apple', 'UsersController@apple');
});
