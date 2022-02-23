<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class question_hints extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_hint',
        'question_hint_number',
        'question_id',
        'status',
        'created_at'
    ];
}
