@extends('layouts.default')
@section('content')

<div class="flag-page">
    <div id="flag" >
        <h2 class="count"><span id="photo-counter">0</span> Photos</h2>
        @for($i =0; $i<$tilesCount; $i++)
        <?php
        $width = (int) (1920 / $imageSize);
        $height = (int) ($tilesCount / $width);
        $rowIndex = (int)($i / $width);
        $colIndex = (int)($i % $width);
        ?>
            <div class="placeholder blackout {{image_class($rowIndex,$colIndex,$width, $height)}}" data-row="{{$rowIndex}}" data-id="{{$i}}" data-col="{{$colIndex}}">
                    <div class="image" style="{{image_style($i, $imageSize)}}"></div>
            </div>
        @endfor
    </div>
    <div class="footer">
        <div class="logo logo-left">
            <img src="assets/emiratesNBDlogo.png" alt=""/>
        </div>
        <div class="bannerText">
            <div class="text arabic" style="display: none">كل عام ووطننا بخير</div>
            <div class="text">Happy 43<sup>rd</sup> National Day</div>
        </div>
        <div class="logo logo-right">
            <img src="assets/emiratesNBDlogo.png" alt=""/>
        </div>
    </div>

    <div class="featured-images-container">
    @for($i = 0; $i < 12; $i++)
     <div class="featured-image empty"></div>
    @endfor

    </div>
</div>


@stop

@section('footer')
{{ HTML::script('bower_components/jquery/dist/jquery.min.js') }}
{{ HTML::script('bower_components/jquery-ui/jquery-ui.min.js') }}
{{ HTML::script('bower_components/underscore/underscore-min.js') }}
{{ HTML::script('flag.js') }}

@stop