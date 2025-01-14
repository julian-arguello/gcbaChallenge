<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskFilterRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Helpers\ApiResponse;
use App\Http\Requests\TaskCreateRequest;
use App\Http\Requests\TaskUpdateRequest;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(TaskFilterRequest $request)
    {
        $tasks = Task::filter($request->validated())->paginate(10);

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
     * Store a newly created resource in storage.
     */
    public function store(TaskCreateRequest $request)
    {
        $task = Task::create($request->validated());

        return ApiResponse::success($task, [], 'Tarea creada exitosamente.', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if (!ctype_digit($id)) {
            return ApiResponse::error('El ID debe ser un número entero.');
        }

        $task = Task::find($id);

        if (!$task) {
            return ApiResponse::error('Tarea no encontrada.', [], 404);
        }

        return ApiResponse::success($task);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(TaskUpdateRequest $request, string $id)
    {

        if (!ctype_digit($id)) {
            return ApiResponse::error('El ID debe ser un número entero.');
        }

        $task = Task::find($id);

        if (!$task) {
            return ApiResponse::error('Tarea no encontrada.', [], 404);
        }

        $task->update($request->validated());

        return ApiResponse::success($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (!ctype_digit($id)) {
            return ApiResponse::error('El ID debe ser un número entero.');
        }

        $task = Task::find($id);

        if (!$task) {
            return ApiResponse::error('Tarea no encontrada.', [], 404);
        }

        $task->delete();

        return ApiResponse::success($task, [], "Tarea eliminada exitosamente.");
    }
}
