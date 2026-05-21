import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import {
  AuthProvider,
  useAuth
} from './context/AuthContext';

import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import LeadDetails from './pages/LeadDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Loader from './components/Loader';

/*
  PROTECTED ROUTE
*/
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/*
  MAIN LAYOUT
*/
function Layout() {
  const { user, loading } = useAuth();

  const location = useLocation();

  const isAuthPage = ['/login', '/signup'].includes(
    location.pathname
  );

  if (loading) {
    return <Loader />;
  }

  /*
    LOGIN / SIGNUP PAGES
  */
  if (isAuthPage) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    );
  }

  /*
    NOT LOGGED IN
  */
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /*
    APP LAYOUT
  */
  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="page-content">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/leads"
              element={
                <ProtectedRoute>
                  <Leads />
                </ProtectedRoute>
              }
            />

            <Route
              path="/leads/:id"
              element={
                <ProtectedRoute>
                  <LeadDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

/*
  APP
*/
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />

        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;