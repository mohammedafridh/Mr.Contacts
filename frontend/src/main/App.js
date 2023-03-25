import './App.css';
import {BrowserRouter, Route,Routes, Navigate} from 'react-router-dom'
import Home from '../pages/Home';
import Navigation from '../components/layouts/Navigation';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
      <Navigation />
          <div className='pages'>
            <Routes>
              <Route path = '/' element = {<Home />}/>
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
