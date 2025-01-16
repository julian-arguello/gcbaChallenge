import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '@styles/globals.scss';
import { AuthProvider } from '@context/AuthContext.jsx';
import { NotificationProvider } from '@context/NotificationContext.jsx';
import { TasksProvider } from '@context/TasksContext.jsx';

createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <AuthProvider>
      <TasksProvider>
        <App />
      </TasksProvider>
    </AuthProvider>
  </NotificationProvider>
);
