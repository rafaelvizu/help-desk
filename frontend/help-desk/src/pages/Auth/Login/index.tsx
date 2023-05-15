import { useState } from 'react';
import { toast } from 'react-toastify';
import { FiAtSign } from 'react-icons/fi';

function Login()
{
     const [email, setEmail] = useState<string>('')
     const [password, setPassword] = useState<string>('');

     function handleSubmit(event: React.FormEvent<HTMLFormElement>)
     {
          event.preventDefault()

          if (email === '' || password === '')
          {
               toast.error('Preencha todos os campos!');
               return;
          }
     }

     // para centralizar os itens de um container na tela, basta adicionar a classe "center" no container
     // na vertical, basta adicionar a classe "valign-wrapper" no container
     return (
          <div className="container">
               <div className="row card-panel hoverable">
                    <h4 className="center">ENTRAR</h4>
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

                         <div className="input-field">
                              <button className="btn waves-effect waves-light" type="submit" name="action">Entrar
                              </button>
                         </div>
                         
                    </form>
                    <div className="col m6 s12 center hide-on-small-only">
                         <FiAtSign size={150} color="#444444" />    
                    </div>

                    <div className='col m12 s12'>
                         <p className="center">Não tem uma conta? <a href="/register">Registre-se</a></p>
                    </div>
               </div>
               
          </div>
     )
}


export default Login;