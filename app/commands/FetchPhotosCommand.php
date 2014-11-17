<?php

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

/**
 * Class FetchPhotosCommand
 */
class FetchPhotosCommand extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'app:fetch-photos';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Fetch and save new photos from instagram and twitter';

    /**
     * @var mixed
     */
    protected $instagramClient;
    /**
     * @var mixed
     */
    protected $twitterClient;

    /**
     * Create a new command instance.
     *
     * @return \FetchPhotosCommand
     */
	public function __construct()
	{
        $this->instagramClient = App::make('Hills\Instagram\InstagramClient');
        $this->twitterClient = App::make('Hills\Twitter\TwitterClient');

        $this->instagramClient->setTag(Config::get('application.tag'));
        $this->twitterClient->setTag(Config::get('application.tag'));

        parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{
        $this->instagramClient->fetchAndStoreRecent();
        $this->twitterClient->fetchAndStoreRecent();
		$this->info('Done!');
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
