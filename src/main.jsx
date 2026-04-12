import React from 'react'
import ReactDOM from 'react-dom/client'
import { AdminProvider } from './context/AdminContext'
import { AppProvider } from './context/AppContext'
import App from './App.jsx'
import './index.css'

import ErrorBoundary from './components/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AdminProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </AdminProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
