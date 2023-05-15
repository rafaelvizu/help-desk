import {Routes, Route, BrowserRouter} from 'react-router-dom';
import RouteWrapper from './router';

// pages
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register'; 


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
                    <Route path="/login" element={<RouteWrapper defaultComponent={Login} isPrivate={false} />} />
                    <Route path="/register" element={<RouteWrapper defaultComponent={Register} isPrivate={false} />} />
               </Routes>
          </BrowserRouter>
     )
}

