<?php

class AuthenticationController extends \BaseController
{

    public function index()
    {
        if (Auth::check()) {
            return Response::json([
                'user' => Auth::user()->toArray()
            ]);
        }
        else{
            return Response::json([
                    'flash' => 'User not logged in'],
                401
            );
        }
    }

    public function destroy()
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
                    'flash' => 'Invalid username or password'],
                401
            );
        }
    }


}
