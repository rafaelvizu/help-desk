import './App.css'
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './contexts/auth';
import ClientProvider from './contexts/clients';
import CallProvider from './contexts/calls';


import Router from './router';


function App() {

  return (
    <AuthProvider>  
      <ClientProvider>
        <CallProvider>

          <Router />
          <ToastContainer />
          
        </CallProvider>
      </ClientProvider>
    </AuthProvider>
  );
}

export default App
