import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PotectedRoute } from '@components/ProtectedRoute';
import { Login } from '@pages/Login/Login';
import { Tasks } from '@pages/Tasks/Tasks';
import { Navbar } from '@components/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/tareas"
          element={
            <PotectedRoute>
              <Navbar />
              <Tasks />
            </PotectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
