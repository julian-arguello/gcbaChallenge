import React from 'react';
import { mapStatus } from '@utils/statusNotifMapper';

export const Notifications = ({ notifications }) => {
  return (
    <div className="toast-container position-fixed top-0 end-0 p-3">
      {notifications.map(({ id, message, type }) => (
        <div
          key={id}
          className={`toast show bg-${type} text-white m-2`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">{mapStatus(type)}</strong>
            {/* <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => console.log('Cierre manual en desarrollo')}
            ></button> */}
          </div>
          <div className="toast-body">{message}</div>
        </div>
      ))}
    </div>
  );
};
