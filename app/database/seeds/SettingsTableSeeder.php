<?php


class SettingsTableSeeder extends Seeder {

	public function run()
	{

			Setting::create([
                'key' => 'instagram_last_id',
                'value' => '0'
			]);
            Setting::create([
                'key' => 'twitter_last_id',
                'value' => '0'
            ]);
	}

}