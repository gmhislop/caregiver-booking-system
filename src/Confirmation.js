import { doc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { db } from './firebase-config';

export const Confirmation = () => {

    // GET THE USER ID ON THE ROUTE PARAM. THIS WILL BE USED AS THE DOCUMENT ID ON THE DATABASE TO FIND WHICH CAREGIVER NEEDS THEIR STATUS TO BE UPDATED TO CONFIRMED
    const { id } = useParams();
    
    // UPDATE THE DOC TO CONFIRMED.
    useEffect(() => {
        const confirm = async() => {
            try {
                await updateDoc(doc(db, 'matched', id), {
                    status: 'confirmed'
                })
            } catch (error) {
                console.log(error);
            }
        }

        confirm();
    })

    // THE WHOLE PURPOSE OF THIS PAGE IS JUST TO SEND SIGNAL TO THE DATABASE THAT THE CAREGIVER CONFIRMED THE BOOKINGS. 
    // YOU CAN ALSO RENDER SOMETHING ON THE PAGE AND STYLE IT IF YOU WANT TO., LIKE A MESSAGE THAT IT HAS BEEN CONFIRMED

    return (
        <div>Confirmation</div>
    )
}
