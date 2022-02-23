<?php

namespace App\Http\Controllers;

use App\Models\question_hints;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;

class QuestionHintsController extends Controller
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

     /**
     * @OA\Post(
     *      path="/api/add-question-hint",
     *      summary="Add Question Hint",
     *      tags={"Question"},
     *      operationId="storeQuestionHint",
     *      security={{"bearer_security":{}}},
     * @OA\Response(response=200,description="successful operation", @OA\JsonContent()),
     * @OA\Response(response=406,description="not acceptable", @OA\JsonContent()),
     * @OA\Response(response=500,description="internal server error", @OA\JsonContent()),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                  @OA\Property(
     *                      property="question_hint",
     *                      type="text"
     *                  ),
     *                  @OA\Property(
     *                      property="question_hint_number",
     *                      type="text"
     *                  ),
     *                  @OA\Property(
     *                      property="question_id",
     *                      type="number"
     *                  ),
     *                  @OA\Property(
     *                      property="status",
     *                      type="boolean"
     *                  )
     *             )
     *         )
     *     )
     *)
     *
     */
    public function storeQuestionHint(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'question_id' => 'required',
            'question_hint' => 'required',
            'question_hint_number' => 'required',
            'created_at'=> Carbon::now()
        ]);

        if($validator->fails()) {
            return response()->json([
                'response_code' => 422,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors(),
                'data' => (object)[]
            ], 422);
        }

        $question_hints = array(
            "question_id"=>$request->question_id,
            "question_hint"=>$request->question_hint,
            "question_hint_number"=>$request->question_hint_number
        );
        $count = question_hints::where('question_id',$request->question_id)->count();
        if($count == 3){

            $question_hint_min_id = question_hints::where('question_id',$request->question_id)->min('id');

            question_hints::where('id',$question_hint_min_id)->delete();
        }
        $count = question_hints::where('question_id',$request->question_id)->where('question_hint',$request->question_hint)->count();
        if($count == 0){
            $addQuestionHint = question_hints::create($question_hints);
            return response()->json([
                'response_code' => 201,
                'message' => 'Question Hint Added.',
                'errors' => (object)[],
                'data' => $addQuestionHint
            ], 201);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\question_hints  $question_hints
     * @return \Illuminate\Http\Response
     */

    /**
     * @OA\Get(
     *      path="/api/view-question-hint/{questionid}/{id}",
     *      summary="View Question hint",
     *      tags={"Question"},
     *      operationId="showQuestionHint",
     *      security={{"bearer_security":{}}},
     *      @OA\Parameter(
     *         description="Question Id",
     *         in="path",
     *         name="questionid",
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *      ),
     *      @OA\Parameter(
     *         description="Question Hint Id",
     *         in="path",
     *         name="id",
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *      ),
     *      @OA\Response(response=201,description="successful operation", @OA\JsonContent()),
     *      @OA\Response(response=406,description="not acceptable", @OA\JsonContent()),
     *      @OA\Response(response=500,description="internal server error", @OA\JsonContent()),
     *)
     */
    public function showQuestionHint($questionid,$id="",question_hints $question_hints)
    {
        //
        if($id == "" || $id == "," || $id == null || $id == "{id}"){
            return response()->json([
                'response_code' => 200,
                'message' => 'Questions hints',
                'errors' => (Object)[],
                'data' => $question_hints->where('question_id',$questionid)->get()
            ], 200);
        }


        return response()->json([
            'response_code' => 200,
            'message' => 'Questions hint',
            'errors' => (Object)[],
            'data' => $question_hints->where('question_id',$questionid)->where('id',$id)->get()
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\question_hints  $question_hints
     * @return \Illuminate\Http\Response
     */
    public function edit(question_hints $question_hints)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\question_hints  $question_hints
     * @return \Illuminate\Http\Response
     */


    public function update(Request $request, question_hints $question_hints)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\question_hints  $question_hints
     * @return \Illuminate\Http\Response
     */
    public function destroy(question_hints $question_hints)
    {
        //
    }
}
