import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { RequireAuth } from './contexts/AuthContext';
import App from './App';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import RecordPage from './pages/RecordPage';
import RecordCreatePage from './pages/RecordCreatePage';
import HomePage from './pages/HomePage';
import RecordDetailPage from './pages/RecordDetailPage';
import RecordEditPage from './pages/RecordEditPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/registration',
        element: (
          <RequireAuth>
            <RegistrationPage />
          </RequireAuth>
        )
      },
      {
        path: '/record/',
        element: (
          <RequireAuth>
            <RecordPage />
          </RequireAuth>
        )
      },
      {
        path: '/record/create',
        element: (
          // <RequireAuth>
          <RecordCreatePage />
          // </RequireAuth>
        )
      },
      {
        path: '/record/edit/:id',
        element: (
          <RequireAuth>
            <RecordEditPage />
          </RequireAuth>
        )
      },
      {
        path: '/record/:id',
        element: (
          <RequireAuth>
            <RecordDetailPage />
          </RequireAuth>
        )
      },
      {
        path: '/user/',
        element: (
          <RequireAuth>
            <RecordPage />
          </RequireAuth>
        )
      },
      {
        path: '/user/create',
        element: (
          <RequireAuth>
            <RegistrationPage />
          </RequireAuth>
        )
      },
      {
        path: '/user/edit/:id',
        element: (
          <RequireAuth>
            <RecordEditPage />
          </RequireAuth>
        )
      },
      {
        path: '/user/:id',
        element: (
          <RequireAuth>
            <RecordDetailPage />
          </RequireAuth>
        )
      }
    ]
  }
];

export const router = createBrowserRouter(routes);
