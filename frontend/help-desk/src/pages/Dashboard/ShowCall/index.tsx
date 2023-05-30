import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ClientContext } from "../../../contexts/clients";
import styles from "../../../helpers/styles";
import { deleteCall, getCallById, updateCall } from "../../../helpers/call";
import { AuthContext } from "../../../contexts/auth";
import Loading from "../../../components/Loading";

function ShowCall()
{
     const { id } = useParams();
     const { id_call } = useParams();
     const { clients } = useContext(ClientContext);
     const { token } = useContext(AuthContext);

     const [subject, setSubject] = useState<string>('');
     const [status, setStatus] = useState<string>('');
     const [complement, setComplement] = useState<string>('');
     const [clientName, setClientName] = useState<string>('');

     const [loading, setLoading] = useState<boolean>(false);

     useEffect(() => {
          getCall();     
     }, [id_call, id]);


     async function getCall()
     {
          setLoading(true);
          const call = await getCallById(id_call as string, token as string);

          if (call)
          {
               setSubject(call.subject);
               setStatus(call.status);
               setComplement(call.complement);

               const client = clients.find((client) => client.id == call.clientId);
               if (client)
               {
                    setClientName(client.name);
               }	
          }
          else
          {
               await new Promise((resolve) => setTimeout(resolve, 1000));
               window.location.href = `/clients/${id}`;
          }
          setLoading(false);

     }


     async function handleDelete()
     {
          setLoading(true);

          const del = await deleteCall(id_call as string, token as string);

          setLoading(false);
          if (del)
          {
               window.location.href = `/`;
          }
          
     }

     async function handleSubmit(e: React.FormEvent<HTMLFormElement>)
     {
          setLoading(true);
          e.preventDefault();

          await updateCall({
               subject,
               status,
               complement,
               clientId: id as string,
          }, id_call as string, token as string);

          setLoading(false);
     }

     if (loading)
     {
          return <Loading />
     }


     return (
          <main className="container">
               <div className="row">
                    <div className="col s12 m6">
                         <h3 className="light align-center">Call</h3>
                    </div>
               </div>

               <hr/>
               <form className="row" onSubmit={(e) => handleSubmit(e)}>
                    <div className="row">
                         <div className="col s12 m12">
                              <button className="btn waves-effect waves-light col m6 s6 red" type="submit" name="action"
                              onClick={() => handleDelete()}
                              >
                                   Delete
                              </button>
                         </div>
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
                                        <option value  ="" disabled>Choose a subject</option>
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
                         <button className="btn-large waves-effect waves-light col m6 s6" type="submit" name="action">
                              Save
                         </button>
                    </div>

               </form>
          </main>
     )
}


export default ShowCall;