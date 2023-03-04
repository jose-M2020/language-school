import { Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMode } from './theme';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const theme = useMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='app'>
        {/* <Sidebar isSidebar={isSidebar} /> */}
        <main className='content'>
          {/* <Topbar setIsSidebar={setIsSidebar} /> */}
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
