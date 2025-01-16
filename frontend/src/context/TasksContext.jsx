import React, { createContext, useContext, useState } from 'react';
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

  /**
   *
   */
  const fetchTasks = async (filters) => {
    setLoading(true);
    try {
      const response = await getTaskApi(filters);
      setTasks(response.data);
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
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
