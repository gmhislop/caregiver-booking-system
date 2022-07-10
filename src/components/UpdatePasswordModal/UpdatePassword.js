import { updatePassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../../firebase-config'
import { Loader } from '../../miscellaneous/Loader/Loader'
import './updatePassword.css'

// AS A PRACTICE, THIS DOESN'T HANDLE ANY ERRORS YET. YOU CAN SET THE MINIMUM CHARACTERS FOR THE PASSWORD. MAKE CONDITIONS
export const UpdatePassword = ({ setIsToggled }) => {

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [setError] = useState();
    const [loading, setLoading] = useState(false);

    const changePassword = async() => {

        if(!newPassword || !confirmNewPassword){
            return setError('Please fill all the fields');
        }

        if(newPassword !== confirmNewPassword){
            return setError('Password do not match');
        }

        setLoading(true)

        try {
            await updatePassword(auth.currentUser, newPassword);
            setLoading(false);
            setIsToggled(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const cancelChange = () => {
        setIsToggled(false);
    }

    return (
        <div className='update-password-container'>
            {loading ? (
                <Loader/>
            ) : (
                <div className="update-form-container">
                    <input 
                        type="text" 
                        placeholder='New Password'
                        onChange={e => setNewPassword(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder='Confirm New Password'
                        onChange={e => setConfirmNewPassword(e.target.value)}
                    />
                    <div className="button-group">
                        <button type='button' onClick={cancelChange}>Cancel</button>
                        <button type='button' onClick={changePassword}>Change Password</button>
                    </div>
                </div>
            )}
        </div>
    )
}
