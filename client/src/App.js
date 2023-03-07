import { Navigate, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMode } from './theme';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import { useSelector } from 'react-redux';
import Schedule from './pages/Schedule';

function App() {
  const theme = useMode();
  const isAuth = Boolean(
    useSelector((state) => state.auth.token)
  );
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
