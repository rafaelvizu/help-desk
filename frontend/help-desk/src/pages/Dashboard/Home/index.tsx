import { useContext } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { CallContext } from "../../../contexts/calls";

function Home()
{
     const { calls } = useContext(CallContext);


     return (
          <div className="container">
               <main className="row">
                    {
                         calls.map((call) => {
                              return (                              
                                   <div className="col m12 s12 hoverable" key={call.id} style={{
                                        padding: 20,
                                   }}>
                                        <div className="row">
                                             <h4 className="col m6 s6 ">
                                                  {call.subject}
                                             </h4>
                                             <p title={call.status} className="col m6 s6 right-align">
                                                  {call.status === 'OPEN' && <FiAlertCircle size={50} />} 
                                                  {call.status === 'CLOSED' && <FiEyeOff size={50} />}
                                                  {call.status === 'IN PROGRESS' && <FiEye size={50}/>}     
                                             </p>
                                        
                                        </div>  

                                        <div className="row">
                                             <p className="col m6 s6">
                                                  {call.complement.slice(0, 50)}...
                                             </p>
                                             <Link to={`/clients/${call.clientId}/calls/${call.id}`}className="btn btn-primary col m3 s3 right">
                                                  <FiEdit />
                                             </Link>
                                        </div>

                                        <div className="row">
                                             <span className="col m6 s6">
                                                  created at: {new Date(call.createdAt as string).toLocaleString()}
                                             </span>
                                             <span className="col m6 s6 right-align">
                                                  updated at: {new Date(call.updatedAt as string).toLocaleString()}     
                                             </span>
                                        </div>

                                   </div>
                              )
                         })
                    }
               </main>
          </div>
     )
}



export default Home;