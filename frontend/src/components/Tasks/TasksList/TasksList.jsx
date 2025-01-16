import React, { useEffect } from 'react';
import { useTasks } from '@context/TasksContext';
import { TaskItem } from '@components/Tasks/TaskItem/TaskItem';
import styles from '@components/Tasks/TasksList/tasksList.module.scss';
import { DeleteModal } from '@components/Modals/DeleteModal';
import { EditModal } from '@components/Modals/EditModal';

export const TasksList = () => {
  const { tasks, loading, fetchTasks } = useTasks();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        await fetchTasks({ status: '', search: '' });
      } catch (error) {
        console.error('Error al cargar las tareas:', error);
      }
    };

    loadTasks();
  }, []);

  if (tasks.length == 0) {
    return <p>Sin tareas</p>;
  }

  return (
    <div className="pb-3 container">
      {loading ? (
        <p>Cargando tareas...</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
      <DeleteModal />
      <EditModal />
    </div>
  );
};
