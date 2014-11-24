<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/flag', function () {
    return View::make('main');

});
Route::get('/admin', function () {
    return View::make('admin');

});

Route::group(array('prefix' => 'api'), function () {

    Route::group(array('before' => array('serviceAuth')), function () {
        Route::resource('photo', 'PhotoController');
        Route::get('auth/logout', 'AuthenticationController@destroy');
        Route::get('/stats', 'PhotoController@getStatistics');
    });
    Route::resource('auth', 'AuthenticationController');
});


Route::get('/twitter', function () {

    $twitterClient = App::make('Thujohn\Twitter\Twitter');

    return $twitterClient->getSearch(['q' => '#largest filter:images -filter:retweets', 'count' => 30, 'format' => 'json']);
});

Route::get('/instagram', function () {
    $instagramClient = App::make('andreyco.instagram');

    return json_encode($instagramClient->getTagMedia('largest'));
});

Route::get('/twitter/photos', function () {

    $twitterClient = App::make('Hills\Twitter\TwitterClient');

    $photos = $twitterClient->getTagImages('fun');

    return View::make('album', ['photos' => $photos]);
});


Route::get('/images', function () {
    $lastUpdated = Input::get('lastUpdated');
    $photos = Photo::where('status', 2)
        ->where('updated_at', '>', $lastUpdated)
        ->orderBy('updated_at')
        ->get();

    return Response::json([
        'data' => $photos
    ]);
});

Route::get('/getSprite', function () {

    $photos = Photo::where('status', 2)->where('source', 'instagram')->get()->take(3120);

    $filename = Photo::generateSprite($photos);

    return Response::json([
        'data' => [
            'img' => $filename . '.png',
            'css' => $filename . '.css'
        ]
    ]);
});

Route::get('/auth', function () {
    $code = Input::get('code');
    $instagramClient = App::make('Hills\Instagram\InstagramClient');

    if (!$code) {
        $login_url = $instagramClient->getLoginUrl();
        return Redirect::to($login_url);
//        return View::make('login',['url'=>$login_url]);
    } else {
        $data = $instagramClient->getOAuthToken($code);
        if (isset($data->access_token)) {
            $user = User::where('user_id', '=', $data->user->id)->first();
            if ($user) {  // user already exists
                return $user;
            }
            // else create new user
            $userData = (array)$data->user;
            $userData['access_token'] = $data->access_token;
            $userData['user_id'] = $data->user->id;

            return User::create($userData);
        }

        return json_encode($data);

    }
});

Route::get('/likes', function () {
    $instagramClient = App::make('Hills\Instagram\InstagramClient');
    $user = User::where('username', '=', 'awadamal')->firstOrFail();
    $instagramClient->setAccessToken($user['access_token']);

    $likedPhotos = $instagramClient->getUserLikedPhotos();

    return json_encode($likedPhotos);

});


Route::get('/', function () {
    $tilesCount = 3120;
    $imageSize = 24;

    return View::make('flag.index', compact('tilesCount', 'imageSize'));
});