import { useState } from 'react';
import { toast } from 'react-toastify';
import { FiAtSign } from 'react-icons/fi';
import { IRegister } from '../../../helpers/interfaces';
import styles from '../../../helpers/styles';


function Register()
{
     const [name, setName] = useState<string>('');
     const [email, setEmail] = useState<string>('')
     const [password, setPassword] = useState<string>('');
     const [passwordConfirm, setPasswordConfirm] = useState<string>('');   


     function handleSubmit(event: React.FormEvent<HTMLFormElement>)
     {
          event.preventDefault()

          if (!name || !email || !password || !passwordConfirm)
          {
               toast.error('Please fill in all fields');
               return;
          }

          if (password !== passwordConfirm)
          {
               toast.error('Passwords do not match');
               return;
          } 
          
          const data: IRegister = {
               name,
               email,
               password,
               passwordConfirm
          };


          console.log(data);  


     }

     function handleShowPassword()
     {
          const passwordInput = document.getElementById('password') as HTMLInputElement;
          const passwordConfirmInput = document.getElementById('passwordConfirm') as HTMLInputElement;
          const span = document.querySelector('span') as HTMLSpanElement;

          if (passwordInput.type === 'password')
          {
               passwordInput.type = 'text';
               passwordConfirmInput.type = 'text';
               passwordInput.focus();
               span.innerText = 'hide password';  
               return;
          }

          passwordInput.type = 'password';
          passwordConfirmInput.type = 'password';
          span.innerText = 'show password';
     }
     
     return (
          <div className="container">
               <div className="row card-panel hoverable">
                    <h4 className="center">SIGN UP</h4>
                    <hr style={{margin: 20}}/>
                    <form action="" className="col m6 s12" onSubmit={handleSubmit}>
                         <div className="input-field">
                              <label htmlFor="name">Name</label>
                              <input type="text" name="name" id="name"
                              value={name} onChange={(e) => setName(e.target.value)} className="validate" min={1} max={255} required/>
                         </div>

                         <div className="input-field">
                              <label htmlFor="email">Email</label>
                              <input type="email" name="email" id="email" 
                              className="validate" value={email} onChange={(e) => setEmail(e.target.value)} min={1} max={255} required/>
                         </div>

                         <div className="input-field">
                              <label htmlFor="password">Password</label>
                              <input type="password" name="password" id="password" 
                              value={password} onChange={(e) => setPassword(e.target.value)} className="validate" min={6} max={255} required/>
                         </div>

                         <div className="input-field">
                              <label htmlFor="passwordConfirm">Confirm Password</label>
                              <input type="password" name="passwordConfirm" id="passwordConfirm"
                              value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className="validate" min={6} max={255} 
                              required/>
                         </div>

                         <div className='show-password'>
                              <span onClick={() => handleShowPassword()} style={styles.showPassword}>
                                   show password
                              </span>
                         </div>

                         <div className="input-field">
                              <button className="btn waves-effect waves-light" type="submit" name="action">Sign Up
                              </button>
                         </div>

                         
                    </form>
                    <div className="col m6 s12 center hide-on-small-only">
                         <FiAtSign size={263} color="#444444" />    
                    </div>

                    <div className='col m12 s12'>
                         <p className="center">Already have an account? <a href="/login">Sign In</a></p>
                    </div>
               </div>
               
          </div>
     )
}


export default Register;