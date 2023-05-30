import { useState, useEffect } from 'react';
import styles from '../../../helpers/styles';
import { getClient } from '../../../helpers/client';
import { IClient } from '../../../helpers/interfaces';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/auth';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import { createCall } from '../../../helpers/call';

function CreateCall()
{
     const { id } = useParams<{ id: string }>();
     const { token } = useContext(AuthContext);

     const [clientName, setClientName] = useState<string>('');
     const [subject, setSubject] = useState<string>('');
     const [status, setStatus] = useState<string>('');
     const [complement, setComplement] = useState<string>('');

     
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

          setClientName(client.name); 
          setLoading(false);
     }


     async function handleSubmit(e: React.FormEvent<HTMLFormElement>)
     {    	
          e.preventDefault();
          setLoading(true);

          const create = await createCall({
               subject,
               status,
               complement,
               clientId: id as string,
          }, token as string);

          if (create === null)
          {
               setLoading(false);
               return;
          }
          setLoading(false);

          window.location.href = `/clients/${id}/calls/${create.id}`;
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
                    Create call
               </h3>
               <hr/>
               <form className="row" onSubmit={(e) => handleSubmit(e)}>
                    <div className="row">
                         <div className="col s12 m6">
                              <div className="input-field">
                                   
                                   <input type="text" id="client"
                                        disabled value={clientName}
                                   />
                              </div>
                              <div className="input-field">
                                   <select id="subject" required
                                        value={subject} style={styles.select}
                                        onChange={(e) => setSubject(e.target.value)}
                                   >
                                        <option value="" disabled>Choose a subject</option>
                                        <option value="TECHNICAL SUPPORT">Technical support</option>
                                        <option value="FINANCIAL">Financial</option>
                                        <option value="GENERAL">General</option>
                                   </select>
                              </div>
                              <div className="input-field">
                                   <select className="browser-default" id="status"
                                        value={status} style={styles.select} required
                                        onChange={(e) => setStatus(e.target.value)}
                                   >
                                        <option value="" disabled>Choose a status</option>
                                        <option value="OPEN">Open</option>
                                        <option value="IN PROGRESS">In progress</option>
                                        <option value="CLOSED">Closed</option>
                                   </select>
                              </div>

                              <div className="input-field">
                                   <textarea id="complement" className="materialize-textarea"
                                   onChange={(e) => setComplement(e.target.value)}
                                   placeholder='Complement' value={complement}
                                   ></textarea>
                              </div>
                         </div>

                    </div>

                    <div className="row">
                         <button className="btn-large waves-effect waves-light" type="submit" name="action">
                              Create call
                         </button>
                    </div>

               </form>
          </main>
     )
}


export default CreateCall;