@extends('layout.app')

@section('content')
    <div class="short-content">
        <div class="container">
            <div class="alert is-danger">
                <p>You have already {{ $status }} this invitation.</p>
            </div>

            <div class="box">
                @if(auth()->check())
                    <p>Go to <a href="/account/groups">your groups</a> page.</p>
                @else
                    <p><a href="/login">Login</a> to access your groups page.</p>
                @endif
            </div>
        </div>
    </div>
@endsection