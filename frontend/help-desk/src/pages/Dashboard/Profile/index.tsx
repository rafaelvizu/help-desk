import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/auth";
import { toast } from "react-toastify";
import { FiPaperclip }from 'react-icons/fi';
import styles from "../../../helpers/styles";
import profile from "../../../helpers/profile";
import api from "../../../services/api";

function Profile()
{
     const { user, setUser, token} = useContext(AuthContext);
     const [profileImage, setProfileImage] = useState<string>('');
     const [profileImageFile, setProfileImageFile] = useState<File>();
     const [name, setName] = useState<string>('');
     const [email, setEmail] = useState<string>('');

     const [editPassword, setEditPassword] = useState<boolean>(false);
     
     
     useEffect(() => {
          if (user) {
               setProfileImage(user.profileImage as string);
               setName(user.name);
               setEmail(user.email);
          }
     }, [user]);

     useEffect(() => {
          if (profileImageFile) {
               const reader = new FileReader();
               reader.onloadend = () => {
                    setProfileImage(reader.result as string);
               }
               reader.readAsDataURL(profileImageFile);
          }
     }, [profileImageFile]);

     async function handleEditUser()
     {
          const formData = new FormData();
          formData.append('name', name);
          
          if (profileImageFile) {
               formData.append('profileImage', profileImageFile);
          }

          await api.put('/user/update-profile', formData, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
          .then(async () => {
               toast.success('User updated successfully');
               const user = await profile(token as string);
               if (user) {
                    setProfileImageFile(undefined);
                    setUser(user);
               }
          })
          .catch(error => {
               setProfileImageFile(undefined);
               setName(user?.name as string);
               setProfileImage(user?.profileImage as string);
               toast.error(error.response.data.message);
               console.error(error);
          });
     }

     return (
          <main className="container center">
               <div className="row card-panel hoverable">
                    <div>
                         <label htmlFor="profileImage" style={styles.labeLImage}>
                         <FiPaperclip size={50} color="#00000090" style={styles.profileIcon}/>
                         <img src={profileImage} alt="foto de perfil" 
                         className="circle responsive-img"
                         style={{objectFit: 'cover', width: 150, height: 150, cursor: 'pointer'}}
                         />
                         <input type="file" id="profileImage" style={{display: 'none'}}
                              onChange={(event) => {setProfileImageFile(event.target.files?.[0] as File)}}
                              accept="image/png, image/jpeg, image/jpg"
                         />
                         </label>
                         <div className="row">
                              <div className="col s12 m12">
                                   <div className="input-field">
                                        <input type="email" id="email" value={email} disabled/>
                                        <label htmlFor="email"></label>
                                   </div>
                                   <div className="input-field">
                                        <input type="text" id="name"
                                        placeholder="Nome" value={name}
                                        onChange={event => setName(event.target.value)}
                                        />
                                        <label htmlFor="name">Name</label>
                                   </div>

                                   <a className="left" style={{cursor: "pointer"}}>
                                        {
                                        editPassword ?
                                        <span onClick={() => {setEditPassword(false)}}>Cancel</span>
                                        :
                                        <span onClick={() => {setEditPassword(true)}}>Edit password</span>   
                                        }
                                   </a>
                              </div>
                              
                              {
                              editPassword &&
                              <div className="col s12 m12" style={{marginTop: 20}}>
                                   <div className="input-field">
                                        <input type="password" id="password"
                                        />
                                        <label htmlFor="password">Old password</label>
                                   </div>

                                   <div className="input-field">
                                        <input type="password" id="newPassword" 
                                   />
                                   <label htmlFor="newPassword">New password</label>
                                   </div>

                                   <div className="input-field">
                                        <input type="password" id="confirmPassword"
                                   />
                                   <label htmlFor="confirmPassword">Confirm password</label>
                                   </div>
                              </div>     
                              }
                              
                              <div className="col s12 m12">
                                   <div className="input-field">
                                        <button className="btn waves-effect waves-light left">
                                             Save
                                        </button>
                                   </div>
                              </div>
                              
                         </div>
                    </div>
                              
                                   
               </div>
          </main>
     )
}


export default Profile;