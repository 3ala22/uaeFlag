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
            <div class="text">Happy 43<sup>rd</sup> National Day</div>
            <div class="text arabic" style="display: none">كل عام ووطننا بخير</div>
            <div class="text text-sm" style="display: none">To win AED 5000, take a selfie and share it on Instagram, using #LargestSelfieFlag</div>
            <div class="text text-sm arabic" style="display: none">لربح 5,000 درهم، قم بالتقاط صورة سلفي خاصة بك وشاركها عبر الانستجرام باستخدام #LargestSelfieFlag</div>
            <div class="text text-sm" style="display: none">Find the nearest interactive screen at The Beach and take a selfie</div>
            <div class="text arabic" style="display: none; font-size: 38px">اعثر على أقرب شاشة تفاعلية في ذا بيتش والتقط صورة سلفي</div>
        </div>
        <div class="logo logo-right">
            <img src="assets/emiratesNBDlogoArabic.png" alt=""/>
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