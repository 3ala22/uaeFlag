<?php

class UsersTableSeeder extends Seeder {

    public function run(){
        Eloquent::unguard();
        DB::table('users')->delete();

        User::create(array(
            'username' => 'maherb',
            'password' => Hash::make('maherb543'),
            'name' => 'Maher Boulos',
            'role' => 'Admin'
        ));

        User::create(array(
            'username' => 'ala.hawash',
            'password' => Hash::make('unreal15'),
            'name' => 'Ala\' Hawash',
            'role' => 'Admin'
        ));

        User::create(array(
            'username' => 'john',
            'password' => Hash::make('john'),
            'name' => 'John',
            'role' => 'User'
        ));

        User::create(array(
            'username' => 'milad',
            'password' => Hash::make('milad'),
            'name' => 'Milad Samia',
            'role' => 'User'
        ));
    }
}