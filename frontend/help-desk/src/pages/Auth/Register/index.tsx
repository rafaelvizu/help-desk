import { useState } from 'react';
import { toast } from 'react-toastify';
import { FiAtSign } from 'react-icons/fi';

function Register()
{
     const [name, setName] = useState<string>('');
     const [email, setEmail] = useState<string>('')
     const [password, setPassword] = useState<string>('');
     const [passwordConfirm, setPasswordConfirm] = useState<string>('');   

     function handleSubmit(event: React.FormEvent<HTMLFormElement>)
     {
          event.preventDefault()

          if (email === '' || password === '' || passwordConfirm === '' || name === '')
          {
               toast.error('Preencha todos os campos!');
               return;
          }

          if (password !== passwordConfirm)
          {
               toast.error('As senhas não coincidem!');
               return;
          }	
     }
     
     return (
          <div className="container">
               <div className="row card-panel hoverable">
                    <h4 className="center">REGISTRAR-SE</h4>
                    <hr style={{margin: 20}}/>
                    <form action="" className="col m6 s12" onSubmit={handleSubmit}>
                         <div className="input-field">
                              <label htmlFor="name">Nome</label>
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
                              <label htmlFor="passwordConfirm">Confirmar Password</label>
                              <input type="password" name="passwordConfirm" id="passwordConfirm"
                              value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className="validate" min={6} max={255} required/>
                         </div>

                         <div className="input-field">
                              <button className="btn waves-effect waves-light" type="submit" name="action">Entrar
                              </button>
                         </div>
                         
                    </form>
                    <div className="col m6 s12 center hide-on-small-only">
                         <FiAtSign size={263} color="#444444" />    
                    </div>

                    <div className='col m12 s12'>
                         <p className="center">Já tem uma conta? <a href="/login">Entre</a></p>
                    </div>
               </div>
               
          </div>
     )
}


export default Register;