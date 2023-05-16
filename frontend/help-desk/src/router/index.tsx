import {Routes, Route, BrowserRouter} from 'react-router-dom';
import RouteWrapper from './router';

// pages
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register'; 
import Home from '../pages/Dashboard/Home';
import Profile from '../pages/Dashboard/Profile';


// components
import Header from '../components/Header';


export default function Router()
{
     return (
          <BrowserRouter>
               <div style={{height: 150}}>
                    <Header />
               </div>
               <Routes>
                    <Route path='/' element={<RouteWrapper defaultComponent={Home} isPrivate={true} />} />
                    <Route path='/profile' element={<RouteWrapper defaultComponent={Profile} isPrivate={true} />} />
                    <Route path="/login" element={<RouteWrapper defaultComponent={Login} isPrivate={false} />} />
                    <Route path="/register" element={<RouteWrapper defaultComponent={Register} isPrivate={false} />} />
               </Routes>
          </BrowserRouter>
     )
}

