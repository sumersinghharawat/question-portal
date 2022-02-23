<?php

namespace App\Http\Controllers;

use App\Models\question;
use App\Models\question_hints;
use App\Models\QuestionDisplayList;
use App\Models\QuestionUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class QuestionUserController extends Controller
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
     *      path="/api/submit-question",
     *      summary="Submit Question",
     *      tags={"User"},
     *      operationId="storeSubmitQuestion",
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
     *                      property="question_id",
     *                      type="number"
     *                  ),
     *                  @OA\Property(
     *                      property="question_answer",
     *                      type="text"
     *                  ),
     *                  @OA\Property(
     *                      property="question_used_hints",
     *                      type="number"
     *                  )
     *             )
     *         )
     *     )
     *)
     *
     */
    public function storeSubmitQuestion(Request $request)
    {
        //

        $submitUserQuestion = array(
            "user_id"=>Auth::user()->id,
            "question_id"=>$request->question_id,
            "question_answer"=>$request->question_answer,
            "question_used_hints"=>$request->question_used_hints,
        );

        $count = QuestionUser::where('question_id',$submitUserQuestion['question_id'])->count();
        if($count == 0){
            $submitUserQuestion = QuestionUser::create($submitUserQuestion);
        }else{
            QuestionUser::where('question_id',$submitUserQuestion['question_id'])->update($submitUserQuestion);
            $submitUserQuestion = QuestionUser::where('question_id',$submitUserQuestion['question_id'])->first();
        }


        return response()->json([
            'response_code' => 200,
            'message' => 'Questions',
            'errors' => (Object)[],
            'data' => $submitUserQuestion
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\QuestionUser  $questionUser
     * @return \Illuminate\Http\Response
     */

    public function show(QuestionUser $questionUser)
    {
        //
    }

    /**
     * @OA\Get(
     *      path="/api/view-users",
     *      summary="View Users",
     *      tags={"User"},
     *      operationId="showUsers",
     *      security={{"bearer_security":{}}},
     *      @OA\Response(response=201,description="successful operation", @OA\JsonContent()),
     *      @OA\Response(response=406,description="not acceptable", @OA\JsonContent()),
     *      @OA\Response(response=500,description="internal server error", @OA\JsonContent()),
     *)
     */
    public function showUsers(QuestionUser $questionUser)
    {
        $users = User::where("role","user")->get();

        foreach($users as $user){
            $user['totalQuestion'] = QuestionUser::where("user_id",$user->id)->count();
            $user['totalAttendQuestion'] = QuestionUser::where("user_id",$user->id)->where("question_answer","<>","")->count();
        }

        return response()->json([
            'response_code' => 200,
            'message' => 'Questions',
            'errors' => (Object)[],
            'data' => $users
        ], 200);
    }


    /**
     * @OA\Get(
     *      path="/api/view-user-questions/{id}",
     *      summary="View Users",
     *      tags={"User"},
     *      operationId="showUserQuestions",
     *      security={{"bearer_security":{}}},
     *      @OA\Parameter(
     *         description="User Id",
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
    public function showUserQuestions($id,QuestionUser $questionUser)
    {
        $questions = QuestionUser::where("user_id",$id)->get();

        foreach ($questions as $question) {
            $question['question'] = question::where('id',$question->question_id)->select("question")->first()->question;
            $question['total_hint'] = question_hints::where('question_id',$question->question_id)->count();
            # code...
        }

        return response()->json([
            'response_code' => 200,
            'message' => 'Questions',
            'errors' => (Object)[],
            'data' => $questions
        ], 200);
    }

    /**
     * @OA\Get(
     *      path="/api/get-today-question/",
     *      summary="Get Today Question",
     *      tags={"User"},
     *      operationId="showQuestionForTest",
     *      security={{"bearer_security":{}}},
     *      @OA\Response(response=201,description="successful operation", @OA\JsonContent()),
     *      @OA\Response(response=406,description="not acceptable", @OA\JsonContent()),
     *      @OA\Response(response=500,description="internal server error", @OA\JsonContent()),
     *)
     */
    public function showQuestionForTest(QuestionUser $questionUser)
    {
        //

        $count = question::where("status",1)->count();

        if($count == 0){
            return response()->json([
                'response_code' => 200,
                'message' => 'No Questions for Today',
                'errors' => (Object)[],
                'data' => null
            ], 200);
        }

        $TodayQuestion = [];

        $count = QuestionDisplayList::whereDate('created_at', Carbon::today())->count();

        if($count == 0){
            $questions = question::where("status",1)->get();

            foreach($questions as $question){
                $count = QuestionDisplayList::where("question_id",$question->id)->count();
                if($count == 0){
                    $TodayQuestion = $question;
                    QuestionDisplayList::create(['question_id'=>$question->id]);

                    $submitUserQuestion = array(
                        "user_id"=>Auth::user()->id,
                        "question_id"=>$question->id,
                        "question_answer"=>"",
                        "question_used_hints"=>0,
                    );

                    $submitUserQuestion = QuestionUser::create($submitUserQuestion);
                    break;
                }
            }
        }else{
            $TodayQuestionId = QuestionDisplayList::whereDate('created_at', Carbon::today())->first();
            $TodayQuestion = question::where("status",1)->where('id',$TodayQuestionId->question_id)->first();
            $hints = question_hints::where("question_id",$TodayQuestionId->question_id)->get();


            $count = QuestionUser::where("question_id",$TodayQuestionId->question_id)->count();

            if($count == 0){
                $submitUserQuestion = array(
                    "user_id"=>Auth::user()->id,
                    "question_id"=>$TodayQuestionId->question_id,
                    "question_answer"=>"",
                    "question_used_hints"=>0,
                );

                $submitUserQuestion = QuestionUser::create($submitUserQuestion);
            }

            $questionUser = QuestionUser::where("question_id",$TodayQuestionId->question_id)->first();

            foreach($hints as $key=>$hint){
                if($questionUser->question_used_hints >= ($key +1)){
                    $hint['viewd'] = true;
                }else{
                    $hint['viewd'] = false;
                }
            }
        }

        if($questionUser->question_answer){
            $questionUser['question'] = $TodayQuestion;
            $questionUser['hints'] = $hints;

            return response()->json([
                'response_code' => 200,
                'message' => 'Questions',
                'errors' => (Object)[],
                'data' => $questionUser
            ], 200);
        }

        $TodayQuestion['hints'] = $hints;
        $TodayQuestion['usedHints'] = $questionUser->question_used_hints;

        return response()->json([
            'response_code' => 200,
            'message' => 'Questions',
            'errors' => (Object)[],
            'data' => $TodayQuestion
        ], 200);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\QuestionUser  $questionUser
     * @return \Illuminate\Http\Response
     */
    public function edit(QuestionUser $questionUser)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\QuestionUser  $questionUser
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, QuestionUser $questionUser)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\QuestionUser  $questionUser
     * @return \Illuminate\Http\Response
     */
    public function destroy(QuestionUser $questionUser)
    {
        //
    }
}
