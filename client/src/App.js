import { Navigate, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { useMode } from './theme';
import { ToastContainer } from 'react-toastify';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Users from './pages/user';
import CourseList from './pages/courses/CourseList';
import CourseDetails from './pages/courses/CourseDetails';
import CourseClasses from './pages/courses/CourseClasses';
import CourseEvaluations from './pages/courses/CourseEvaluations.js';
import CourseResources from './pages/courses/CourseResources';
import Events from './pages/Events';
import Transactions from './pages/Transactions';
import Account from './pages/Account';

function App() {
  const theme = useMode();
  const isAuth = Boolean(
    useSelector((state) => state.auth.token)
  );
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <div className='app'>
        <Routes>
          <Route 
            path='/login' 
            element={!isAuth ? <Login /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path='/register' 
            element={isAuth ? <Register /> : <Navigate to="/login" />} 
          />
          <Route
            path='/dashboard'
            element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path='/schedule'
            element={isAuth ? <Schedule /> : <Navigate to="/login" />}
          />
          <Route
            path='/courses'
            element={isAuth ? <CourseList /> : <Navigate to="/login" />}
          />
          <Route
            path='/courses/:id'
            element={isAuth ? <CourseDetails /> : <Navigate to="/login" />}
          />
          <Route
            path='/courses/:id/classes'
            element={isAuth ? <CourseClasses /> : <Navigate to="/login" />}
          />
          <Route
            path='/courses/:id/evaluations'
            element={isAuth ? <CourseEvaluations /> : <Navigate to="/login" />}
          />
          <Route
            path='/courses/:id/resources'
            element={isAuth ? <CourseResources /> : <Navigate to="/login" />}
          />
          <Route
            path='/events'
            element={isAuth ? <Events /> : <Navigate to="/login" />}
          />
          <Route
            path='/transactions'
            element={isAuth ? <Transactions /> : <Navigate to="/login" />}
          />
          <Route
            path='/account'
            element={isAuth ? <Account /> : <Navigate to="/login" />}
          />

          <Route
            path='/users'
            element={<Users/>}
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
