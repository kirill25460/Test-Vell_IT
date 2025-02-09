import { logoutThunk } from './authActions';

const authMiddleware = navigate => store => next => async action => {
  const { dispatch } = store;

  if (action.payload && action.payload.status === 401) {
    // Проверка наличия action.payload и action.payload.status перед использованием
    console.log(action.payload)
    if (action.payload && action.payload.status) {
      await dispatch(logoutThunk());
    }
    navigate('/login');
  }

  return next(action);
};

export default authMiddleware;