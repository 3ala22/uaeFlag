@extends ('layouts.default')

@section('content')

    <div id="album">
    @foreach($photos as $photo)
        <span><img src="{{$photo['url']}}" width="400" height="400" ></span>
    @endforeach
    </div>

@stop