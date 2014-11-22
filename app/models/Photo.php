<?php

use Intervention\Image\Facades\Image;

class Photo extends Eloquent{

    protected $fillable = ['url','width','height','source','source_id','user_id','user_name','status'];


    public function getOriginalFilePath()
    {
        return 'public/assets/'.$this['source'] .'/'.$this['source_id'].'.jpg';
    }

    public function getFilePath($size = '24x24')
    {
        $originalFilePath = $this->getOriginalFilePath();
        return substr($originalFilePath,0,strlen($this->getOriginalFilePath()) - 4).'.'.$size.'.jpg';
    }

    public function resize($w = 24, $h = 24)
    {
        $filename = base_path() . '/'.$this->getOriginalFilePath();
        $imgObj = Image::make($filename);
        $imgObj->resize($w,$h);

        $newFileName = substr($filename,0,strlen($filename)-4) . '.'.$w.'x'.$h.'.jpg';
        $imgObj->save($newFileName);

        return $newFileName;
    }

    public static function generateSprite($photos, $outputFilename = 'assets/sprite')
    {
        $photo = $photos[0];
        $base_path = base_path();
        $public_path = 'public/';

        $image = Image::make($base_path . '/' . $photo->getFilePath());


        $imgHeight = $image->height();
        $imgWidth = $image->width();

        $spriteHeight = count($photos) * $imgHeight;

        $im = imagecreatetruecolor($imgWidth,$spriteHeight);

        // Add alpha channel to image (transparency)
        imagesavealpha($im, true);
        $alpha = imagecolorallocatealpha($im, 0, 0, 0, 127);
        imagefill($im,0,0,$alpha);

        // Append images to sprite and generate CSS lines
        $i = $ii = 0;
        $failed = [];
        foreach($photos as $key => $photo) {
            try {
                $im2 = imagecreatefromjpeg($base_path . '/' . $photo->getFilePath());
                imagecopy($im, $im2, 0, ($imgHeight * $i), 0, 0, $imgWidth, $imgHeight);
                $photo['pos'] = $i;
                $photo['spriteUrl'] = $outputFilename.'.png';
                $i++;
            }
            catch (Exception $e)
            {
                $failed [] = $photo->id;
                continue;
            }
        }
        imagepng($im,$base_path. '/' .$public_path.$outputFilename.'.png'); // Save image to file
        imagedestroy($im);

        return [
            'filename'=>$outputFilename,
            'photos'=>$photos,
            'failed'=>$failed
            ];
    }
}
