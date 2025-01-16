let logoutFunction = null;

export const setLogoutFunction = (logout) => {
  logoutFunction = logout;
};

export const getLogoutFunction = () => {
  if (!logoutFunction) {
    throw new Error('Logout function not set.');
  }
  return logoutFunction;
};
