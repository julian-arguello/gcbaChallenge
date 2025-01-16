import React, { createContext, useContext, useState } from 'react';
import { Notifications } from '@components/Notifications/Notifications';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  /**
   * Agrega una nueva notificación al listado.
   *
   * @param {string} message Mensaje a mostrar en la notificación.
   * @param {string} [type='success'] Tipo de notificación (opciones: 'success', 'danger').
   * @param {number} [duration=4000] Tiempo en milisegundos que mostrará la notificación antes de desaparecer.
   * @returns {void}
   */
  const addNotification = (message, type = 'success', duration = 4000) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type, duration }]);
    setTimeout(() => removeNotification(id), duration);
  };

  /**
   * Elimina una notificación específica del listado.
   *
   * @param {number} id Identificador único de la notificación a eliminar.
   * @returns {void}
   */
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <Notifications notifications={notifications} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
