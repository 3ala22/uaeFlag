<?php

class Photo extends Eloquent{

    protected $fillable = ['url','width','height','source','source_id','user_id','user_name','status'];
} 