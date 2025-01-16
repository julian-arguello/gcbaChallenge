export const mapStatus = (status) => {
  const statusMap = {
    pending: 'Pendiente',
    in_progress: 'En proceso',
    completed: 'Completada',
  };

  return statusMap[status];
};

export const mapStatusColor = (status) => {
  const statusMapColor = {
    pending: ' pending text-light ',
    in_progress: ' in_progress text-light ',
    completed: ' completed text-light ',
  };

  return statusMapColor[status];
};
