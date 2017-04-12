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

Route::get('/', function () {
    return view('landing');
});

Auth::routes();

Route::get('/logout', function () {
    Auth::logout();

    return redirect('/');
});

Route::get('/observations', 'ObservationsController@index');
Route::get('/observation/{id}', 'ObservationsController@show');
Route::get('/web/observation/{id}', 'ObservationsController@ajaxShow');