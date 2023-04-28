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

Route::get('/login/{provider}', 'Auth\LoginController@redirectToSocialProvider');
Route::get('/login/{provider}/callback', 'Auth\LoginController@handleSocialProviderCallback');
Route::post('/login/{provider}/callback', 'Auth\LoginController@handleSocialProviderCallback');

// Observations
Route::get('/web/observations/categories', 'ObservationsController@getCategories');
Route::get('/web/observations/{limit?}', 'ObservationsController@index');
Route::get('/web/observation/{id}', 'ObservationsController@show');

// Pre-fetched observation view to support FB open graph and twitter cards
Route::get('/observation/{id}', 'ObservationsController@showPreFetch');

// Map
Route::get('/web/map', 'MapController@index');
Route::get('/web/map/count', 'MapController@countObservations');
Route::get('/web/map/{observation}', 'MapController@showObservation');

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

// Observation Feed
Route::get('/web/observations/feed', 'ObservationsController@getObservationFeed');

// Public Routes in the Confirmations Controller
Route::get('/web/confirmations/count/{id}', 'PublicConfirmationsController@count');

// Authenticated Users Only (could be admin, scientist or user)
Route::group(['middleware' => ['auth']], function () {
    // Observations
    Route::delete('/web/observation/{id}', 'ObservationsController@delete');

    // Shareable Links
    Route::get('/web/share/observation/{observation}', 'ShareTokensController@share');

    // Filters
    Route::delete('/web/filter/{id}', 'FiltersController@delete');
    Route::get('/web/filter/{id}', 'FiltersController@show');

    // Users controller
    Route::get('/web/user', 'UsersController@show');
    Route::put('/web/user', 'UsersController@update');
    Route::post('/web/user/create-password', 'UsersController@createPassword');
    Route::patch('/web/user/password', 'UsersController@updatePassword');
    Route::get('/web/user/observations', 'UsersController@observations');

    // Allow only authenticated users to access Account Page
    Route::get('/account/{any?}', 'HomeController@index')->where(['any' => '(.*)']);

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
    Route::put('/web/group/{group}', 'GroupsController@updateName');
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
    Route::put('/web/group/{group}/promote', 'GroupsController@promote');
    Route::patch('/web/group/{group}/sharing', 'GroupsController@changeSharing');
    Route::patch('/web/group/{group}/discoverability', 'GroupsController@toggleDiscoverability');

    // Sampling Projects
    Route::post('/web/sampling-projects', 'SamplingProjectController@create');
    Route::put('/web/sampling-projects/{project}', 'SamplingProjectController@update');
    Route::delete('/web/sampling-projects/{project}', 'SamplingProjectController@delete');

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
    Route::post('/invitations/accept/authenticated/{id}', 'InvitesController@acceptAuthenticated');

    // Unsubscribe
    Route::get('/services/unsubscribe/filter/{filter}', 'SubscriptionsController@unsubscribeFilter');

    // Download
    Route::get('/services/download/collection/{collection}/{extension?}', 'DownloadsController@collection');
    Route::get('/services/download/filter/{filter}/{extension?}', 'DownloadsController@filter');
    Route::get('/services/download/observations/{extension?}', 'DownloadsController@myObservations');

    // Authentication
    Route::get('/web/oauth/personal-tokens', 'OAuthController@tokens');
    Route::post('/web/oauth/personal-tokens', 'OAuthController@createTokens');
    Route::delete('/web/oauth/personal-token/{id}', 'OAuthController@deleteToken');
});

// Admin Route Group
Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => ['admin']], function () {
    // Users
    Route::get('/web/users', 'UsersController@index');
    Route::get('/web/user/{id}', 'UsersController@show');
    Route::put('/web/user/{id}', 'UsersController@update');
    Route::get('/users/download', 'UsersController@download');

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
    Route::delete('/web/flag/{flag}', 'FlagsController@deleteFlag');

    // Notifications Settings
    Route::get('/web/notifications', 'AdminNotificationsController@index');
    Route::post('/web/notifications/toggle', 'AdminNotificationsController@toggleSubscription');

    // Delete Requests
    Route::get('/web/delete-requests', 'DeleteAccountRequestController@index');
    Route::get('/web/delete-request/{id}', 'DeleteAccountRequestController@show');
});

// Admin or Scientist Only Route Group
Route::group(['prefix' => 'admin', 'namespace' => 'Admin', 'middleware' => ['scientist']], function () {
    // Contact Controller
    Route::post('/web/contact/user', 'ContactController@contactUser');

    // Confirmations Controller
    Route::get('/web/confirmations', 'ConfirmationsController@index');
    Route::post('/web/confirmations', 'ConfirmationsController@create');
    Route::delete('/web/confirmation/{id}', 'ConfirmationsController@delete');

    // Observations
    Route::get('/web/observations', 'ObservationsController@index');

    // Curations Controller
    Route::get('/web/curate/observations/{limit?}', 'CurationsController@index');

    // Analytics
    Route::get('/web/analytics/users/count', 'AnalyticsController@usersCount');
    Route::get('/web/analytics/users/trained/count', 'AnalyticsController@usersTrainedCount');
    Route::get('/web/analytics/users/with-observations', 'AnalyticsController@usersWithObservations');
    Route::get('/web/analytics/users-over-time', 'AnalyticsController@usersOverTime');
    Route::get('/web/analytics/downloads', 'AnalyticsController@downloads');

    Route::get('/web/analytics/observations/count', 'AnalyticsController@observationsCount');
    Route::get('/web/analytics/observations/distribution', 'AnalyticsController@observationsDistribution');
    Route::get('/web/analytics/observations/states/{limit?}', 'AnalyticsController@observationsCountByState');
    Route::get('/web/analytics/observations-over-time', 'AnalyticsController@observationsOverTime');

    // All other react routes
    Route::get('/{react?}', 'AdminController@index');
});

// Other React Routes
// (All react routes go to the index method of the Home Controller)
Route::get('/{react?}', 'HomeController@index');
