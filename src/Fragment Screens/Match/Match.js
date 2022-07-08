import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase-config'
import './match.css'
import emailjs from '@emailjs/browser';
import { Loader } from '../../miscellaneous/Loader/Loader';

export const Match = () => {

    // INITIALIZE VARIABLES
    const [remainingTime, setRemainingTime] = useState(10);
    const [clickedUser, setClickedUser] = useState(null);
    const [onTimer, setOnTimer] = useState(false);
    const [loading, setLoading] = useState(false);
    const [matchedData, setMatchedData] = useState([]);

    // THIS WILL BE USED TO KEEP TRACK OF THE CONFIRM BUTTON CHANGES SO THAT THE PAGE WILL BE RE-RENDERED AND NEW DATA WILL BE DISPLAYED
    const [status, setStatus] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchMatched = async() => {
            await getDocs(collection(db, 'matched'))
            .then((res) => {
                setMatchedData(res.docs.map((doc) => ({ ...doc.data() })));
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })
        }
        fetchMatched();
    }, [status])

    useEffect(() => {
         // LOGIC TO HANDLE THE CONFIRM BUTTON
        const confirmMatch = async () => {        
            // CUSTOM EMAIL OBJECT. THIS IS THE EMAIL THAT WILL BE SENT TO THE CAREGIVERS. CHANGE THE TO_EMAIL TO THEIR RESPECTIVE EMAIL
            const info = {
                message: `Click the link to confirm http://localhost:3000/bookings/confirmation/${clickedUser.userId}`,
                to_email: 'jazencode@gmail.com', // Change this line with the email of the caregiver. Pass clickedUser.email to automate that
                from_email: 'Healthcare',
            }

            // SEND THE EMAIL USING EMAIL JS
            emailjs.send('service_34j7jhp', 'template_6p7p0lz', info, 's4i9jk7PO-pMqAN4h')
                .then(res => console.log(res))
                .catch(err => console.log(err));

            // UPDATE THE STATUS TO BE PENDING AFTER CONFIRMING
            await updateDoc(doc(db, 'matched', clickedUser.userId), {
                status: 'pending'
            })

            setStatus(!status);
        }

        setOnTimer(false);

        // IF THERE IS A CLICKED USER, RUN THE TIMER
        if(clickedUser !== null || clickedUser?.status !== 'unconfirmed' || clickedUser?.status !== 'pending'){
            setOnTimer(true);
            const interval = setInterval(() => {
                setRemainingTime(time => time - 1);
    
                // PERFORM THESE WHEN THE TIMER RUNS OUT
                if(remainingTime === 0){
                    confirmMatch();
                    setClickedUser(null);
                    setRemainingTime(10);
                    setOnTimer(false);
                    setLoading(true);
                }
            }, 1000)
            
            return () => clearTimeout(interval);
        }else{
            setRemainingTime(10);
            setOnTimer(false);
        }
    }, [remainingTime, clickedUser, status])
    
    return (
        <div className='match-container'>
            {loading ? <Loader/> : (
                <div className='table'>
                    <div className='table-head'>
                        <div className='table-data'>Booking ID</div>
                        <div className='table-data'>Caregivers Name</div>
                        <div className='table-data'>Functie</div>
                        <div className='table-data'>Afdeling</div>
                        <div className='table-data'>Datum</div>
                        <div className='table-data'>Tijd</div>
                        <div className='table-data'>Action</div>
                    </div>
                    <div className="table-content">
                        {matchedData.map((data, index) => {
                            return (
                                <div className='table-body' key={index}>
                                    <div className='table-data'>{data.bookingId}</div>
                                    <div className='table-data'>{data.caregiversName}</div>
                                    <div className='table-data'>{data.jobTitleName}</div>
                                    <div className='table-data'>{data.department}</div>
                                    <div className='table-data'>{data.date}</div>
                                    <div className='table-data'>{data.time}</div>
                                    <button
                                        className={
                                            data.status === 'pending' ? 'table-data pendingStatus' :
                                            data.status === 'confirmed' ? 'table-data confirmedStatus' : 
                                            onTimer && data === clickedUser ? 'cancel table-data' : 'table-data'
                                        }
                                        onClick={() => {
                                            if(clickedUser === data){
                                                setClickedUser(null);
                                            }else{
                                                setClickedUser(data);
                                                setRemainingTime(10);
                                            }
                                        }}
                                        onDoubleClick={() => {
                                            setClickedUser(data);
                                            setRemainingTime(0);
                                        }}
                                    >
                                        {
                                            data.status === 'pending' ? 'Pending' :
                                            data.status === 'confirmed' ? 'Confirmed' :
                                            onTimer && data === clickedUser ? `Cancel ${remainingTime}` : 'Confirm'
                                        }
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
