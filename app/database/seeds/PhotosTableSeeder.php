<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class PhotosTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

        $sources = ['instagram','twitter','media_pole'];

        $imgWidth = 150;
        $imgHeight = 150;
		foreach(range(1, 1152) as $index)
		{
			Photo::create([
                'url' => 'http://placehold.it/'.$imgWidth.'X'.$imgHeight,
                'width' => $imgWidth,
                'height' => $imgHeight,
                'source' => $sources[array_rand($sources)],
                'source_id' => $faker->creditCardNumber . $index,
                'user_id' => $faker->randomNumber(6),
                'user_name' => $faker->userName
			]);
		}
	}

}