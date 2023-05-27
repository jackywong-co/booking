import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { RecordProvider } from './contexts/RecordContext';
import { UserProvider } from './contexts/UserContext';
import { router } from './router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <RecordProvider>
          <RouterProvider router={router} />
        </RecordProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
