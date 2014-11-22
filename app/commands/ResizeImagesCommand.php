<?php

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class ResizeImagesCommand extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'app:resize-images';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Resize images in assets folders';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{
        $photos = Photo::all();
        $photos->each(function($photo){

            try {
                $photo->resize(24, 24);
            }
            catch (\Intervention\Image\Exception\NotReadableException $e)
            {
                $this->error('Photo not found: ' . $photo->getOriginalFilePath());
            }
            catch (\Exception $e)
            {
                $this->error('Photo could not be resized: ' . $photo->getOriginalFilePath());
            }
        });

	}

	/**
	 * Get the console command arguments.
	 *
	 * @return array
	 */
	protected function getArguments()
	{
		return array(
//			array('example', InputArgument::REQUIRED, 'An example argument.'),
		);
	}

	/**
	 * Get the console command options.
	 *
	 * @return array
	 */
	protected function getOptions()
	{
		return array(
//			array('example', null, InputOption::VALUE_OPTIONAL, 'An example option.', null),
		);
	}

}
