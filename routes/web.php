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
Route::get('/web/docs/about', 'DocumentController@about');
Route::get('/web/docs/terms', 'DocumentController@terms');
Route::get('/web/docs/privacy', 'DocumentController@policy');
Route::get('/web/docs/faq', 'DocumentController@faq');
Route::get('/web/docs/trees', 'DocumentController@trees');
Route::get('/web/docs/partners', 'DocumentController@partners');

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
Route::get('/logout', 'UsersController@logout');

// Observations
Route::get('/web/observations/categories', 'ObservationsController@getCategories');
Route::get('/web/observations/{limit?}', 'ObservationsController@index');
Route::get('/web/observation/{id}', 'ObservationsController@show');

// Pre-fetched observation view to support FB open graph and twitter cards
Route::get('/observation/{id}', 'ObservationsController@showPreFetch');

// Map
Route::get('/web/map', 'MapController@index');
Route::get('/web/map/count', 'MapController@countObservations');

// Users
Route::get('/web/user/status', 'UsersController@status');
Route::post('/web/user/subscribe', 'UsersController@subscribe');

// Filters
Route::post('/web/filter/count', 'FiltersController@count');
Route::post('/web/filters/{with_observations?}', 'FiltersController@create');
Route::get('/web/filters', 'FiltersController@index');

// CSRF
Route::get('/web/_token', 'CSRFController@index');

// Invitation acceptance routes
Route::post('/invitations/accept/login/{id}', 'InvitesController@acceptLogin');
Route::post('/invitations/accept/register/{id}', 'InvitesController@acceptRegister');
Route::get('/invitations/accept/{id}', 'InvitesController@accept');

// Leaderboard
Route::get('/web/leaderboard/{limit?}', 'LeaderboardController@index');

// Events
Route::get('/web/events/{limit?}', 'EventsController@index');

// Authenticated Users Only (could be admin, scientist or user)
Route::group(['middleware' => ['auth']], function () {
    // Observations
    Route::delete('/web/observation/{id}', 'ObservationsController@delete');

    // Filters
    Route::delete('/web/filter/{id}', 'FiltersController@delete');
    Route::get('/web/filter/{id}', 'FiltersController@show');

    // Users controller
    Route::get('/web/user', 'UsersController@show');
    Route::put('/web/user', 'UsersController@update');
    Route::patch('/web/user/password', 'UsersController@updatePassword');
    Route::get('/web/user/observations', 'UsersController@observations');

    // Allow only authenticated users to access Account Page
    Route::get('/account/{react?}', 'HomeController@index')->where(['react' => '(.*)']);

    // Collections
    Route::get('/web/collection/{id}/users', 'CollectionsController@users');
    Route::get('/web/collections/customizable/{paired?}', 'CollectionsController@customizableCollections');
    Route::get('/web/collections/owned/{paired?}', 'CollectionsController@ownedCollections');
    Route::get('/web/collections/{paired?}', 'CollectionsController@index');
    Route::post('/web/collections', 'CollectionsController@create');
    Route::get('/web/collection/{id}', 'CollectionsController@show');
    Route::post('/web/collection/attach', 'CollectionsController@attach');
    Route::delete('/web/collection/detach', 'CollectionsController@detach');
    Route::delete('/web/collection/{id}', 'CollectionsController@delete');
    Route::delete('/web/collection/{id}/unshare', 'CollectionsController@unshare');
    Route::post('/web/collection/{id}/share', 'CollectionsController@share');
    Route::patch('/web/collection/{id}/permissions', 'CollectionsController@changePermissions');

    // Groups
    Route::get('/web/groups', 'GroupsController@index');
    Route::post('/web/groups', 'GroupsController@create');
    Route::get('/web/groups/members', 'GroupsController@getGroupUsers');
    Route::get('/web/groups/search', 'GroupsController@searchPublicGroups');
    Route::post('/web/groups/join/{group}', 'GroupsController@toggleJoinRequest');
    Route::get('/web/group/{group}/requests', 'GroupsController@showJoinRequests');
    Route::post('/web/group/{group}/request/accept', 'GroupsController@acceptJoinRequest');
    Route::post('/web/group/{group}/request/reject', 'GroupsController@rejectJoinRequest');
    Route::post('/web/group/{group}/request/reset', 'GroupsController@resetJoinRequest');
    Route::get('/web/group/{id}', 'GroupsController@show');
    Route::get('/web/group/{id}/observations', 'GroupsController@groupObservations');
    Route::delete('/web/group/{group}/exit', 'GroupsController@exitGroup');
    Route::delete('/web/group/detach', 'GroupsController@detach');
    Route::delete('/web/group/{id}', 'GroupsController@delete');
    Route::post('/web/group/attach', 'GroupsController@attach');
    Route::patch('/web/group/{group}/sharing', 'GroupsController@changeSharing');

    // Flags
    Route::post('/web/flag', 'FlagsController@create');
    Route::delete('/web/flag/{id}', 'FlagsController@delete');

    // Notes
    Route::get('/web/notes', 'NotesController@index');
    Route::post('/web/notes', 'NotesController@create');
    Route::get('/web/note/{id}', 'NotesController@show');
    Route::delete('/web/note/{id}', 'NotesController@delete');

    // Invitations
    Route::get('/web/invites/{group_id}', 'InvitesController@showPendingInvitations');
    Route::post('/web/invite', 'InvitesController@newInvitation');

    // Unsubscribe
    Route::get('/services/unsubscribe/filter/{filter}', 'SubscriptionsController@unsubscribeFilter');

    // Download
    Route::get('/services/download/collection/{collection}/{extension?}', 'DownloadsController@collection');
    Route::get('/services/download/filter/{filter}/{extension?}', 'DownloadsController@filter');
    Route::get('/services/download/observations/{extension?}', 'DownloadsController@myObservations');
});

