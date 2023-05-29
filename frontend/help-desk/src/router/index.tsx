import {Routes, Route, BrowserRouter} from 'react-router-dom';
import RouteWrapper from './router';

// pages
import Signin from '../pages/Auth/Signin';
import Signup from '../pages/Auth/Signup'; 
import Home from '../pages/Dashboard/Home';
import Profile from '../pages/Dashboard/Profile';
import CreateClient from '../pages/Dashboard/CreateClient';
import Clients from '../pages/Dashboard/Clients';
import ShowClient from '../pages/Dashboard/ShowClient';
import CreateCall from '../pages/Dashboard/CreateCall';



// components
import Header from '../components/Header';
import ShowCall from '../pages/Dashboard/ShowCall';
import Error from '../components/Error';


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
                    <Route path="/signin" element={<RouteWrapper defaultComponent={Signin} isPrivate={false} />} />
                    <Route path="/signup" element={<RouteWrapper defaultComponent={Signup} isPrivate={false} />} />
                    <Route path="/create-client" element={<RouteWrapper defaultComponent={CreateClient} isPrivate={true} />} />
                    <Route path="/clients" element={<RouteWrapper defaultComponent={Clients} isPrivate={true} />} />
                    <Route path="/clients/:id" element={<RouteWrapper defaultComponent={ShowClient} isPrivate={true} />} />
                    <Route path="/clients/:id/create-call" element={<RouteWrapper defaultComponent={CreateCall} isPrivate={true} />} />
                    <Route path="/clients/:id/calls/:id_call" element={<RouteWrapper defaultComponent={ShowCall} isPrivate={true} />} />
                    
                    <Route path="*" element={<RouteWrapper defaultComponent={Error} isPrivate={false} />} />


               </Routes>
          </BrowserRouter>
     )
}

