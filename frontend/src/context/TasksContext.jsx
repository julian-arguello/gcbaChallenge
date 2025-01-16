import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getTasks as getTaskApi,
  deleteTask as deleteTaskApi,
  createTask as createTaskApi,
  editTask as editTaskApi,
} from '@api/tasks';
import { useNotification } from '@context/NotificationContext';

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectTask, setSelectTask] = useState(null);
  const { addNotification } = useNotification();
  const [filters, setFilters] = useState({});
  const [meta, setMeta] = useState({
    current_page: 1,
    total_pages: 1,
    total_tasks: 0,
  });

  useEffect(() => {
    fetchTasks();
  }, [filters, meta.current_page]);

  /**
   *
   */
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const page = meta.current_page ?? 1;
      const params = { ...filters, page };
      const response = await getTaskApi(params);
      setTasks(response.data);
      if (response.meta) {
        setMeta({
          current_page: response.meta.current_page,
          total_pages: response.meta.total_pages,
          total_tasks: response.meta.total_tasks,
        });
      }
    } catch (error) {
      addNotification(error.message, 'danger');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   *
   */
  const createTask = async (task) => {
    setLoading(true);
    try {
      const response = await createTaskApi(task);
      setSelectTask(null);
      await fetchTasks();
      addNotification(response.message);
    } catch (error) {
      addNotification(error.message, 'danger');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   *
   */
  const editTask = async (task, taskId) => {
    setLoading(true);
    try {
      const response = await editTaskApi(task, taskId);
      setSelectTask(null);
      await fetchTasks();
      addNotification(response.message);
    } catch (error) {
      addNotification(error.message, 'danger');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   *
   */
  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      const response = await deleteTaskApi(taskId);
      setSelectTask(null);
      await fetchTasks();
      addNotification(response.message);
    } catch (error) {
      addNotification(error.message, 'danger');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        fetchTasks,
        selectTask,
        setSelectTask,
        createTask,
        editTask,
        deleteTask,
        setFilters,
        meta,
        setMeta,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
