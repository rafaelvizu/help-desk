import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/auth";
import { toast } from "react-toastify";
import { FiPaperclip }from 'react-icons/fi';
import styles from "../../../helpers/styles";
import profile from "../../../helpers/profile";
import api from "../../../services/api";

function Profile()
{
     const { user, setUser, token } = useContext(AuthContext);
     const [profileImage, setProfileImage] = useState<string>('');
     const [profileImageFile, setProfileImageFile] = useState<File>();
     const [name, setName] = useState<string | null>(null);
     const [email, setEmail] = useState<string>('');
     const [password, setPassword] = useState<string | null>(null);
     const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

     const [editPassword, setEditPassword] = useState<boolean>(false);
     const [blockButton, setBlockButton] = useState<boolean>(false);
     
     
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
          setBlockButton(true);

          // verificar se os dados são iguais
          if (name === user?.name && !profileImageFile && !editPassword) {
               toast.info('No changes were made');
               setBlockButton(false);
               return;
          } else if (editPassword && password !== confirmPassword) {
               toast.error('Passwords do not match');
               setBlockButton(false);
               return;
          } else if (editPassword && password?.length as number < 6) {
               toast.error('Password must be at least 6 characters');
               setBlockButton(false);
               return;
          }

          const formData = new FormData();
          formData.append('name', name as string);
          
          if (profileImageFile) {
               formData.append('profileImage', profileImageFile);
          }

          if (editPassword && password && confirmPassword) {
               formData.append('password', password as string);
               formData.append('confirmPassword', confirmPassword as string);
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
                    setEditPassword(false);
                    setPassword(null);
                    setConfirmPassword(null);
               }
          })
          .catch(error => {
               setProfileImageFile(undefined);
               setName(user?.name as string);
               setProfileImage(user?.profileImage as string);
               setEditPassword(false);
               setPassword(null);
               setConfirmPassword(null);
               toast.error(error.response.data.message);
               console.error(error);
          });

          setBlockButton(false);
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
                                        placeholder="Nome" value={name ?? ''}
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
                                        <input type="password" id="newPassword" 
                                        value={password ?? ''}
                                        onChange={event => setPassword(event.target.value)}
                                   />
                                   <label htmlFor="newPassword">New password</label>
                                   </div>

                                   <div className="input-field">
                                        <input type="password" id="confirmPassword"
                                        value={confirmPassword ?? ''}
                                        onChange={event => setConfirmPassword(event.target.value)}
                                   />
                                   <label htmlFor="confirmPassword">New confirm password</label>
                                   </div>
                              </div>     
                              }
                              
                              <div className="col s12 m12">
                                   <div className="input-field">
                                        <button className="btn waves-effect waves-light left "
                                        disabled={blockButton}
                                        onClick={handleEditUser}>
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