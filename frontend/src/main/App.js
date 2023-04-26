import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from '../pages/Home';
import Navigation from '../components/layouts/Navigation';
import Register from '../pages/Authentication/Register';
import Login from '../pages/Authentication/Login';
import { useAuthContext } from '../context/UserContext';

function App() {

  const {user} = useAuthContext()

  return (
    <div className='app'>
      <BrowserRouter>
        <Navigation />
        <div className='pages'>
          <Routes>
            <Route path='/home' element={user?<Home />: <Navigate to = '/' />} />
          </Routes>
          <Routes>
            <Route path='/' element={!user? <Login /> : <Navigate to = '/home' />} />
          </Routes>            
          <Routes>
            <Route path='/register' element={!user? <Register /> : <Navigate to = '/home' />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
