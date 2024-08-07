<?php
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web services routes for your application.
| These routes are loaded by the RouteServiceProvider within a group which
| is assigned the "web-services" middleware group. Enjoy building your API!
|
*/

/** VERSION 1 */
// Methods that require an authenticated user
Route::group([
    'prefix' => 'v1',
    'namespace' => 'WebServices\v1',
    'middleware' => ['auth:web-services'],
], function () {
    Route::get('/observations', 'ObservationsServiceController@observations');
    Route::get('/my-observations', 'ObservationsServiceController@myObservations');
    Route::get('/observation/{id}', 'ObservationsServiceController@show');
    
    //Treets Controller
    Route::get('/treets/feed', 'TreetController@index');
    
    // Refresh OAuth Tokens
    Route::post('/refresh-tokens', 'TokensController@refreshTokens');
});
