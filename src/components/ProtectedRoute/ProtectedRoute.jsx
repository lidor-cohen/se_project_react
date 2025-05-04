// External
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Contexts
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function ProtectedRoute({ children, anonymous }) {
  const { currentUser } = useContext(CurrentUserContext);

  const location = useLocation();
  const from = location.state?.from || '/';

  console.log(from);

  if (anonymous && currentUser.isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !currentUser.isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
