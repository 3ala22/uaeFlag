<!DOCTYPE html>
<!--[if lt IE 7]>      <html lang="en" ng-app="instagramFlag" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html lang="en" ng-app="instagramFlag" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html lang="en" ng-app="instagramFlag" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en" ng-app="instagramFlag" class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Instagram Flag</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{ HTML::style('bower_components/html5-boilerplate/css/normalize.css') }}
    {{ HTML::style('bower_components/html5-boilerplate/css/main.css') }}
    {{ HTML::style('bower_components/font-awesome/css/font-awesome.min.css') }}
    {{ HTML::style('app.css') }}
    {{ HTML::style('animations.css') }}

    {{ HTML::script('bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js') }}
    </head>
<body>

     <div ng-view class="view-container"></div>

    {{ HTML::script('bower_components/jquery/dist/jquery.js') }}
    {{ HTML::script('bower_components/angular/angular.js') }}
    {{ HTML::script('bower_components/angular-route/angular-route.js') }}
    {{ HTML::script('bower_components/angular-resource/angular-resource.min.js') }}
    {{ HTML::script('bower_components/angular-sanitize/angular-sanitize.min.js') }}
    {{ HTML::script('bower_components/angular-animate/angular-animate.min.js') }}
    {{ HTML::script('bower_components/angular-queue/angular-queue.js') }}
    {{ HTML::script('bower_components/underscore/underscore-min.js') }}

    {{ HTML::script('app.js') }}
    {{ HTML::script('pages/flag/flag.js') }}
    {{--{{ HTML::script('services/services.js') }}--}}

    <script>
        angular.module("instagramFlag").constant("CSRF_TOKEN", '<?php echo csrf_token(); ?>');
    </script>
</body>
</html>
