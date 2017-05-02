@extends('layout.app')

@section('content')
    <div class="container">
        <div class="columns">
            <div class="column is-8 is-offset-2">
                <div class="box">
                    <div class="box-body">
                        @markdown
                       {{ $content }}
                        @endmarkdown
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
