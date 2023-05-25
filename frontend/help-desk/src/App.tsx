import './App.css'
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './contexts/auth';
import ClientProvider from './contexts/clients';


import Router from './router';


function App() {

  return (
    <AuthProvider>  
      <ClientProvider>
        <Router />
        <ToastContainer />
      </ClientProvider>
    </AuthProvider>
  );
}

export default App
