import React from 'react';
import { mapStatus, mapStatusColor } from '@utils/statusMapper';
import styles from '@components/Tasks/TaskItem/taskItem.module.scss';
import { useTasks } from '@context/TasksContext';

export const TaskItem = ({ task }) => {
  const { setSelectTask } = useTasks();

  return (
    <li className={'card border-light mb-3' + styles.card}>
      <div className={'card-header h6' + mapStatusColor(task.status)}>
        {mapStatus(task.status)}
      </div>

      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <p className="card-text">{task.description}</p>
        <p className="m-0 h6">
          <b>Fecha liminte: {task.due_date}</b>
        </p>
      </div>

      <div className="card-footer bg-transparent d-flex justify-content-end">
        <button
          className="btn btn-secondary m-1"
          data-bs-toggle="modal"
          data-bs-target="#editModal"
          onClick={() => setSelectTask(task)}
        >
          Editar
        </button>
        <button
          className="btn btn-danger m-1"
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
          onClick={() => setSelectTask(task)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};
