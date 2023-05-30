import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { CallContext } from "../../../contexts/calls";
import { ICall } from "../../../helpers/interfaces";
import { useParams } from "react-router-dom";

function Home()
{
     const { id } = useParams<{ id: string }>();

     const { calls } = useContext(CallContext);
     const [filteredCalls, setFilteredCalls] = useState<ICall[]>([]); 
     const [callsLocal, setCallsLocal] = useState<ICall[]>([]);
     const [search, setSearch] = useState<string>('');
     const [status, setStatus] = useState<string>('');    
     const [subject, setSubject] = useState<string>('');


     useEffect(() => {
          if (id)
          {
               setCallsLocal(calls.filter((call) => {
                    return call.clientId == id;
               }));
               }
          else
          {
               setCallsLocal(calls);
          }

     }, [calls, id]);

     useEffect(() => {

          if (!search && !status && !subject)
          {
               setFilteredCalls(callsLocal); 
               return;
          }
          
          if(search)
          {
               setFilteredCalls(callsLocal.filter((call) => {
                    return call.complement.toLowerCase().includes(search.toLowerCase());
               }));
          }

          if (status)
          {
               setFilteredCalls(callsLocal.filter((call) => {
                    return call.status === status;
               }));
          }

          if (subject)
          {
               setFilteredCalls(callsLocal.filter((call) => {
                    return call.subject === subject;
               }));
          }


     }, [search, status, subject, callsLocal, filteredCalls]);


     return (
          <div className="container">
               <div className="row">
                    <div className="col m6 s12">
                         <input type="search" name="" id="" placeholder="search"
                              onChange={(e) => setSearch(e.target.value)}
                              value={search}
                         />
                    </div>

                    <div className="col m3 s6">
                         <select name="status" id="status" className="browser-default"
                              onChange={(e) => setStatus(e.target.value)}
                              value={status}
                         >
                              <option value="" disabled >Filter by status</option>
                              <option value="">ALL</option>
                              <option value="OPEN">OPEN</option>
                              <option value="IN PROGRESS">IN PROGRESS</option>
                              <option value="CLOSED">CLOSED</option>
                         </select>
                    </div>
                    <div className="col m3 s6">
                         <select name="subject" id="subject" className="browser-default"
                              onChange={(e) => setSubject(e.target.value)} 
                              value={subject}
                         >
                              <option value="" disabled>Filter by subject</option>
                              <option value="">ALL</option>
                              <option value="TECHNICAL SUPPORT">TECHNICAL SUPPORT</option>
                              <option value="FINANCIAL">FINANCIAL</option> 
                              <option value="GENERAL">GENERAL</option>
                         </select>
                    </div>
               </div>
               <main className="row">
                    {
                         filteredCalls.map((call) => {
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