import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { db } from './firebase-config';
import logo from './assets/Dytter_Logo_2022.svg'

export const Confirmation = () => {

    const [confirmed, setConfirmed] = useState(false);

    // GET THE USER ID ON THE ROUTE PARAM. THIS WILL BE USED AS THE DOCUMENT ID ON THE DATABASE TO FIND WHICH CAREGIVER NEEDS THEIR STATUS TO BE UPDATED TO CONFIRMED
    const { id } = useParams();
    
    // UPDATE THE DOC TO CONFIRMED.
    useEffect(() => {
        if(id !== null){
            const confirm = async() => {
                try {
                    await updateDoc(doc(db, 'matched', id), {
                        status: 'confirmed'
                    })
                    setConfirmed(true);
                } catch (error) {
                    setConfirmed(false);
                    console.log(error);
                }
            }

            confirm();
        }
    })

    // THE WHOLE PURPOSE OF THIS PAGE IS JUST TO SEND SIGNAL TO THE DATABASE THAT THE CAREGIVER CONFIRMED THE BOOKINGS. 
    // YOU CAN ALSO RENDER SOMETHING ON THE PAGE AND STYLE IT IF YOU WANT TO., LIKE A MESSAGE THAT IT HAS BEEN CONFIRMED

    return (
        <div className='confirmation-container'>
            <img src={logo} alt="" />
            {confirmed ? (
                <h3>Your booking has been confirmed. You may not close this page.</h3>
            ) : (
                <h3>There's a problem confirming your booking.</h3>
            )}
        </div>
    )
}
