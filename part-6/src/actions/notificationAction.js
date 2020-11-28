const createNotification = content => {
  return {
    type: 'SET_NOTIFICATION',
    data: { content }
  };
};

export default createNotification;