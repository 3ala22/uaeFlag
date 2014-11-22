<!DOCTYPE html>
<!--[if lt IE 7]>      <html lang="en" ng-app="flagAdmin" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html lang="en" ng-app="flagAdmin" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html lang="en" ng-app="flagAdmin" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en" ng-app="flagAdmin" class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Instagram Flag</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{ HTML::style('bower_components/html5-boilerplate/css/normalize.css') }}
    {{ HTML::style('bower_components/html5-boilerplate/css/main.css') }}
    {{ HTML::style('bower_components/bootstrap/dist/css/bootstrap.min.css') }}
    {{ HTML::style('bower_components/font-awesome/css/font-awesome.min.css') }}
    {{ HTML::style('admin-content/sb-admin.css') }}
    {{ HTML::style('admin-content/admin.css') }}

    {{ HTML::script('bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js') }}
    </head>
<body>
<div id="wrapper" ng-controller="mainCtrl">
    <div ng-include="'admin-content/shared/navigation.html'"></div>
    <div id="page-wrapper">
         <div class="container-fluid" ng-view></div>
    </div>
</div>

{{--    {{ HTML::script('bower_components/jquery/dist/jquery.js') }}--}}
    {{ HTML::script('bower_components/angular/angular.js') }}
    {{ HTML::script('bower_components/angular-route/angular-route.js') }}
    {{ HTML::script('bower_components/angular-resource/angular-resource.min.js') }}
    {{ HTML::script('bower_components/angular-sanitize/angular-sanitize.min.js') }}
    {{ HTML::script('bower_components/angular-animate/angular-animate.min.js') }}
    {{ HTML::script('bower_components/underscore/underscore-min.js') }}
    {{ HTML::script('bower_components/ui-bootstrap/ui-bootstrap-custom-0.12.0.min.js') }}
    {{ HTML::script('bower_components/ui-bootstrap/ui-bootstrap-custom-tpls-0.12.0.min.js') }}

    {{ HTML::script('admin-content/app.js') }}
    {{ HTML::script('admin-content/shared/navigation.js') }}
    {{ HTML::script('admin-content/login/login.js') }}
    {{ HTML::script('admin-content/picker/picker.js') }}
    {{ HTML::script('admin-content/reports/reports.js') }}
    {{ HTML::script('services/services.js') }}

    <script>
        angular.module("flagAdmin").constant("CSRF_TOKEN", '<?php echo csrf_token(); ?>');
    </script>
</body>
</html>
