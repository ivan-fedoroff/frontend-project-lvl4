const getAuthHeader = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }

  return {};
};

export default getAuthHeader;
