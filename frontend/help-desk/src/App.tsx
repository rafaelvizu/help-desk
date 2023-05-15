import './App.css'
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Router from './router';


function App() {

  return (
    <>
      <ToastContainer />
      <Router />
    </>
  )
}

export default App
