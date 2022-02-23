<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class QuestionUser extends Model
{
    use HasApiTokens, HasFactory, Notifiable;


    protected $fillable = [
        'user_id',
        'question_id',
        'question_answer',
        'question_used_hints'
    ];
}
