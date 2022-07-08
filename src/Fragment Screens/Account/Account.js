import React, { useEffect, useState } from 'react'
import './account.css'
import { db, storage } from '../../firebase-config'
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Loader } from '../../miscellaneous/Loader/Loader';
import { AiFillCamera } from 'react-icons/ai'
import { UpdatePassword } from '../../components/UpdatePasswordModal/UpdatePassword';
import { getDownloadURL, list, ref, uploadBytes} from 'firebase/storage';

export const Account = () => {

    // INITIALIZE VARIABLES
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [organization, setOrganization] = useState('');
    const [isToggled, setIsToggled] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [image, setImage] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [loading, setLoading] = useState(false);

    // GET THE CURRENT USER THAT IS LOGGED IN
    const { currentUser } = useAuth();

    // POP UP AN MODAL FOR CHANGING THE PASSWORD
    const changePassword = () => {
        setIsToggled(true);
    }

    // UPDATE THE DOC FROM THE  DATABASE WHEN CLICKED
    const saveChanges = async() => {
        setLoading(true);
        await updateDoc(doc(db, 'users', currentUser?.uid), {
            firstName,
            lastName,
            organization,
        })
        
        setIsUpdated(!isUpdated);
    }

    // LOGIC FOR THE PROFILE PICTURE UPLOAD
    useEffect(() => {
        const handleChange = () => {

            // RETURN IF THE IMAGE HASN'T BEEN PICKED YET
            if(!image) return;
            setLoading(true)

            // INITIALIZE A REFERENCE TO THE PATH ON THE FIREBASE STORAGE
            const storageRef = ref(storage, `${currentUser?.uid}/${image.name}/profile`);

            // UPLOAD THE IMAGE OT THAT PATH
            uploadBytes(storageRef, image)

            // GET THE URL BACK FROM THAT STORAGE. THIS URL IS THE URL OF YOUR UPLOADED IMAGE ON THE WEB. THIS WILL BE USED AS A SOURCE TO AN IMAGE TAG
            .then(() => {
                list(ref(storage, `${currentUser?.uid}/${image.name}`))
                .then(res => {
                    getDownloadURL(res.items[0])
                    .then(async(url) => {
                        setImageUrl(url);

                        // UPDATE THE DEFAULT PROFILE URL TO THE URL OF THE IMAGE YOU UPLOADED
                        await updateDoc(doc(db, 'users', currentUser?.uid), {
                            profileUrl: url
                        })
                        setLoading(false);
                    })
                    .catch(error => console.log(error));
                }).catch(error => console.log(error));
            })
            .catch(err => console.log(err));
        }

        handleChange();
    }, [image, currentUser?.uid])

    // RUN WHEN THE DATA HAS BEEN UPDATED SO THAT THE PAGE WILL BE RE-RENDERED WITH THE NEW DATA
    useEffect(() => {
        setLoading(true);
        const getUserData = async() => {
            const {_document} = await getDoc(doc(db, 'users', currentUser?.uid))
            setUsername(_document?.data.value.mapValue.fields.username.stringValue);
            setFirstName(_document?.data.value.mapValue.fields.firstName.stringValue);
            setLastName(_document?.data.value.mapValue.fields.lastName.stringValue);
            setEmail(_document?.data.value.mapValue.fields.email.stringValue);
            setOrganization(_document?.data.value.mapValue.fields.organization.stringValue);
            setImageUrl(_document?.data.value.mapValue.fields.profileUrl.stringValue);
            setLoading(false);
        }

        getUserData();
    }, [isUpdated, currentUser?.uid])

    return (
        <>
            {loading ? (
                <Loader/>
            ) : (
                <div className='account-container'>
                    {isToggled && <UpdatePassword setIsToggled={setIsToggled}/>}
                    <div className="profile-container">
                        <div className="profile-picture">
                            <div className="image">
                                <img src={imageUrl} width='100' height='100' alt='profile'/>
                                <div className="round">
                                    <input 
                                        type="file"
                                        onChange={e => setImage(e.target.files[0])}
                                    />
                                    <AiFillCamera className='icon'/>
                                </div>
                            </div>
                            <div className="info-group">
                                <h2 className="username">{username}</h2>
                                <h5 className="username">{email}</h5>
                                <button className='change-password' onClick={changePassword}>Change Password</button>
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="firstName">First Name</label>
                            <input 
                                type='text' 
                                value={firstName} 
                                name='firstName'
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                                type='text' 
                                value={lastName} 
                                name='lastName'
                                onChange={e => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="organization">Organization</label>
                            <input 
                                type='text' 
                                value={organization} 
                                name='organization'
                                onChange={e => setOrganization(e.target.value)}
                            />
                        </div>
                        <div className="button-group">
                            <div className='spacer'></div>
                            <button className="save-changes" onClick={saveChanges}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
