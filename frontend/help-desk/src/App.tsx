import './App.css'
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register';

function App() {

  return (
    <>
      <ToastContainer />
      <Register />
    </>
  )
}

export default App
