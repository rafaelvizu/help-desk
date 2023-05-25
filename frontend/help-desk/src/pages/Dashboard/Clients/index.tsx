import { ClientContext } from "../../../contexts/clients";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IClient } from "../../../helpers/interfaces";


function Clients()
{
     const { clients } = useContext(ClientContext);
     const [search, setSearch] = useState('');
     const [filteredClients, setFilteredClients] = useState<IClient[]>([]);

     useEffect(() => {
          setFilteredClients(
               clients.filter(client => client.name.toLowerCase().includes(search.toLowerCase()))
          )
          
     }, [search, clients]);


     return (
          <div className="container">
               <div className="row">
                    <div className="col s12">
                         <div className="input-field col s12">
                              <input 
                                   id="search"
                                   type="text"
                                   className="validate"
                                   value={search}
                                   onChange={e => setSearch(e.target.value)}
                              />
                              <label htmlFor="search">Search</label>  
                         </div>
                    </div>

               </div>
               <ul className="collection with-header">
                    <li className="collection-header"><h4>Clients</h4></li>

                    {
                         filteredClients.map(clientFilter => (
                              <li className="collection-item" key={clientFilter.id}>
                                   <Link to={`/clients/${clientFilter.id}`}>
                                        {clientFilter.name}
                                   </Link>
                                   <span className="secondary-content">
                                        created at: {new 
                                        Date(clientFilter.createdAt as string).toLocaleDateString('pt-br')}
                                   </span>
                              </li>
                         ))
                    }
                    
               </ul>
          </div>
     )

}


export default Clients;