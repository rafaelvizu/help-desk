import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/auth";
import { getCall } from "../../../helpers/call";
import { ICall } from "../../../helpers/interfaces";

function Home()
{
     const { token } = useContext(AuthContext);
     const [loop, setLoop] = useState<boolean>(true); 
     const [calls, setCalls] = useState<ICall[]>([])

     useEffect(() => {
          getCalls();
     }, [loop]);

     async function getCalls(): Promise<void>
     {

          const response = await getCall(token as string);
          setCalls(response);
          await new Promise((resolve) => setTimeout(resolve, 10000));
          setLoop(!loop);
          return;
     }

     return (
          <div>
               <main>
                    {
                         calls.map((call) => {
                              return (
                                   <div key={call.id}>
                                        <h1>{call.subject}</h1>
                                        <h2>{call.status}</h2>
                                        <p>{call.complement}</p>
                                   </div>
                              )
                         })
                    }
               </main>
          </div>
     )
}



export default Home;