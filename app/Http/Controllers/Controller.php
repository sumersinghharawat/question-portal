<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;


/**
 * @OA\Swagger(
 *     schemes={"http"},
 *     host=API_HOST,
 *     basePath="/",
 *     @OA\Info(
 *         version="1.0.0",
 *         title="THE Question Portal",
 *         description="Create a Project using laravel and reactJS",
 *         termsOfService="",
 *         @OA\Contact(
 *             email="sumersingh1997.ssh@gmail.com"
 *         ),
 *     ),
 * )
 */


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
