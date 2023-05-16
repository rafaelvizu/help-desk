import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function Header()
{
     const { user, setToken, token } = useContext(AuthContext);

     async function handleLogout()
     {
          console.log('logout');
          await api.delete('/user/logout', {
               headers: {
                    Authorization: `Bearer ${token}`
               },
          })
          .then(() => {
               localStorage.removeItem('token');
               window.location.href = '/';
               setToken('');
               toast.success('logout success');
               return;
          })
          .catch((err) => {
               toast.error('logout error');
               console.log(err.response.data);
               return;
          });
     }

     return (
          <div className="navbar-fixed">
                 <nav className="nav-extended">
                    <div className="nav-wrapper">
                         <a href="#" className="brand-logo">Logo</a>
                         <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                         <ul id="nav-mobile" className="right hide-on-med-and-down">
                              {
                                   user ? (
                                        <>
                                             <li>
                                                  <a onClick={() => handleLogout()}>Logout</a>
                                             </li>
                                        </>
                                   ) : (
                                        <>
                                             <li>
                                                  <Link to="/login">Login</Link>
                                             </li>
                                             <li>
                                                  <Link to="/register">Register</Link>
                                             </li>
                                        </>
                                   )
                              }
                         </ul>
                         
                    </div>
                    <div className="nav-content">
                         <ul className="tabs tabs-transparent">
                         <li className="tab"><a href="#test1">Test 1</a></li>
                         <li className="tab"><a className="active" href="#test2">Test 2</a></li>
                         <li className="tab disabled"><a href="#test3">Disabled Tab</a></li>
                         <li className="tab"><a href="#test4">Test 4</a></li>
                         </ul>
                    </div>
                    </nav>
          </div>
     )
}