<?php

namespace App\Http\Controllers;

use App\Models\question;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Console\Question\Question as QuestionQuestion;

class QuestionController extends Controller
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
     *      path="/api/add-question",
     *      summary="Add Question",
     *      tags={"Question"},
     *      operationId="storeQuestion",
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
     *                      property="question",
     *                      type="text"
     *                  ),
     *                  @OA\Property(
     *                      property="answer",
     *                      type="text"
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
    public function storeQuestion(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'question' => 'required',
            'answer' => 'required',
            'created_at'=>Carbon::now()
        ]);

        if($validator->fails()) {
            return response()->json([
                'response_code' => 422,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors(),
                'data' => (object)[]
            ], 422);
        }

        $question = array(
            "question"=>$request->question,
            "answer"=>$request->answer
        );

        $addQuestion = question::create($question);

        return response()->json([
            'response_code' => 201,
            'message' => 'Question Added.',
            'errors' => (object)[],
            'data' => $addQuestion
        ], 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\question  $question
     * @return \Illuminate\Http\Response
     */


    /**
     * @OA\Get(
     *      path="/api/view-question/{id}",
     *      summary="View Question",
     *      tags={"Question"},
     *      operationId="showQuestion",
     *      security={{"bearer_security":{}}},
     *      @OA\Response(response=201,description="successful operation", @OA\JsonContent()),
     *      @OA\Response(response=406,description="not acceptable", @OA\JsonContent()),
     *      @OA\Response(response=500,description="internal server error", @OA\JsonContent()),
     *)
     */
    public function showQuestion($id="",question $question)
    {
        //
        if($id == "" || $id == "," || $id == null){
            return response()->json([
                'response_code' => 200,
                'message' => 'Questions',
                'errors' => (Object)[],
                'data' => $question->all()
            ], 200);
        }


        return response()->json([
            'response_code' => 200,
            'message' => 'Questions',
            'errors' => (Object)[],
            'data' => $question->where('id',$id)->first()
        ], 200);


    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\question  $question
     * @return \Illuminate\Http\Response
     */
    public function edit(question $question)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\question  $question
     * @return \Illuminate\Http\Response
     */

    /**
     * @OA\Patch(
     *      path="/api/update-question-status/{id}",
     *      summary="Update Question Status",
     *      tags={"Question"},
     *      operationId="updateQuestionStatus",
     *      security={{"bearer_security":{}}},
     *      @OA\Parameter(
     *         description="Question Id",
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
     public function updateQuestionStatus($id, question $question)
    {
        //
        if($id == "" || $id == "," || $id == null){
            return response()->json([
                'response_code' => 422,
                'message' => 'Question id not valid',
                'errors' => 'Question id not valid',
                'data' => (Object)[]
            ], 422);
        }else{
            $count = question::where('id',$id)->count();
            if($count == 0){
                return response()->json([
                    'response_code' => 422,
                    'message' => 'Question id not available',
                    'errors' => 'Question id not available',
                    'data' => (Object)[]
                ], 422);
            }
        }

        $question = question::where('id',$id)->first();

        if($question->status == 1){
            $status = 0;
        }else{
            $status = 1;
        }

        if(question::where('id',$id)->update(['status'=>$status])){
            $question = question::where('id',$id)->first();

            return response()->json([
                'response_code' => 200,
                'message' => 'Question Deleted',
                'errors' => (Object)[],
                'data' => $question
            ], 200);
        }else{
            return response()->json([
                'response_code' => 500,
                'message' => 'Question not Deleted',
                'errors' => "Question not deleted",
                'data' => (Object)[]
            ], 500);
        }
    }


     /**
     * @OA\Post(
     *      path="/api/update-question/{id}",
     *      summary="Update Question",
     *      tags={"Question"},
     *      operationId="updateQuestion",
     *      security={{"bearer_security":{}}},
     * @OA\Response(response=200,description="successful operation", @OA\JsonContent()),
     * @OA\Response(response=406,description="not acceptable", @OA\JsonContent()),
     * @OA\Response(response=500,description="internal server error", @OA\JsonContent()),
     *      @OA\Parameter(
     *         description="Question Id",
     *         in="path",
     *         name="id",
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *      ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                  @OA\Property(
     *                      property="question",
     *                      type="text"
     *                  ),
     *                  @OA\Property(
     *                      property="answer",
     *                      type="text"
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
    public function updateQuestion(Request $request,$id,question $questions)
    {

        $validator = Validator::make($request->all(), [
            'question' => 'required',
            'answer' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json([
                'response_code' => 422,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors(),
                'data' => (object)[]
            ], 422);
        }

        //
        if($id == "" || $id == "," || $id == null){
            return response()->json([
                'response_code' => 422,
                'message' => 'Question id not valid',
                'errors' => 'Question id not valid',
                'data' => (Object)[]
            ], 422);
        }else{
            $count = question::where('id',$id)->count();
            if($count == 0){
                return response()->json([
                    'response_code' => 422,
                    'message' => 'Question id not available',
                    'errors' => 'Question id not available',
                    'data' => (Object)[]
                ], 422);
            }
        }

        $question = [
            "question"=>$request->question,
            "answer"=>$request->answer,
            "status"=>$request->status?1:0,
        ];

        if(question::where('id',$id)->update($question)){
            return response()->json([
                'response_code' => 200,
                'message' => 'Question id not available',
                'errors' => (Object)[],
                'data' => $questions::where('id',$id)->first()
            ], 200);
        }else{
            return response()->json([
                'response_code' => 500,
                'message' => 'Question not updated',
                'errors' => 'Question not updated',
                'data' => (Object)[]
            ], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\question  $question
     * @return \Illuminate\Http\Response
     */

    /**
     * @OA\Delete(
     *      path="/api/delete-question/{id}",
     *      summary="Delete Question",
     *      tags={"Question"},
     *      operationId="destroyQuestion",
     *      security={{"bearer_security":{}}},
     *      @OA\Parameter(
     *         description="Question Id",
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
    public function destroyQuestion($id,question $question)
    {
        //
        if($id == "" || $id == "," || $id == null){
            return response()->json([
                'response_code' => 422,
                'message' => 'Question id not valid',
                'errors' => 'Question id not valid',
                'data' => (Object)[]
            ], 422);
        }else{
            $count = question::where('id',$id)->count();
            if($count == 0){
                return response()->json([
                    'response_code' => 422,
                    'message' => 'Question id not available',
                    'errors' => 'Question id not available',
                    'data' => (Object)[]
                ], 422);
            }
        }

        if(question::where('id',$id)->delete()){
            return response()->json([
                'response_code' => 200,
                'message' => 'Question Deleted',
                'errors' => (Object)[],
                'data' => $id
            ], 200);
        }else{
            return response()->json([
                'response_code' => 500,
                'message' => 'Question not Deleted',
                'errors' => "Question not deleted",
                'data' => (Object)[]
            ], 500);
        }
    }
}
