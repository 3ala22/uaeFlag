<?php

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class CreateImageSpriteCommand extends Command
{

    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'app:create-sprite';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create image sprite from existing images and save it to public/assets/sprite.png';

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
        $photos = Photo::all()->take(3120);

        $res = Photo::generateSprite($photos);
        $this->info('New File Created: ' . $res['filename']);
        $this->info('Failed: ' . print_r($res['failed']));
    }

    /**
     * Get the console command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return array(//			array('example', InputArgument::REQUIRED, 'An example argument.'),
        );
    }

    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return array(//			array('example', null, InputOption::VALUE_OPTIONAL, 'An example option.', null),
        );
    }

}
