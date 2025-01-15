<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskFilterRequest;
use App\Models\Task;
use App\Helpers\ApiResponse;
use App\Http\Requests\TaskCreateRequest;
use App\Http\Requests\TaskUpdateRequest;
use Tymon\JWTAuth\Facades\JWTAuth;

class TaskController extends Controller
{

    /**
     * Retorna un listado de tareas asociadas al usuario autenticado.
     *
     * Aplica filtros por estado, título y descripción, y pagina los resultados.
     * En la respuesta, se incluyen datos de la paginación bajo la clave "meta".
     *
     * @param  TaskFilterRequest  $request  Petición que contiene los filtros de búsqueda.
     * @return ApiResponse                  Respuesta con la lista de tareas y la información de paginación o un mensaje de error.
     */
    public function index(TaskFilterRequest $request)
    {
        $filters = $request->validated();

        $tasks = Task::where('user_id', JWTAuth::user()->id)
            ->filter($filters)
            ->paginate(10);

        return ApiResponse::success(
            $tasks->items(),
            [
                'meta' => [
                    'current_page' => $tasks->currentPage(),
                    'total_pages' => $tasks->lastPage(),
                    'total_tasks' => $tasks->total(),
                ]
            ]
        );
    }

    /**
     * Crea una nueva tarea asociada al usuario autenticado.
     * 
     * @param TaskCreateRequest $request    Petición que contiene los datos para crear una tarea.
     * @return ApiResponse                  Responde con la nueva tarea o un mensaje de error.
     */
    public function store(TaskCreateRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = JWTAuth::user()->id;
        $task = Task::create($data);

        return ApiResponse::success($task, [], 'Tarea creada exitosamente.', 201);
    }

    /**
     * Retorna la información de una tarea específica asociada al usuario autenticado.
     *
     * @param  string       $id  ID de la tarea.
     * @return ApiResponse       Respuesta con la tarea solicitada o un mensaje de error.
     */
    public function show(string $id)
    {
        $task = Task::where('id', $id)
            ->where('user_id', JWTAuth::user()->id)
            ->first();

        if (!$task) {
            return ApiResponse::error('Tarea no encontrada.', [], 404);
        }

        return ApiResponse::success($task);
    }

    /**
     * Actualiza una tarea asociada al usuario autenticado.
     *
     * @param  TaskUpdateRequest  $request  Petición que contiene los datos para actualizar la tarea.
     * @param  string             $id       ID de la tarea.
     * @return ApiResponse                  Respuesta con la tarea actualizada o un mensaje de error.
     */
    public function update(TaskUpdateRequest $request, string $id)
    {
        $task = Task::where('id', $id)
            ->where('user_id', JWTAuth::user()->id)
            ->first();

        if (!$task) {
            return ApiResponse::error('Tarea no encontrada.', [], 404);
        }

        $task->update($request->validated());

        return ApiResponse::success($task);
    }

    /**
     * Elimina una tarea asociada al usuario autenticado.
     *
     * @param  string       $id  ID de la tarea.
     * @return ApiResponse       Respuesta con la tarea eliminada o un mensaje de error (404).
     */
    public function destroy(string $id)
    {
        $task = Task::where('id', $id)
            ->where('user_id', JWTAuth::user()->id)
            ->first();

        if (!$task) {
            return ApiResponse::error('Tarea no encontrada.', [], 404);
        }

        $task->delete();

        return ApiResponse::success($task, [], 'Tarea eliminada exitosamente.');
    }
}
