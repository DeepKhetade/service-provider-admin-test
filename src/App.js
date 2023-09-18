import React, { lazy, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { themeChange } from 'theme-change'
import checkAuth from './app/auth';
import initializeApp from './app/init';
import { useDispatch } from 'react-redux';
import { getUserModuleRoute } from './features/Routing/routingSlice';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

// Importing pages
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Register = lazy(() => import('./pages/Register'))
const Documentation = lazy(() => import('./pages/Documentation'))
const ChangePassword = lazy(() => import('./pages/ChangePassword'))
// const UserPage = lazy(() => import('./pages/Users'))

// Initializing different libraries
initializeApp()


// Check for login and initialize axios
const token = checkAuth()


function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false)
  }, [])

  useEffect(() => {
    dispatch(getUserModuleRoute()).then((result) => {
    })
  }, [])


  return (
    <>
      <Router>
        <NotificationContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/change-password/:id" element={<ChangePassword />} />
          {/* <Route path="/app/pages-users" element={<UserPage />} /> */}

          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />} />

          <Route path="*" element={<Navigate to={token ? "/app/welcome" : "/login"} replace />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
