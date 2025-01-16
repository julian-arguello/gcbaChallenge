export const mapStatus = (state) => {
  const statusMap = {
    success: 'Éxito',
    danger: 'Error',
  };
  return statusMap[state];
};
