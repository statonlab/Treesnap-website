@extends('layout.app')

@section('content')
    <div class="short-content">
        <div class="container">
            <div class="columns">
                <div class="column{{ auth()->check() ? ' is-8 mr-auto ml-auto' : '' }}">
                    <div class="box">
                        <h1 class="title is-4">
                            Accept Invitation to {{ $invite->group->name }}
                        </h1>

                        @if(!auth()->check())
                            <div class="content">
                                <p>
                                    {{ $invite->user->name }} sent you an invite to join their group. Please sign in
                                    or register below to accept the invitation.
                                </p>
                            </div>
                        @else
                            <p class="mb-1">
                                {{ $invite->user->name }} sent you an invite to join their group. Would
                                you like to accept the invitation?
                            </p>

                            <form action="/invitations/accept/authenticated/{{ $invite->id }}" method="post">
                                @csrf

                                <input type="hidden" name="_t" value="{{ $invite->token }}">

                                <div class="field">
                                    <div class="control">
                                        <label class="checkbox">
                                            <input name="share" type="checkbox" value="1" checked="checked"/>
                                            Share my observations with this group including accurate location coordinates.
                                        </label>
                                    </div>
                                </div>

                                <div class="is-flex flex-space-between">
                                    <button type="submit" class="button is-primary">Accept</button>
                                    <p class="text-muted mt-auto">To decline, simply close the browser window</p>
                                </div>
                            </form>
                        @endif
                    </div>
                </div>
            </div>

            @if(!auth()->check())
                <div class="columns">
                    <div class="column">
                        <div class="box">
                            <h2 class="title is-4">Login</h2>

                            <form action="{{ url("/invitations/accept/login/{$invite->id}") }}" method="post">
                                <div class="columns">
                                    <div class="column">
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
                                    </div>
                                    <div class="column is-3">
                                        <h4 class="title is-6 has-text-centered mb-1">Connect With</h4>
                                        <a href="{{ url('/login/google?redirect_to='.(url()->full())) }}"
                                           class="is-block button is-danger has-text-left mb-1">
                                            <span class="icon">
                                                <i class="fa fa-google"></i>
                                            </span>
                                            <span>Google</span>
                                        </a>
                                    </div>
                                </div>

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
            @endif
        </div>
    </div>
@endsection
