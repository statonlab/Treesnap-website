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

Route::group([
  'prefix' => 'v1',
  'namespace' => 'Api\v1',
  'middleware' => ['auth:api'],
], function () {

    Route::get('/observations', 'ObservationsController@index');
    Route::get('/observation/{id}', 'ObservationsController@show');
    Route::post('/observations', 'ObservationsController@create');
    Route::delete('/observation/{id}', 'ObservationsController@delete');
    Route::put('/observation/{id}', 'ObservationsController@update');

});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
