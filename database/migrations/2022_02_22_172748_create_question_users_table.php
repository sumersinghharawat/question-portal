<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('question_users', function (Blueprint $table) {
            $table->id();
            $table->integer("user_id");
            $table->integer("question_id");
            $table->text("question_answer")->nullable();
            $table->integer("question_used_hints");
            $table->integer("question_status")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('question_users');
    }
}
