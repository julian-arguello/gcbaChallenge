import React, { createContext, useContext, useState } from 'react';
import {
  getTasks as getTaskApi,
  deleteTask as deleteTaskApi,
  editTask as editTaskApi,
} from '@api/tasks';
const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectTask, setSelectTask] = useState(null);

  /**
   *
   */
  const fetchTasks = async (filters) => {
    setLoading(true);
    try {
      const fetchedTasks = await getTaskApi(filters);
      setTasks(fetchedTasks.data);
    } catch (error) {
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
      const fetchedTasks = await editTaskApi(task, taskId);
      console.log(`fetchedTasks`, fetchedTasks);
      setSelectTask(null);
      fetchTasks({ status: '', search: '' });
    } catch (error) {
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
      const fetchedTasks = await deleteTaskApi(taskId);
      console.log(`fetchedTasks`, fetchedTasks);
      setSelectTask(null);
      fetchTasks({ status: '', search: '' });
    } catch (error) {
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
        editTask,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
