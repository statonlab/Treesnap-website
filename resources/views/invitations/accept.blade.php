@extends('layout.app')

@section('content')
    <div class="short-content">
        <div class="container">
            <div class="columns">
                <div class="column">
                    <div class="box">
                        <h1 class="title is-4">
                            Accept Invitation to {{ $invite->group->name }}
                        </h1>

                        <div class="content">
                            <p>
                                {{ $invite->user->name }} sent you an invite to join their group. Please sign in
                                or register below to accept the invitation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="columns">
                <div class="column">
                    <div class="box">
                        <h2 class="title is-4">Login</h2>

                        <form action="{{ url("/invitations/accept/login/{$invite->id}") }}" method="post">
                            @include('partials.login-form', [
                                'email' => $invite->email,
                                'validate' => session()->has('login_attempt') ? session('login_attempt') : false,
                                'fields' => '<div class="field">
                                <div class="control">
                                    <label class="checkbox">
                                        <input name="share" type="checkbox" value="1" checked="checked"/>
                                        Share my observations with this group including accurate location coordinates.
                                    </label>
                                </div>
                            </div>'
                            ])

                            <input type="hidden" name="_t" value="{{ $invite->token }}">
                        </form>
                    </div>
                </div>
                <div class="column">
                    <div class="box">
                        <h2 class="title is-4">Register</h2>
                        <form action="{{ url("/invitations/accept/register/{$invite->id}") }}" method="post">
                            @include('partials.registration-form', [
                                'email' => $invite->email,
                                'validate' => session()->has('login_attempt') ? !session('login_attempt') : false,
                                'fields' => '<div class="field">
                                <div class="control">
                                    <label class="checkbox">
                                        <input name="share" type="checkbox" value="1" checked="checked"/>
                                        Share my observations with this group including accurate location coordinates.
                                    </label>
                                </div>
                            </div>'
                             ])
                            <input type="hidden" name="_t" value="{{ $invite->token }}">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
