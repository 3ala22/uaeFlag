<?php


function image_class($row, $col, $chunkSize, $chunksCount)
{
    if($col <= ((int)$chunkSize * 0.25)){
        return 'red';
    }
    if($row <= ((int)$chunksCount * 0.333)) {
        return 'green';
    }
    if($row <= ((int)$chunksCount * 0.666)) {
        return 'white';
    }
    return 'black';


}