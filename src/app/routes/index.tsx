import {
  Routes as Switch,
  Route,
  BrowserRouter,
  Navigate,
} from 'react-router-dom';
import { Dashboard, Login } from '../pages';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" element={<Login />} />
        <Route path="/pagina-inicial" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
