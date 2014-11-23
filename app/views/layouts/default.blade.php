<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Largest Selfie flag</title>
	{{ HTML::style('bower_components/html5-boilerplate/css/normalize.css') }}
    {{ HTML::style('bower_components/html5-boilerplate/css/main.css') }}
    {{ HTML::style('flag.css') }}

    {{ HTML::script('bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js') }}
</head>
<body>
	@yield('content')

    {{ HTML::script('bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js') }}


	@yield('footer')

</body>
</html>
