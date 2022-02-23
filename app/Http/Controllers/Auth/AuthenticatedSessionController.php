<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Mail\forgotPassword;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */


     /**
     * @OA\Post(
     *      path="/api/login",
     *      summary="Login",
     *      tags={"User"},
     *      operationId="store",
     * @OA\Response(response=200,description="successful operation", @OA\JsonContent()),
     * @OA\Response(response=406,description="not acceptable", @OA\JsonContent()),
     * @OA\Response(response=500,description="internal server error", @OA\JsonContent()),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                  @OA\Property(
     *                      property="email",
     *                      type="number"
     *                  ),
     *                  @OA\Property(
     *                      property="password",
     *                      type="string"
     *                  )
     *             )
     *         )
     *     )
     *)
     *
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        // $request->session()->regenerate();
        // return redirect()->intended(RouteServiceProvider::HOME);

        $token = $request->user()->createToken('myapptoken')->plainTextToken;

        return response()->json([
            'response_code' => 200,
            'data' => [
                'user' => Auth::user(),
                'token' => $token,
                'message' => 'Logged in successfully.'
            ]
        ]);
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }


    /**
     * @OA\Get(
     *      path="/api/profile",
     *      summary="User Profile",
     *      tags={"User"},
     *      operationId="profile",
     *      security={{"bearer_security":{}}},
     *      @OA\Response(response=201,description="successful operation", @OA\JsonContent()),
     *      @OA\Response(response=406,description="not acceptable", @OA\JsonContent()),
     *      @OA\Response(response=500,description="internal server error", @OA\JsonContent()),
     *)
     */
    public function profile(){

        return response()->json([
            'response_code' => 200,
            'message' => 'Profile',
            'errors' => (Object)[],
            'data' => Auth::user()
        ], 200);
    }


    /**
     * @OA\Get(
     *      path="/api/checkToken",
     *      summary="Check Token",
     *      tags={"User"},
     *      operationId="checkToken",
     *      security={{"bearer_security":{}}},
     *      @OA\Response(response=201,description="successful operation", @OA\JsonContent()),
     *      @OA\Response(response=406,description="not acceptable", @OA\JsonContent()),
     *      @OA\Response(response=500,description="internal server error", @OA\JsonContent()),
     *)
     */
    public function checkToken(){

        $user = Auth::user();

        return response()->json([
            'response_code' => 200,
            'message' => 'Profile',
            'errors' => (Object)[],
            'data' => $user
        ], 200);
    }

     /**
     * @OA\Post(
     *      path="/api/forgotpassword",
     *      summary="Forgot Password",
     *      tags={"User"},
     *      operationId="forgotPassword",
     * @OA\Response(response=200,description="successful operation", @OA\JsonContent()),
     * @OA\Response(response=406,description="not acceptable", @OA\JsonContent()),
     * @OA\Response(response=500,description="internal server error", @OA\JsonContent()),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                  @OA\Property(
     *                      property="email",
     *                      type="text"
     *                  )
     *             )
     *         )
     *     )
     *)
     *
     */
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json([
                'response_code' => 422,
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors(),
                'data' => (object)[]
            ], 422);
        }

        $count = User::where("email",$request->email)->count();

        if($count != 1){

            return response()->json([
                'response_code' => 422,
                'message' => 'Email not found',
                'errors' => 'Email not found',
                'data' => (Object)[],
            ], 422);

        }

        $user = User::where("email",$request->email)->first();

        $token = $user->createToken('myapptoken')->plainTextToken;

        if($user->role == "user"){
            $details = [
                'title' => 'Forgot Password',
                'body' => 'Click on below link with in 24hours!',
                'url' => '/changepassword/?token='.$token
            ];
        }else{
            $details = [
                'title' => 'Forgot Password',
                'body' => 'Click on below link with in 24hours!',
                'url' => '/admin/changepassword/?token='.$token
            ];
        }


        Mail::to($request->email)->send(new forgotPassword($details));

        return response()->json([
            'response_code' => 200,
            'message' => 'Forgot Password',
            'errors' => (Object)[],
            'data' => $token
        ], 200);
    }


     /**
     * @OA\Post(
     *      path="/api/changepassword",
     *      summary="Change Password",
     *      tags={"User"},
     *      security={{"bearer_security":{}}},
     *      operationId="changePassword",
     * @OA\Response(response=200,description="successful operation", @OA\JsonContent()),
     * @OA\Response(response=406,description="not acceptable", @OA\JsonContent()),
     * @OA\Response(response=500,description="internal server error", @OA\JsonContent()),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                  @OA\Property(
     *                      property="password",
     *                      type="string"
     *                  ),
     *                  @OA\Property(
     *                      property="password_confirmation",
     *                      type="string"
     *                  )
     *             )
     *         )
     *     )
     *)
     *
     */
    public function changePassword(Request $request)
    {

        $user = Auth::user();



        return response()->json([
            'response_code' => 200,
            'message' => 'Password Changed',
            'errors' => (Object)[],
            'data' => $user
        ], 200);
    }
}
