<?php

namespace Hills\Instagram;

use App;
use Config;
use Hills\ImageClient;
use Intervention\Image\Facades\Image;
use Photo;

class InstagramClient extends ImageClient {

    protected $client_name = 'instagram';


    function __construct()
    {
        $this->client = App::make('andreyco.instagram');
    }

    function getTagImages($tag)
    {
        $result = $this->client->getTagMedia($tag, $this->limit, $this->getLastId());
        return $this->getImages($result);
    }

    function getLoginUrl(){
        return $this->client->getLoginUrl(['basic','likes']);
    }

    function getOAuthToken($code)
    {
        return $this->client->getOAuthToken($code);
    }

    function setAccessToken($token)
    {
        $this->client->setAccessToken($token);
    }

    function getUserLikedPhotos()
    {
        $result = $this->client->getUserLikes();
        return $this->getImages($result);
    }

    private function getImages($result)
    {
        $photos = [];
        if($result->meta->code !== 200){
            dd($result->meta->error_message);
        }

        if(isset($result->pagination->min_tag_id))
            $this->setLastId($result->pagination->min_tag_id);

        foreach($result->data as $item)
        {
            if($item->type == "image")
                $photos [] = $this->extractData($item);
        }
        return $photos;
    }

    function getNext($media){
        return $this->client->pagination($media);
    }

    protected function extractData($item)
    {
        $image = $item->images->standard_resolution;
        $user = $item->user;
        return [
            'source_id' => $item->id,
            'source' => 'instagram',
            'url' => $image->url,
            'width' => $image->width,
            'height' => $image->height,
            'user_id' => $user->id,
            'user_name' => $user->username
        ];
    }
}