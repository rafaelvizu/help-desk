import { FiAlignJustify, FiAlertCircle } from 'react-icons/fi';
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function Header()
{
     const { user, setToken, token, setUser } = useContext(AuthContext);

     async function handleLogout()
     {
          await api.delete('/user/logout', {
               headers: {
                    Authorization: `Bearer ${token}`
               },
          })
          .then(() => {
               localStorage.removeItem('token');
               window.location.href = '/';
               setToken(undefined);
               setUser(undefined);
               
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
                 <nav className="nav-extended blue">
                    <div className="nav-wrapper">
                              
                              {
                                   user ? (
                                        <>
                                             <Link to="/profile" className="brand-logo">
                                             <img src={user.profileImage} alt="" className="circle responsive-img" style={{margin: 10,
                                             objectFit: 'cover', height: 40, width: 40}}
                                        
                                             />
                                             </Link>
                                        </>
                                        
                                        
                                   ):
                                   (
                                        <Link to="/signin" className='brand-logo'>
                                             <FiAlertCircle size={40} color="#fff" style={{margin: 10}}/>
                                        </Link>
                                   )
                              }
                         <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                              <FiAlignJustify size={30} color="#fff" />
                         </a>
                         <ul id="nav-mobile" className="right hide-on-med-and-down">
                              {
                                   token ? (
                                        <>
                                             <li>
                                                  <a onClick={() => handleLogout()}>Logout</a>
                                             </li>
                                        </>
                                   ) : (
                                        <>
                                        </>
                                   )
                              }
                         </ul>
                         
                    </div>
                    <div className="nav-content">
                         <ul className="tabs tabs-transparent">
                         {
                              user ? (
                                   <>
                                   <li className="tab">
                                        <Link to="/">Home</Link>
                                   </li>
                                   <li className="tab">
                                        <Link to="/create-call"
                                        >Clients</Link>
                                   </li>
                                   <li className="tab">
                                        <Link to="/create-client">Create client</Link>
                                   </li>
                                   <li className="tab">
                                        <Link to="/profile">Profile</Link>
                                   </li>
                                   </>
                              ) : (
                                   <>
                                   <li className="tab">
                                        <Link to="/">Signin</Link>
                                   </li>
                                   <li className="tab">
                                        <Link to="/signup">Signup</Link>
                                   </li>     
                                   </>
                              )  
                         }
                         </ul>
                    </div>
                    </nav>
          </div>
     )
}