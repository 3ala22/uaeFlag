<?php

class AuthenticationController extends \BaseController
{

    public function index()
    {
        Auth::logout();
        return Response::json([
                'flash' => 'you have been disconnected'],
            200
        );
    }


    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        $credentials = array(
            'username' => Input::get('username'),
            'password' => Input::get('password'));
        if (Auth::attempt($credentials)) {
            return Response::json([
                    'user' => Auth::user()->toArray()],
                202
            );

        } else {
            return Response::json([
                    'flash' => 'Authentication failed'],
                401
            );
        }
    }


}
