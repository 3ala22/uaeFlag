<?php

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\Paginator;

class PhotoController extends \BaseController
{
    /**
     * Display a listing of the resource.
     * GET /photo
     *
     * @return Response
     */
    public function index()
    {
        $limit = Input::get('limit') ?: 20;
        $status = Input::get('status');
        $source = Input::get('source');

        $sort = Input::get('sort') ?: 'id';
        $order =  Input::get('order') ?: 'asc';


        $query = Photo::orderBy($sort, $order);
        if($status) $query->where('status', '=', $status);
        if($source) $query->where('source', '=', $source);

        $photos = $query->paginate($limit);

        return [
            'data' => $this->transformCollection($photos->getCollection()),
            'paginator' =>[
                'currentPage' => $photos->getCurrentPage(),
                'limit' => $photos->getPerPage(),
                'total' => $photos->getTotal(),
                'numOfPages' => $photos->getLastPage()
            ]
        ];

    }

    /**
     * Update the specified resource in storage.
     * PUT /photo/{id}
     *
     * @param  int $id
     * @return Response
     */
    public function update($id)
    {
        $photo = Photo::findOrFail($id);

        if (!$photo) {
            return Response::json([
                'error' => 'Model not found'
            ], 404);
        }
        $photo->status = Input::get('status');

        $photo->save();

        if($photo->status == 2) // if approved
            $photo->resize(24,24);

        return Response::json([
            'data' => $photo
        ]);
    }

    public function getStatistics()
    {
        $response = [];
        $result = DB::table('photos')
            ->select('source', DB::raw('count(*) as total'))
            ->groupBy('source')
            ->get();

       foreach ($result as $value)
       {
           $response[$value->source] = $value->total;
       }
        return $response;

    }

    private function transformCollection($photos)
    {
        return array_map([$this,'transform'], $photos->toArray());

    }

    private function transform($photo)
    {
        return [
            'id' => $photo['id'],
            'url' => $photo['url'],
            'height' => $photo['height'],
            'width' => $photo['width'],
            'source' => $photo['source'],
            'source_id' => $photo['source_id'],
            'user_id' => $photo['user_id'],
            'user_name' => $photo['user_name'],
            'status' => $photo['status'],
            'created_at' => date('d F, Y H:i:s',strtotime($photo['created_at'])),
            'updated_at' => date('d F, Y H:i:s',strtotime($photo['updated_at']))
        ];


    }


}