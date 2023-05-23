import { useState } from 'react';
import { formatCep, formatCnpj, formatCpf, formatPhone } from '../../../helpers/format-text';

function CreateClient()
{
     const [name, setName] = useState<string>('');
     const [gentder, setGender] = useState<string | null>(null);
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

     return (
          <main className="container">
               <form>
                    <div className="row">
                         <div className="col s12 m6">
                              <div className="input-field">
                                   <input type="text" id="name" value={name}
                                   onChange={(e) => setName(e.target.value)} />
                                   <label htmlFor="name">Name</label>
                              </div>
                              <div>
                                   <label htmlFor="gender">Gender</label>
                                   <select name="gender" id="gender" 
                                   className="browser-default"
                                   onChange={(e) => {
                                        setGender(e.target.value);
                                   }}>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                        <option value="N/A">N/A</option>
                                   </select>
                              </div>
                              <div className="input-field">
                                   <input type="date" name="dateBirth" id="dateBirth"/>
                                   <label htmlFor="dateBirth">Date of Birth</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="cpf" id="cpf"
                                   onChange={(e) => setCpf(formatCpf(e.target.value))}
                                   onBlur={(e) => setCpf(formatCpf(e.target.value))}
                                   value={cpf ?? ''} pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                                   />
                                   <label htmlFor="cpf">CPF</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="cnpj" id="cnpj" 
                                   onChange={(e) => setCnpj(formatCnpj(e.target.value))}
                                   onBlur={(e) => setCnpj(formatCnpj(e.target.value))}
                                   value={cnpj ?? ''}
                                   pattern="\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}"
                                   /> 
                                   <label htmlFor="cnpj">CNPJ</label>
                              </div>
                              <div className="input-field">
                                   <input type="text" name="phone_1" id="phone_1"
                                   onChange={(e) => setPhone_1(formatPhone(e.target.value))} 
                                   onBlur={(e) => setPhone_1(formatPhone(e.target.value))}
                                   value={phone_1 ?? ''}
                                   pattern='\(\d{2}\)\s\d{5}\-\d{4}'
                                   />
                                   <label htmlFor="phone_1">Phone 1</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="phone_2" id="phone_2" 
                                   onChange={(e) => setPhone_2(formatPhone(e.target.value))}
                                   onBlur={(e) => setPhone_2(formatPhone(e.target.value))}
                                   value={phone_2 ?? ''}
                                   pattern='\(\d{2}\)\s\d{5}\-\d{4}'
                                   />
                                   <label htmlFor="phone_2">Phone 2</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="email" id="email" />
                                   <label htmlFor="email">Email</label>
                              </div>
                         </div>
                         <div className="col s12 m6">
                              <div className="input-field">
                                   <input type="text" name="address" id="address" />
                                   <label htmlFor="address">Address</label>
                              </div>

                              <div className="input-field">
                                   <input type="number" name="number" id="number" />
                                   <label htmlFor="number">Number</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="complement" id="complement" />
                                   <label htmlFor="complement">Complement</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="district" id="district" />
                                   <label htmlFor="district">District</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="city" id="city" />
                                   <label htmlFor="city">City</label>
                              </div>

                              <div className="input-field">
                                   <input type="text"name="state" id="state" />
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

                                   pattern='\d{5}\-\d{3}'
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