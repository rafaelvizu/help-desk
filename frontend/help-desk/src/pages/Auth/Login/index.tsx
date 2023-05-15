import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { FiAtSign } from 'react-icons/fi';
import { ILogin } from '../../../helpers/interfaces';
import login from '../../../helpers/login';
import { AuthContext } from '../../../contexts/auth';

function Login()
{
     const [email, setEmail] = useState<string>('')
     const [password, setPassword] = useState<string>('');

     const { token, setToken } = useContext(AuthContext);


     async function handleSubmit(event: React.FormEvent<HTMLFormElement>)
     {
          event.preventDefault()

          if (!email || !password)
          {
               toast.error('Please fill in all fields');
               return;
          }

          const data: ILogin = { email, password };
          const TOKEN: string | null = await login(data);

          if (!token)
          {
               toast.error('Error signing in');
               return;
          }

          setToken(TOKEN as string);
          toast.success('Successfully signed in');

     }

     function handleShowPassword()
     {
          const passwordInput = document.getElementById('password') as HTMLInputElement;
          const span = document.querySelector('span') as HTMLSpanElement;

          if (passwordInput.type === 'password')
          {
               passwordInput.type = 'text';
               passwordInput.focus();
               span.innerText = 'hide password';  
               return;  
          }

          passwordInput.type = 'password';
          span.innerText = 'show password';
     }


     const styles = {
          showPassword: {
               cursor: 'pointer',
               color: '#444444',
               fontSize: 12,
               fontWeight: 500,
          }
     }

     return (
          <div className="container">
               <div className="row card-panel hoverable">
                    <h4 className="center">SIGN IN</h4>
                    <hr style={{margin: 20}}/>
                    <form action="" className="col m6 s12" onSubmit={handleSubmit}>
                         <div className="input-field">
                              <label htmlFor="email">Email</label>
                              <input type="email" name="email" id="email" 
                              className="validate" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                         </div>

                         <div className="input-field">
                              <label htmlFor="password">Password</label>
                              <input type="password" name="password" id="password" 
                              value={password} onChange={(e) => setPassword(e.target.value)} className="validate" min={6} required/>
                         </div>

                         <div className='show-password'>
                              <span onClick={() => handleShowPassword()} style={styles.showPassword}>
                                   show password
                              </span>
                         </div>

                         <div className="input-field"> 
                              <button className="btn waves-effect waves-light" type="submit" name="action">Sign In</button>
                         </div>
                         
                    </form>
                    <div className="col m6 s12 center hide-on-small-only">
                         <FiAtSign size={150} color="#444444" />    
                    </div>

                    <div className='col m12 s12'>
                         <p className="center">Don't have an account? <a href="/register">Sign Up</a></p>
                    </div>
               </div>
               
          </div>
     )
}


export default Login;