import React from 'react';
import { useTasks } from '@context/TasksContext';

export const TasksPaginator = () => {
  const { meta, setMeta } = useTasks();

  if (!meta || !meta.current_page || !meta.total_pages) {
    return null;
  }

  const handlePageChange = (page) => {
    if (page > 0 && page <= meta.total_pages) {
      setMeta((prevMeta) => ({ ...prevMeta, current_page: page }));
    }
  };

  return (
    <nav aria-label="Task pagination" className="w-100">
      <ul className="pagination justify-content-center mt-3">
        <li
          className={`page-item ${meta.current_page === 1 ? 'disabled' : ''}`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(meta.current_page - 1)}
            disabled={meta.current_page === 1}
          >
            Anterior
          </button>
        </li>

        {[...Array(meta.total_pages)].map((_, index) => (
          <li
            key={index + 1}
            className={`page-item ${
              meta.current_page === index + 1 ? 'active' : ''
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}

        <li
          className={`page-item ${
            meta.current_page === meta.total_pages ? 'disabled' : ''
          }`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(meta.current_page + 1)}
            disabled={meta.current_page === meta.total_pages}
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
};
