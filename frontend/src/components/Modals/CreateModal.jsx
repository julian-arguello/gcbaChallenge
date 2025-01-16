import React, { useState } from 'react';
import { useTasks } from '@context/TasksContext';
import { CreateForm } from '@components/Forms/CreateForm';

export const CreateModal = () => {
  const [onSubmit, setOnSubmit] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const handleSave = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div
      className="modal fade"
      id="createModal"
      tabIndex="-1"
      aria-labelledby="createModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createModalLabel">
              Crear Tarea
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <CreateForm setOnSubmit={setOnSubmit} setIsValid={setIsValid} />
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
              {...(isValid && { 'data-bs-dismiss': 'modal' })}
              disabled={!isValid}
            >
              Crear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
