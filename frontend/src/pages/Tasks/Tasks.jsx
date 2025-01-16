import React from 'react';
import { TasksList } from '@components/Tasks/TasksList/TasksList';
import { CreateModal } from '@components/Modals/CreateModal';

export const Tasks = () => {
  return (
    <section>
      <div className="d-flex justify-content-center align-items-center flex-wrap p-4">
        <h2>Listado de tareas</h2>
        <button
          className="btn btn-primary m-3"
          data-bs-toggle="modal"
          data-bs-target="#createModal"
        >
          Crear Tarea
        </button>
      </div>
      <TasksList />
      <CreateModal />
    </section>
  );
};
