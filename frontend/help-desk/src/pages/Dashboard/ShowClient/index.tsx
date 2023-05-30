import { useState, useEffect } from 'react';
import { formatCep, formatCnpj, formatCpf, formatDate, formatPhone, onlyNumbers } from '../../../helpers/format-text';
import { Link } from 'react-router-dom';
import styles from '../../../helpers/styles';
import { deleteClient, getClient, updateClient } from '../../../helpers/client';
import { IClient } from '../../../helpers/interfaces';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/auth';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';

function ShowClient()
{
     const { id } = useParams<{ id: string }>();

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

     const [error, setError] = useState<boolean>(false);
     const [loading, setLoading] = useState<boolean>(true);

     useEffect(() => {
          if (token)
          {
               clientData();
          }          
     }, [token]);


     async function clientData()
     {
          setLoading(true);
          setError(false);

          const client: IClient | null = await getClient(id as string, token as string);

          if (client === null)
          {
               setError(true);
               setLoading(false);
               return; 
          }
          setName(client.name);
          client.dateBirth && setDateBirth(formatDate(client.dateBirth as string));
          client.cpf && setCpf(formatCpf(client.cpf as string));
          client.cnpj && setCnpj(formatCnpj(client.cnpj as string));
          client.phone_1 && setPhone_1(formatPhone(client.phone_1 as string));
          client.phone_2 && setPhone_2(formatPhone(client.phone_2 as string));
          setEmail(client.email);
          setAddress(client.address);
          setNumber(client.number);
          setComplement(client.complement);
          setDistrict(client.district);
          setCity(client.city);
          setState(client.state);
          client.cep && setCep(formatCep(client.cep as string));           

          setLoading(false);

          return;
     }


     async function handleSubmit(e: React.FormEvent<HTMLFormElement>)
     {    	
          e.preventDefault();
          setLoading(true);   
   
          const clientUpd: IClient = {
               name,
               gender,
               dateBirth,
               cpf: cpf != null ? onlyNumbers(cpf as string) : null,
               cnpj: cnpj != null ? onlyNumbers(cnpj as string) : null,  
               phone_1: phone_1 ? onlyNumbers(phone_1 as string) : null,
               phone_2: phone_2 != null? onlyNumbers(phone_2 as string) : null,
               email,
               address,
               number,
               complement,
               district,
               city,
               state,
               cep: cep != null ? onlyNumbers(cep as string) : null,
          }


          await updateClient(id as string, clientUpd, token as string);
          setLoading(false);

     }


     async function handleDelete()
     {     
          setLoading(true);
          const del = await deleteClient(id as string, token as string);

          if (del)
          {
               window.location.href = '/clients';
               return;
          }

          setLoading(false);
     }

     if (loading)
     {
          return <Loading/>
     }

     if (error)
     {
          return <Error/>
     }

     return (
          <main className="container">
               <h3>
                    Show Client
               </h3>
               <hr/>
               <div className="row">
                    <div className="col s6 m6">
                         <Link to={`/clients/${id}/create-call`} className="btn blue darken-4 left-align">
                              Create call
                         </Link>
                    </div>
                    <div className="col s6 m6 right-align">
                         <Link className="btn green darken-4" to={`/clients/${id}/calls`}>
                              Show calls
                         </Link>
                    </div>
               </div>
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
                                   value={gender ?? ''}   
                                   >
                                        <option value="" disabled
                                        >Choose your option</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                        <option value="N/A">N/A</option>
                                   </select>
                              </div>
                              <div className="input-field">
                                   <input type="date" name="dateBirth" id="dateBirth"
                                   onChange={(e) => setDateBirth(e.target.value)}
                                   value={dateBirth ?? ''}
                                   />
                                   <label htmlFor="dateBirth">Date of Birth</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="cpf" id="cpf"
                                   onChange={(e) => setCpf(formatCpf(e.target.value))}
                                   onBlur={(e) => setCpf(formatCpf(e.target.value))}
                                   value={cpf ?? ''}
                                   max={14} min={14}
                                   />
                                   <label htmlFor="cpf">CPF</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="cnpj" id="cnpj" 
                                   onChange={(e) => setCnpj(formatCnpj(e.target.value))}
                                   onBlur={(e) => setCnpj(formatCnpj(e.target.value))}
                                   value={cnpj ?? ''}
                                   max={18} min={18}
                                   /> 
                                   <label htmlFor="cnpj">CNPJ</label>
                              </div>
                              <div className="input-field">
                                   <input type="text" name="phone_1" id="phone_1"
                                   onChange={(e) => setPhone_1(formatPhone(e.target.value))} 
                                   onBlur={(e) => setPhone_1(formatPhone(e.target.value))}
                                   value={phone_1 ?? ''}
                                   max={15} min={15}
                                   />
                                   <label htmlFor="phone_1">Phone 1</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="phone_2" id="phone_2" 
                                   onChange={(e) => setPhone_2(formatPhone(e.target.value))}
                                   onBlur={(e) => setPhone_2(formatPhone(e.target.value))}
                                   value={phone_2 ?? ''}
                                   max={15} min={15}
                                   />
                                   <label htmlFor="phone_2">Phone 2</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="email" id="email"
                                   onChange={(e) => setEmail(e.target.value)}
                                   value={email ?? ''}
                                   />
                                   <label htmlFor="email">Email</label>
                              </div>
                         </div>
                         <div className="col s12 m6">
                              <div className="input-field">
                                   <input type="text" name="address" id="address" 
                                   onChange={(e) => setAddress(e.target.value)} 
                                   value={address ?? ''}
                                   />
                                   <label htmlFor="address">Address</label>
                              </div>

                              <div className="input-field">
                                   <input type="number" name="number" id="number" 
                                   onChange={(e) => setNumber(Number(e.target.value))}
                                   value={number ?? ''}
                                   />
                                   <label htmlFor="number">Number</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="complement" id="complement" 
                                   onChange={(e) => setComplement(e.target.value)}
                                   value={complement ?? ''}
                                   />
                                   <label htmlFor="complement">Complement</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="district" id="district" 
                                   onChange={(e) => setDistrict(e.target.value)}
                                   value={district ?? ''}
                                   />
                                   <label htmlFor="district">District</label>
                              </div>

                              <div className="input-field">
                                   <input type="text" name="city" id="city" 
                                   onChange={(e) => setCity(e.target.value)}
                                   value={city ?? ''}
                                   />
                                   <label htmlFor="city">City</label>
                              </div>

                              <div className="input-field">
                                   <input type="text"name="state" id="state" 
                                   onChange={(e) => {
                                        setState(e.target.value.slice(0, 2).toUpperCase());
                                   }}
                                   value={state ?? ''} max="2" min="2"
                              
                                   />
                                   <label htmlFor="state">State (UF)</label>
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
                                   max={9} min={9}
                                   />
                                   
                                   <label htmlFor="cep">CEP</label>
                              </div>

                         </div>

                    </div>

                    <div className="row">
                         <button className="btn-large waves-effect waves-light" type="submit" name="action">
                              Save
                         </button>
                         <button className="btn-large waves-effect waves-light red right" type="button" name="action" onClick={() => handleDelete()}>
                              Delete
                         </button>
                    </div>

               </form>
          </main>
     )
}


export default ShowClient;