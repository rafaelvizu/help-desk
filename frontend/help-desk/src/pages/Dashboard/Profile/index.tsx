import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth";

function Profile()
{
     const { user } = useContext(AuthContext);

     return (
          <main className="container center">
               <div className="row card-panel hoverable">
                    <div>
                         <img src={user?.profileImage} alt="foto de perfil" 
                         className="circle responsive-img" width="100" height="100"
                         />
                         <div className="row">
                              <div className="col s12">
                                   <h4>{user?.name}</h4>
                              </div>
                              <div className="col s12">
                                   <h5>{user?.email}</h5>
                              </div>
                         </div>
                    </div>
               </div>
          </main>
     )
}


export default Profile;