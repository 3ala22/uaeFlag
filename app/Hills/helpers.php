<?php


function image_class($row, $col, $chunkSize, $chunksCount)
{
    if($col <= ((int)$chunkSize * 0.25)){
        return 'red';
    }
    if($row <= ((int)$chunksCount * 0.3333)) {
        return 'green';
    }
    if($row <= ((int)$chunksCount * 0.6666)) {
        return 'white';
    }
    return 'black';


}

function image_style($imageIndex, $imageSize)
{
    $pos = $imageIndex * $imageSize;
    return 'width: ' . $imageSize . 'px; height: ' . $imageSize . 'px; background-image: url(assets/sprite.png); text-align:center; background-position: -0px -' . $pos . 'px;';
}