// Admin Route Group
Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => ['admin']], function () {
    // Users
    Route::get('/web/users', 'UsersController@index');
    Route::get('/web/user/{id}', 'UsersController@show');
    Route::put('/web/user/{id}', 'UsersController@update');

    // Roles
    Route::get('/web/roles', 'RolesController@index');

    // Flags
    // Route::get('/web/flags', 'FlagsController@index');

    // Cache
    Route::get('/clear-cache', 'CacheController@clearCache');

    // Events
    Route::get('/web/events', 'AdminEventsController@index');
    Route::get('/web/event/{id}', 'AdminEventsController@show');
    Route::post('/web/events', 'AdminEventsController@create');
    Route::put('/web/event/{id}', 'AdminEventsController@update');
    Route::delete('/web/event/{id}', 'AdminEventsController@delete');

    // Flags
    Route::get('/web/flags', 'FlagsController@index');

    // Notifications Settings
    Route::get('/web/notifications', 'AdminNotificationsController@index');
    Route::post('/web/notifications/toggle', 'AdminNotificationsController@toggleSubscription');
});

// Admin or Scientist Only Route Group
Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => ['scientist']], function () {
    // Contact Controller
    Route::post('/web/contact/user', 'ContactController@contactUser');

    // Confirmations Controller
    Route::get('/web/confirmations', 'ConfirmationsController@index');
    Route::post('/web/confirmations', 'ConfirmationsController@create');
    Route::get('/web/confirmations/count/{id}', 'ConfirmationsController@count');
    Route::delete('/web/confirmation/{id}', 'ConfirmationsController@delete');

    // Curations Controller
    Route::get('/web/curate/observations/{limit?}', 'CurationsController@index');

    // Analytics
    Route::get('/web/analytics/users/count', 'AnalyticsController@usersCount');
    Route::get('/web/analytics/users/trained/count', 'AnalyticsController@usersTrainedCount');
    Route::get('/web/analytics/users/trained/percentage', 'AnalyticsController@usersTrainedPercentage');
    Route::get('/web/analytics/users-over-time', 'AnalyticsController@usersOverTime');

    Route::get('/web/analytics/observations/count', 'AnalyticsController@observationsCount');
    Route::get('/web/analytics/observations/distribution', 'AnalyticsController@observationsDistribution');
    Route::get('/web/analytics/observations/states/{limit?}', 'AnalyticsController@observationsCountByState');
    Route::get('/web/analytics/observations-over-time', 'AnalyticsController@observationsOverTime');

    // All other react routes
    Route::get('/{react?}', 'AdminController@index')->where(['react' => '(.*)']);
});

// Other React Routes
// (All react routes go to the index method of the Home Controller)
Route::get('/{react?}', 'HomeController@index')->where(['react' => '(.*)']);
