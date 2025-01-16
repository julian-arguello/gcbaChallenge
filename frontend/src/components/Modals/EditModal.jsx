import React from 'react';
import { useTasks } from '@context/TasksContext';

export const EditModal = () => {
  const { selectTask } = useTasks();

  return (
    <div
      className="modal fade"
      id="editModal"
      tabIndex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">
              Editar Tarea
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {selectTask && (
              <ul>
                <li>{selectTask.title}</li>
                <li>{selectTask.description}</li>
                <li>{selectTask.status}</li>
                <li>{selectTask.due_date}</li>
              </ul>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => console(selectTask.id)}
              data-bs-dismiss="modal"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
