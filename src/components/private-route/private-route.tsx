import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAuthorizationStatus } from '../../hooks/use-authorization-status';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const { isAuth } = useAuthorizationStatus();

  return isAuth ? children : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
