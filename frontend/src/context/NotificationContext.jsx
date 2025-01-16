import React, { createContext, useContext, useState } from 'react';
import { Notifications } from '@components/Notifications/Notifications';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'success', duration = 4000) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type, duration }]);
    setTimeout(() => removeNotification(id), duration);
  };

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
