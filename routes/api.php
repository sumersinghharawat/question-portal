<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuestionHintsController;
use App\Http\Controllers\QuestionUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// User
Route::post('/login', [AuthenticatedSessionController::class, 'store'])->middleware('guest');
Route::post('/register', [RegisteredUserController::class, 'registration'])->middleware('guest');
Route::post('/forgotpassword', [AuthenticatedSessionController::class, 'forgotPassword'])->middleware('guest');

Route::get('/check-token', [AuthenticatedSessionController::class, 'checkToken']);

Route::middleware(['auth:sanctum'])->name('api.')->group(function () {
    // User
    Route::get('/profile', [AuthenticatedSessionController::class, 'profile']);
    Route::post('/changepassword', [AuthenticatedSessionController::class, 'changePassword']);

    // Question
    Route::post('add-question',[QuestionController::class, 'storeQuestion']);
    Route::get('view-question',[QuestionController::class, 'showQuestion']);
    Route::get('view-question/{id}',[QuestionController::class, 'showQuestion']);
    Route::delete('delete-question/{id}',[QuestionController::class, 'destroyQuestion']);
    Route::patch('update-question-status/{id}',[QuestionController::class, 'updateQuestionStatus']);
    Route::post('update-question/{id}',[QuestionController::class, 'updateQuestion']);

    // Question Hint
    Route::post('add-question-hint',[QuestionHintsController::class, 'storeQuestionHint']);
    Route::get('view-question-hint/{questionid}',[QuestionHintsController::class, 'showQuestionHint']);
    Route::get('view-question-hint/{questionid}/{id}',[QuestionHintsController::class, 'showQuestionHint']);

    Route::get('get-today-question',[QuestionUserController::class,'showQuestionForTest']);
    Route::post('submit-question',[QuestionUserController::class,'storeSubmitQuestion']);
    Route::get('view-users',[QuestionUserController::class,'showUsers']);
    Route::get('view-user-questions/{id}',[QuestionUserController::class,'showUserQuestions']);


    // Product
    // Route::get('view-product',[ProductController::class, 'productShow']);
    // Route::get('view-product/{id}',[ProductController::class, 'productShow']);
});
