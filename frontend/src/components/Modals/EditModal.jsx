import React, { useRef } from 'react';
import { useTasks } from '@context/TasksContext';
import { EditForm } from '@components/Forms/EditFrom';

export const EditModal = () => {
  const { selectTask, editTask } = useTasks();

  const formSubmitRef = useRef(null);

  const handleSave = () => {
    if (formSubmitRef.current) {
      formSubmitRef.current();
    }
  };

  const handleSubmit = (values) => {
    console.log('Valores enviados:', values);
    editTask(values, selectTask.id);
  };

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
              <EditForm
                task={selectTask}
                onSubmit={handleSubmit}
                setFormSubmitRef={formSubmitRef}
              />
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
              className="btn btn-primary"
              onClick={handleSave}
              data-bs-dismiss="modal"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
