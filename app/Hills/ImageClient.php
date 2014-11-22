<?php namespace Hills;

use Intervention\Image\Facades\Image;
use Log;
use Photo;
use Setting;

/**
 * Class ImageClient
 * @package Hills
 */
abstract class ImageClient {

    protected $tag;

    protected $client;

    protected $limit = 30;

    protected $client_name;
    /**
     * @return mixed
     */
    public function getTag()
    {
        return $this->tag;
    }

    /**
     * @param mixed $tag
     * @return $this
     */
    public function setTag($tag)
    {
        $this->tag = $tag;
        return $this;
    }

    /**
     * @param $tag
     * @return Array
     */
    abstract public function getTagImages($tag);


    /**
     * @param $item
     * @return mixed
     */
    abstract protected function extractData($item);

    /**
     * @param $image
     */
    public function storeImage($image)
    {
        $imgObj = Image::make($image['url']);
        $imgObj->save('public/assets/'.$image['source'].'/'.$image['source_id'].'.jpg');

        $imgObjCopy = clone $imgObj;
        $imgObjCopy->resize(150,150);
        $imgObjCopy->save('public/assets/'.$image['source'].'/'.$image['source_id'].'.thumb.jpg');

        $imgObjCopy = clone $imgObj;
        $imgObjCopy->resize(280,280);
        $imgObjCopy->save('public/assets/'.$image['source'].'/'.$image['source_id'].'.small.jpg');

        Photo::firstOrCreate($image);
    }

    /**
     * Fetch and store images from client
     */
    public function fetchAndStoreRecent()
    {
        $images = $this->getTagImages($this->getTag());

        foreach($images as $image)
        {
            try {
                $this->storeImage($image);
            }
            catch(\Exception $e){
                Log::error($e);
                continue;
            }
        }
    }

    public function getLastId()
    {
        $setting = Setting::where('key','=',$this->client_name.'_last_id')->firstOrFail();
        return $setting->value;
    }
    public function setLastId($newValue)
    {
        $setting = Setting::where('key','=',$this->client_name.'_last_id')->firstOrFail();
        $setting->value = $newValue;
        $setting->save();
    }
} 