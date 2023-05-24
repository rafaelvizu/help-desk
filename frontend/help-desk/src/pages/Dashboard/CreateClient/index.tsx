import { useState } from 'react';
import { formatCep, formatCnpj, formatCpf, formatPhone } from '../../../helpers/format-text';
import styles from '../../../helpers/styles';
import { createClient } from '../../../helpers/client';
import { IClient } from '../../../helpers/interfaces';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/auth';

function CreateClient()
{
     const { token } = useContext(AuthContext);
     const [name, setName] = useState<string>('');
     const [gender, setGender] = useState<string | null>(null);
     const [dateBirth, setDateBirth] = useState<string | null>(null);
     const [cpf, setCpf] = useState<string | null>(null);
     const [cnpj, setCnpj] = useState<string | null>(null);
     const [phone_1, setPhone_1] = useState<string | null>(null);
     const [phone_2, setPhone_2] = useState<string | null>(null);
     const [email, setEmail] = useState<string | null>(null);
     const [address, setAddress] = useState<string | null>(null);
     const [number, setNumber] = useState<number | null>(null);
     const [complement, setComplement] = useState<string | null>(null);
     const [district, setDistrict] = useState<string | null>(null);
     const [city, setCity] = useState<string | null>(null);
     const [state, setState] = useState<string | null>(null);
     const [cep, setCep] = useState<string | null>(null);

     async function handleSubmit(e: React.FormEvent<HTMLFormElement>)
     {    	
          e.preventDefault();
          const client: IClient | null = await createClient({
               name,
               gender,
               dateBirth,
               cpf,
               cnpj,
               phone_1,
               phone_2,
               email,
               address,
               number,
               complement,
               district,
               city,     
               state,
               cep
          }, token as string);

          if(client)
          {
               setName('');
               setGender(null);
               setDateBirth(null);
               setCpf(null);
               setCnpj(null);
               setPhone_1(null);
               setPhone_2(null);
               setEmail(null);
               setAddress(null);
               setNumber(null);
               setComplement(null);
               setDistrict(null);
               setCity(null);
               setState(null);
               setCep(null);
          }
     }



     return (
          <main className="container">
               <form className="row" onSubmit={(e) => handleSubmit(e)}>
                    <div className="row">
                         <div className="col s12 m6">
                              <div className="input-field">
                                   <input type="text" id="name" value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   required />
                                   <label htmlFor="name">Name</label>
                              </div>
                              <div>
                                   <label htmlFor="gender">Gender</label>
                                   <select name="gender" id="gender" 
                                   className="browser-default"
                                   onChange={(e) => {
                                        setGender(e.target.value);
                                   }}
                                   style={styles.select}
                                   value={gender ?? ''}  required   
                                   >
                                        <option value="" disabled selected
                                        >Choose your option</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                        <option value="N/A">N/A</option>
                                   </select>
                              </div>
                              <div className="input-field">
                                   <input type="date" name="dateBirth" id="dateBirth"
                                   onChange={(e) => setDateBirth(e.target.value)}
                                   value={dateBirth ?? ''} required
                                   />
                                   <label htmlFor="dateBirth">Date of Birth</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="cpf" id="cpf"
                                   onChange={(e) => setCpf(formatCpf(e.target.value))}
                                   onBlur={(e) => setCpf(formatCpf(e.target.value))}
                                   value={cpf ?? ''}
                                   max={14} min={14} required
                                   />
                                   <label htmlFor="cpf">CPF</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="cnpj" id="cnpj" 
                                   onChange={(e) => setCnpj(formatCnpj(e.target.value))}
                                   onBlur={(e) => setCnpj(formatCnpj(e.target.value))}
                                   value={cnpj ?? ''} required
                                   max={18} min={18}
                                   /> 
                                   <label htmlFor="cnpj">CNPJ</label>
                              </div>
                              <div className="input-field">
                                   <input type="text" name="phone_1" id="phone_1"
                                   onChange={(e) => setPhone_1(formatPhone(e.target.value))} 
                                   onBlur={(e) => setPhone_1(formatPhone(e.target.value))}
                                   value={phone_1 ?? ''} required
                                   max={15} min={15}
                                   />
                                   <label htmlFor="phone_1">Phone 1</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="phone_2" id="phone_2" 
                                   onChange={(e) => setPhone_2(formatPhone(e.target.value))}
                                   onBlur={(e) => setPhone_2(formatPhone(e.target.value))}
                                   value={phone_2 ?? ''}
                                   max={15} min={15} required
                                   />
                                   <label htmlFor="phone_2">Phone 2</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="email" id="email"
                                   onChange={(e) => setEmail(e.target.value)}
                                   value={email ?? ''} required
                                   />
                                   <label htmlFor="email">Email</label>
                              </div>
                         </div>
                         <div className="col s12 m6">
                              <div className="input-field">
                                   <input type="text" name="address" id="address" 
                                   onChange={(e) => setAddress(e.target.value)} 
                                   value={address ?? ''} required
                                   />
                                   <label htmlFor="address">Address</label>
                              </div>

                              <div className="input-field">
                                   <input type="number" name="number" id="number" 
                                   onChange={(e) => setNumber(Number(e.target.value))}
                                   value={number ?? ''} required
                                   />
                                   <label htmlFor="number">Number</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="complement" id="complement" 
                                   onChange={(e) => setComplement(e.target.value)}
                                   value={complement ?? ''} required
                                   />
                                   <label htmlFor="complement">Complement</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="district" id="district" 
                                   onChange={(e) => setDistrict(e.target.value)}
                                   value={district ?? ''} required
                                   />
                                   <label htmlFor="district">District</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="city" id="city" 
                                   onChange={(e) => setCity(e.target.value)}
                                   value={city ?? ''} required
                                   />
                                   <label htmlFor="city">City</label>
                              </div>

                              <div className="input-field">
                                   <input type="text"name="state" id="state" 
                                   onChange={(e) => setState(e.target.value)}
                                   value={state ?? ''} required
                                   />
                                   <label htmlFor="state">State</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="cep" id="cep"
                                   value={cep ?? ''}
                                   onChange={(e) => {
                                        setCep(formatCep(e.target.value)); 
                                   }}
                                   onBlur={(e) => {
                                        setCep(formatCep(e.target.value));
                                   }}
                                   max={9} min={9} required
                                   />
                                   
                                   <label htmlFor="cep">CEP</label>
                              </div>

                         </div>

                    </div>

                    <div className="row">
                         <button className="btn-large waves-effect waves-light" type="submit" name="action">
                              Create Client
                         </button>
                    </div>

               </form>
          </main>
     )
}


export default CreateClient;