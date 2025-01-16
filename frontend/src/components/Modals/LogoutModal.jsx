import React from 'react';
import { useAuth } from '@context/AuthContext';

export const LogoutModal = () => {
  const { logout } = useAuth();

  return (
    <div
      className="modal fade"
      id="logoutModal"
      tabIndex="-1"
      aria-labelledby="logoutModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="logoutModalLabel">
              Confirmar Cierre Sesión
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            ¿Estás seguro de que deseas Cerrar Sesión?
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
              className="btn btn-danger"
              onClick={async () => await logout()}
              data-bs-dismiss="modal"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
