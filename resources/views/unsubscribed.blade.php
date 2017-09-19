@extends('layout.app')

@section('content')
    <div class="short-content">
        <div class="container">
            <div class="columns">
                <div class="column is-8 is-offset-2">
                    <div class="content has-text-centered">
                        <div class="box">
                            <h3>Unsubscribed Successfully</h3>
                            <p>You have successfully unsubscribed from receiving notifications{{ isset($name) ? ' for ' . $name : '' }}</p>
                            <a href="/" class="button is-primary">Home Page</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection