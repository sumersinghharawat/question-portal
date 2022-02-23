<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    // /**
    //  * @OA\Post(
    //  *      path="/api/add-product",
    //  *      summary="Add Product",
    //  *      tags={"Product"},
    //  *      operationId="productStore",
    //  *   security={{"bearer_security":{}}},
    //  * @OA\Response(response=200,description="successful operation", @OA\JsonContent()),
    //  * @OA\Response(response=406,description="not acceptable", @OA\JsonContent()),
    //  * @OA\Response(response=500,description="internal server error", @OA\JsonContent()),
    //  *     @OA\RequestBody(
    //  *         required=true,
    //  *         @OA\MediaType(
    //  *             mediaType="multipart/form-data",
    //  *             @OA\Schema(
    //  *                  required={"name","cost","image"},
    //  *                  @OA\Property(
    //  *                      property="name",
    //  *                      type="string"
    //  *                  ),
    //  *                  @OA\Property(
    //  *                      property="cost",
    //  *                      type="string"
    //  *                  ),
    //  *                  @OA\Property(
    //  *                      property="discount_cost",
    //  *                      type="string"
    //  *                  ),
    //  *                  @OA\Property(
    //  *                      property="description",
    //  *                      type="text"
    //  *                  ),
    //  *                  @OA\Property(
    //  *                      property="status",
    //  *                      type="boolean"
    //  *                  ),
    //  *                  @OA\Property(
    //  *                      property="image",
    //  *                      type="string",
    //  *                      format="binary"
    //  *                  )
    //  *             )
    //  *         )
    //  *     )
    //  *)
    //  *
    //  */
    public function productStore(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'cost' => 'required',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if($validator->fails()) {
            return response()->json([
                'response_code' => 422,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors(),
                'data' => (object)[]
            ], 422);
        }

        if ($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path("product"), $imageName);
        }

        $requestData = array_filter($request->all());

        if ($request->hasFile('image')) {
            $requestData['image'] = 'product/'.$imageName;
        }

        if(Product::create($requestData)){
            return response()->json([
                'response_code' => 200,
                'message' => 'Product Added',
                'errors' => (Object)[],
                'data' => $requestData
            ], 200);
        }else{

            return response()->json([
                'response_code' => 200,
                'message' => 'Product not Added',
                'errors' => (Object)[],
                'data' => $request->all()
            ], 200);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */


    // /**
    //  * @OA\Get(
    //  *      path="/api/view-product/{id}",
    //  *      summary="View product",
    //  *      tags={"Product"},
    //  *      operationId="productShow",
    //  *      security={{"bearer_security":{}}},
    //  *      @OA\Parameter(
    //  *         description="Product Id",
    //  *         in="path",
    //  *         name="id",
    //  *         @OA\Schema(
    //  *             type="integer",
    //  *             format="int64"
    //  *         )
    //  *      ),
    //  *      @OA\Response(response=201,description="successful operation", @OA\JsonContent()),
    //  *      @OA\Response(response=406,description="not acceptable", @OA\JsonContent()),
    //  *      @OA\Response(response=500,description="internal server error", @OA\JsonContent()),
    //  *)
    //  */
    public function productShow($id="",Product $product)
    {
        //
        if($id=="," || $id==""){
            $product = Product::all();
        }else{
            $product = Product::where('id',$id)->first();
        }

        return response()->json([
            'response_code' => 201,
            'message' => 'Products',
            'errors' => (Object)[],
            'data' => $product
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }
}
