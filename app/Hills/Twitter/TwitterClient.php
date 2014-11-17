<?php
namespace Hills\Twitter;

use App;
use Hills\ImageClient;

class TwitterClient extends ImageClient
{

    protected $client_name = 'twitter';

    function __construct()
    {
        $this->client = App::make('Thujohn\Twitter\Twitter');
    }

    public function getTagImages($tag)
    {

        $photos = array();
        $result = $this->client->getSearch(['q' => "#$tag filter:images -filter:retweets", 'count' => $this->limit,'since_id'=> $this->getLastId()]);

        if($result->search_metadata)
        {
            $this->setLastId($result->search_metadata->max_id_str);
        }
        foreach ($result->statuses as $item) {
            try {
                $photos [] = $this->extractData($item);
            }
            catch(\Exception $e)
            {
                continue;
            }
        }

        return $photos;
    }


    protected function extractData($item)
    {
        $media = $item->entities->media[0];
        $user = $item->user;
        return [
            'source_id' => $item->id_str,
            'source' => 'twitter',
            'url' => $media->media_url,
            'width' => $media->sizes->medium->w,
            'height' => $media->sizes->medium->h,
            'user_id' => $user->id_str,
            'user_name' => $user->screen_name
        ];
    }
}