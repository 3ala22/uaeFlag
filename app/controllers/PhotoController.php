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
        $status = Input::get('status') ?: 1;
        if ($status == 1)
            return $this->transformCollection(Photo::where('status', '=', $status)->orderBy('updated_at', 'desc')->get());
        else
            return $this->transformPaginator(Photo::where('status', '=', $status)->orderBy('updated_at', 'desc')->paginate($limit));
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

        return Response::json([
            'data' => $photo
        ]);
    }

    private function transformPaginator(Paginator $paginator)
    {
        return [
            'data' => $paginator->getCollection(),
            'paginator' =>[
                'currentPage' => $paginator->getCurrentPage(),
                'limit' => $paginator->getPerPage(),
                'total' => $paginator->getTotal()
            ]
        ];
    }

    private function transformCollection(Collection $collection)
    {
        return [
            'data' => $collection->toArray(),
            'paginator' => [
                'currentPage' => 1
            ]
        ];
    }


}